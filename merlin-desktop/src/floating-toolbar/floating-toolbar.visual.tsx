import React from 'react';
import { VscGitMerge, VscTerminal, VscCommentDiscussion, VscColorMode } from 'react-icons/vsc';

export const FloatingToolbarVisual: React.FC = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-1 bg-white/10 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl shadow-2xl z-20 floating-toolbar-anim">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
        <VscGitMerge className="text-xl" />
      </div>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition transform hover:scale-105">
        <VscTerminal className="text-xl" />
      </div>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition transform hover:scale-105">
        <VscCommentDiscussion className="text-xl" />
      </div>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition transform hover:scale-105">
        <VscColorMode className="text-xl" />
      </div>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition transform hover:scale-105">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FBBF24"/>
          <path d="M2 17L12 22L22 17" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12V22" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};
