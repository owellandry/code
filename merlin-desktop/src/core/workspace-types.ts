export type FileKind = 'file' | 'folder';

export type FileIconType =
  | 'folder'
  | 'html'
  | 'css'
  | 'js'
  | 'ts'
  | 'json'
  | 'md'
  | 'default';

export type EditorLanguage =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'json'
  | 'markdown'
  | 'plaintext';

export interface WorkspaceFileRecord {
  id: string;
  parentId: string | null;
  name: string;
  type: FileKind;
  sortOrder: number;
  isOpen: boolean;
  content: string | null;
}

export interface TabRecord {
  fileId: string;
  sortOrder: number;
}

export interface FileNode {
  id: string;
  name: string;
  type: FileKind;
  iconType: FileIconType;
  isOpen?: boolean;
  children?: FileNode[];
}

export interface WorkspaceTab {
  id: string;
  name: string;
  iconType: FileIconType;
  isActive: boolean;
}

export interface Collaborator {
  id: string;
  name: string;
  initials: string;
  accent: string;
}

export interface StatusBase {
  errors: number;
  warnings: number;
  info: number;
  indentation: string;
  encoding: string;
  eol: string;
  languageLabel: string;
}

export interface StatusInfo extends StatusBase {
  line: number;
  column: number;
}

export interface WorkspaceSnapshot {
  appTitle: string;
  workspaceName: string;
  files: FileNode[];
  activeFileId: string;
  activeFileName: string;
  activeFileContent: string;
  language: EditorLanguage;
  activeTabs: WorkspaceTab[];
  status: StatusBase;
  collaborators: Collaborator[];
}

export interface WindowState {
  isMaximized: boolean;
}
