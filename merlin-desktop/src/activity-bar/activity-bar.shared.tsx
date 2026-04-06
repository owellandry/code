import { IconType } from 'react-icons';

export interface ActivityItem {
  id: string;
  icon: IconType;
  active?: boolean;
}

export interface ActivityBarProps {
  topItems: ActivityItem[];
  bottomItems: ActivityItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}
