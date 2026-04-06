import type { Collaborator, WorkspaceTab } from '../core/workspace-types';

export interface EditorProps {
  code: string;
  language: string;
  onChange: (value: string | undefined) => void;
  activeTabs: WorkspaceTab[];
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onCursorChange: (line: number, column: number) => void;
}
