import React from 'react';
import { TitleBarMain } from '../title-bar/title-bar.main';
import { ActivityBarMain } from '../activity-bar/activity-bar.main';
import { SidebarMain } from '../sidebar/sidebar.main';
import { EditorMain } from '../editor/editor.main';
import { StatusBarMain } from '../status-bar/status-bar.main';

export const LayoutVisual: React.FC = () => {
  return (
    <div className="bg-bgDark text-textMain font-sans h-screen flex flex-col overflow-hidden select-none">
      <TitleBarMain />
      <div className="flex-1 flex overflow-hidden">
        <ActivityBarMain />
        <SidebarMain />
        <EditorMain />
      </div>
      <StatusBarMain />
    </div>
  );
};
