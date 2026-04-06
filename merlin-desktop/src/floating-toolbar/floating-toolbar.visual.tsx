import React from 'react';
import { VscGitMerge, VscTerminal, VscCommentDiscussion, VscColorMode } from 'react-icons/vsc';

export const FloatingToolbarVisual: React.FC = () => {
  return (
    <div className="floating-toolbar-anim absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-[24px] border border-white/10 bg-[#2c2c2d]/82 p-2 shadow-[0_26px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-[#2563eb] text-white shadow-[0_12px_28px_rgba(37,99,235,0.32)] transition hover:bg-[#3470f6]">
        <VscGitMerge className="text-xl" />
      </div>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl text-white/70 transition hover:bg-white/10 hover:text-white">
        <VscTerminal className="text-xl" />
      </div>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl text-white/70 transition hover:bg-white/10 hover:text-white">
        <VscCommentDiscussion className="text-xl" />
      </div>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl text-white/70 transition hover:bg-white/10 hover:text-white">
        <VscColorMode className="text-xl" />
      </div>
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition hover:bg-white/10">
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
