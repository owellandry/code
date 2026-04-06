import electronMain from 'electron/main';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { WorkspaceDatabase } from './workspace-db';
import type { WindowState } from '../src/core/workspace-types';

const { app, BrowserWindow, ipcMain } = electronMain;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let win: BrowserWindow | null = null;
let workspaceDatabase: WorkspaceDatabase;

const getWindowState = (): WindowState => ({
  isMaximized: win?.isMaximized() ?? false,
});

const broadcastWindowState = () => {
  if (!win) {
    return;
  }

  win.webContents.send('window:state-changed', getWindowState());
};

const registerIpcHandlers = () => {
  for (const channel of [
    'window:get-state',
    'window:minimize',
    'window:toggle-maximize',
    'window:close',
    'workspace:get-snapshot',
    'workspace:select-file',
    'workspace:toggle-folder',
    'workspace:close-tab',
    'workspace:update-file-content',
  ]) {
    ipcMain.removeHandler(channel);
  }

  ipcMain.handle('window:get-state', () => getWindowState());
  ipcMain.handle('window:minimize', () => {
    win?.minimize();
    return getWindowState();
  });
  ipcMain.handle('window:toggle-maximize', () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
      } else {
        win.maximize();
      }
    }

    return getWindowState();
  });
  ipcMain.handle('window:close', () => {
    win?.close();
  });

  ipcMain.handle('workspace:get-snapshot', () => workspaceDatabase.getSnapshot());
  ipcMain.handle('workspace:select-file', (_event, fileId: string) => workspaceDatabase.selectFile(fileId));
  ipcMain.handle('workspace:toggle-folder', (_event, folderId: string) => workspaceDatabase.toggleFolder(folderId));
  ipcMain.handle('workspace:close-tab', (_event, fileId: string) => workspaceDatabase.closeTab(fileId));
  ipcMain.handle('workspace:update-file-content', (_event, fileId: string, content: string) =>
    workspaceDatabase.updateFileContent(fileId, content)
  );
};

function createWindow() {
  win = new BrowserWindow({
    width: 1480,
    height: 920,
    minWidth: 1180,
    minHeight: 760,
    frame: false,
    autoHideMenuBar: true,
    title: 'ForkX',
    backgroundColor: '#111214',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });

  win.on('maximize', broadcastWindowState);
  win.on('unmaximize', broadcastWindowState);
  win.on('enter-full-screen', broadcastWindowState);
  win.on('leave-full-screen', broadcastWindowState);
  win.on('closed', () => {
    win = null;
  });

  if (VITE_DEV_SERVER_URL) {
    void win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    void win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  workspaceDatabase = new WorkspaceDatabase(path.join(app.getPath('userData'), 'forkx', 'workspace.db'));
  registerIpcHandlers();
  createWindow();
});
