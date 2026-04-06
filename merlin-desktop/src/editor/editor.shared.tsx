export interface EditorProps {
  code: string;
  language: string;
  onChange: (value: string | undefined) => void;
  activeTabs: { id: string; name: string; icon: any; isActive: boolean }[];
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
}
