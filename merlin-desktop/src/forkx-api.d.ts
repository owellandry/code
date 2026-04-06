import type { WindowState, WorkspaceSnapshot } from './core/workspace-types';

interface ForkxApi {
  window: {
    getState: () => Promise<WindowState>;
    minimize: () => Promise<WindowState>;
    toggleMaximize: () => Promise<WindowState>;
    close: () => Promise<void>;
    onStateChange: (listener: (state: WindowState) => void) => () => void;
  };
  workspace: {
    getSnapshot: () => Promise<WorkspaceSnapshot>;
    selectFile: (fileId: string) => Promise<WorkspaceSnapshot>;
    toggleFolder: (folderId: string) => Promise<WorkspaceSnapshot>;
    closeTab: (fileId: string) => Promise<WorkspaceSnapshot>;
    updateFileContent: (fileId: string, content: string) => Promise<WorkspaceSnapshot>;
  };
}

declare global {
  interface Window {
    forkx: ForkxApi;
  }
}

export {};
