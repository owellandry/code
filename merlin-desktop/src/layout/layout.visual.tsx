import React from 'react';
import { TitleBarMain } from '../title-bar/title-bar.main';
import { ActivityBarMain } from '../activity-bar/activity-bar.main';
import { SidebarMain } from '../sidebar/sidebar.main';
import { EditorMain } from '../editor/editor.main';
import { StatusBarMain } from '../status-bar/status-bar.main';

export const LayoutVisual: React.FC = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#0d0e10] p-1.5 font-sans text-textMain select-none">
      <div className="mb-1.5 overflow-hidden rounded-xl border border-white/5 bg-[#161719] shadow-2xl">
        <TitleBarMain />
      </div>
      
      <div className="flex min-h-0 flex-1 gap-1.5 overflow-hidden">
        <div className="flex overflow-hidden rounded-xl border border-white/5 bg-[#111214] shadow-xl">
          <ActivityBarMain />
          <SidebarMain />
        </div>
        
        <div className="flex flex-1 overflow-hidden rounded-xl border border-white/5 bg-[#111214] p-1.5 shadow-xl">
          <div className="flex min-w-0 flex-1 overflow-hidden rounded-[10px] bg-[#17181a]">
            <EditorMain />
          </div>
        </div>
      </div>
      
      <div className="mt-1.5 overflow-hidden rounded-xl border border-white/5 bg-[#111214] shadow-lg">
        <StatusBarMain />
      </div>
    </div>
  );
};
