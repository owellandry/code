import type { FileNode } from '../core/workspace-types';

export interface SidebarProps {
  workspaceName: string;
  files: FileNode[];
  activeFileId: string;
  onFileClick: (id: string) => void;
  onToggleFolder: (id: string) => void;
}
