export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  iconType?: string;
  children?: FileNode[];
  isOpen?: boolean;
}

export interface SidebarProps {
  files: FileNode[];
  activeFileId: string;
  onFileClick: (id: string) => void;
  onToggleFolder: (id: string) => void;
}
