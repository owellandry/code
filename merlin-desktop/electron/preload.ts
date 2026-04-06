import electronRenderer from 'electron/renderer';
import type { WindowState, WorkspaceSnapshot } from '../src/core/workspace-types';

const { contextBridge, ipcRenderer } = electronRenderer;

contextBridge.exposeInMainWorld('forkx', {
  window: {
    getState: () => ipcRenderer.invoke('window:get-state') as Promise<WindowState>,
    minimize: () => ipcRenderer.invoke('window:minimize') as Promise<WindowState>,
    toggleMaximize: () => ipcRenderer.invoke('window:toggle-maximize') as Promise<WindowState>,
    close: () => ipcRenderer.invoke('window:close') as Promise<void>,
    onStateChange: (listener: (state: WindowState) => void) => {
      const wrappedListener = (_event: Electron.IpcRendererEvent, state: WindowState) => listener(state);
      ipcRenderer.on('window:state-changed', wrappedListener);

      return () => {
        ipcRenderer.removeListener('window:state-changed', wrappedListener);
      };
    },
  },
  workspace: {
    getSnapshot: () => ipcRenderer.invoke('workspace:get-snapshot') as Promise<WorkspaceSnapshot>,
    selectFile: (fileId: string) =>
      ipcRenderer.invoke('workspace:select-file', fileId) as Promise<WorkspaceSnapshot>,
    toggleFolder: (folderId: string) =>
      ipcRenderer.invoke('workspace:toggle-folder', folderId) as Promise<WorkspaceSnapshot>,
    closeTab: (fileId: string) =>
      ipcRenderer.invoke('workspace:close-tab', fileId) as Promise<WorkspaceSnapshot>,
    updateFileContent: (fileId: string, content: string) =>
      ipcRenderer.invoke('workspace:update-file-content', fileId, content) as Promise<WorkspaceSnapshot>,
  },
});
