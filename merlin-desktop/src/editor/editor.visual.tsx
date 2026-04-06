import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import type { EditorProps } from './editor.shared';
import { VscClose, VscLayout, VscBrowser, VscLayoutSidebarLeft, VscSettingsGear, VscSearch, VscPlay, VscBug, VscSplitHorizontal, VscEllipsis } from 'react-icons/vsc';
import { FloatingToolbarMain } from '../floating-toolbar/floating-toolbar.main';

export const EditorVisual: React.FC<EditorProps> = ({ code, language, onChange, activeTabs, onTabClick, onTabClose }) => {
  return (
    <div className="flex-1 bg-[#1a1a1a] flex flex-col relative shadow-inner overflow-hidden">
      
      {/* Top Bar / Tabs */}
      <div className="flex items-center justify-between bg-bgDark border-b border-[#2a2a2a] pr-4 h-10">
        <div className="flex overflow-x-auto custom-scrollbar h-full">
          {activeTabs.map(tab => {
            const Icon = tab.icon;
            return (
              <div 
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={`flex items-center px-4 h-full border-t-2 cursor-pointer text-sm transition group ${
                  tab.isActive 
                    ? 'bg-[#1a1a1a] border-orange-500 text-white' 
                    : 'bg-[#222] border-transparent text-textMuted hover:bg-[#2a2a2a] hover:text-white'
                }`}
              >
                <Icon className={`mr-2 ${tab.isActive ? 'text-orange-500' : 'text-blue-400'}`} />
                {tab.name}
                <VscClose 
                  className="ml-3 hover:text-white opacity-0 group-hover:opacity-100 transition" 
                  onClick={(e) => { e.stopPropagation(); onTabClose(tab.id); }} 
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center space-x-3">
          {/* Avatars */}
          <div className="flex -space-x-2">
            <img className="w-7 h-7 rounded-full border border-bgDark" src="https://i.pravatar.cc/100?img=1" alt="User 1" />
            <img className="w-7 h-7 rounded-full border border-bgDark" src="https://i.pravatar.cc/100?img=2" alt="User 2" />
            <img className="w-7 h-7 rounded-full border border-bgDark" src="https://i.pravatar.cc/100?img=3" alt="User 3" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-md font-medium transition shadow-lg shadow-blue-500/20">Collaboration</button>
          
          <div className="h-4 w-[1px] bg-[#333] mx-1"></div>
          
          <div className="flex space-x-2 text-textMuted">
            <div className="w-7 h-7 rounded hover:bg-[#2a2a2a] flex items-center justify-center cursor-pointer transition"><VscLayout className="text-lg" /></div>
            <div className="w-7 h-7 rounded hover:bg-[#2a2a2a] flex items-center justify-center cursor-pointer transition"><VscBrowser className="text-lg" /></div>
            <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center cursor-pointer shadow-lg shadow-blue-500/20"><VscLayoutSidebarLeft className="text-lg" /></div>
          </div>

          <div className="h-4 w-[1px] bg-[#333] mx-1"></div>

          <div className="flex space-x-2 text-textMuted">
            <div className="w-7 h-7 rounded hover:bg-[#2a2a2a] flex items-center justify-center cursor-pointer transition"><VscSettingsGear className="text-lg" /></div>
            <div className="w-7 h-7 rounded hover:bg-[#2a2a2a] flex items-center justify-center cursor-pointer transition"><VscSearch className="text-lg" /></div>
            <div className="w-7 h-7 rounded hover:bg-[#2a2a2a] flex items-center justify-center cursor-pointer transition"><VscPlay className="text-lg" /></div>
            <div className="w-7 h-7 rounded hover:bg-[#2a2a2a] flex items-center justify-center cursor-pointer transition"><VscBug className="text-lg" /></div>
          </div>
          
          <div className="flex space-x-2 text-textMuted ml-2">
            <div className="w-7 h-7 rounded hover:bg-[#2a2a2a] flex items-center justify-center cursor-pointer transition"><VscSplitHorizontal className="text-lg" /></div>
            <div className="w-7 h-7 rounded hover:bg-[#2a2a2a] flex items-center justify-center cursor-pointer transition"><VscEllipsis className="text-lg" /></div>
          </div>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 w-full h-full relative">
        <MonacoEditor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: '"Fira Code", Consolas, Monaco, monospace',
            lineHeight: 24,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
          }}
        />
      </div>

      <FloatingToolbarMain />
    </div>
  );
};
