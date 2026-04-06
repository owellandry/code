import type { Collaborator } from '../core/workspace-types';

export interface TitleBarProps {
  title: string;
  workspaceName: string;
  collaborators: Collaborator[];
  isMaximized: boolean;
  onMinimize: () => Promise<void>;
  onToggleMaximize: () => Promise<void>;
  onClose: () => Promise<void>;
}
