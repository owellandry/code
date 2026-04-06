import React from 'react';
import type { TitleBarProps } from './title-bar.shared';

export const TitleBarVisual: React.FC<TitleBarProps> = ({ title }) => {
  return (
    <div className="h-10 drag-region flex items-center justify-between px-4 z-50 bg-bgDark border-b border-[#333]">
      <div className="flex items-center space-x-2 no-drag">
        {/* Fake window controls for macOS style */}
        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition cursor-pointer"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition cursor-pointer"></div>
      </div>
      <div className="text-xs text-textMuted font-medium tracking-wide">{title}</div>
      <div className="w-12"></div>
    </div>
  );
};
