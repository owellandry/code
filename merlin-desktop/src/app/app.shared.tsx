import type { StatusInfo, WindowState, WorkspaceSnapshot } from '../core/workspace-types';

export interface AppContextType {
  theme: 'light' | 'dark';
  isReady: boolean;
  workspace: WorkspaceSnapshot;
  windowState: WindowState;
  status: StatusInfo;
  selectFile: (fileId: string) => Promise<void>;
  toggleFolder: (folderId: string) => Promise<void>;
  closeTab: (fileId: string) => Promise<void>;
  updateActiveFileContent: (content: string) => void;
  setCursorPosition: (line: number, column: number) => void;
  minimizeWindow: () => Promise<void>;
  toggleMaximizeWindow: () => Promise<void>;
  closeWindow: () => Promise<void>;
}
