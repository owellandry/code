import React from 'react';
import type { StatusBarProps } from './status-bar.shared';
import { VscCode, VscShield, VscError, VscWarning, VscInfo, VscBell } from 'react-icons/vsc';

export const StatusBarVisual: React.FC<StatusBarProps> = ({ errors, warnings, info }) => {
  return (
    <div className="h-6 bg-[#007acc] text-white flex items-center justify-between text-[11px] z-50 px-2 font-sans select-none">
      <div className="flex items-center space-x-3 h-full">
        <div className="flex items-center space-x-1 cursor-pointer hover:bg-white/20 px-2 h-full transition">
          <VscCode />
        </div>
        <div className="flex items-center space-x-1 cursor-pointer hover:bg-white/20 px-2 h-full transition">
          <VscShield />
          <span>Restricted Mode</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-white/20 px-2 h-full transition">
          <span className="flex items-center"><VscError className="mr-1 text-[10px]" /> {errors}</span>
          <span className="flex items-center"><VscWarning className="mr-1 text-[10px]" /> {warnings}</span>
          <span className="flex items-center"><VscInfo className="mr-1 text-[10px]" /> {info}</span>
        </div>
      </div>
      <div className="flex items-center space-x-3 h-full">
        <div className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition">Ln 12, Col 43</div>
        <div className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition">Spaces: 2</div>
        <div className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition">UTF-8</div>
        <div className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition">CRLF</div>
        <div className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition">HTML</div>
        <div className="cursor-pointer hover:bg-white/20 px-2 h-full flex items-center transition">
          <VscBell />
        </div>
      </div>
    </div>
  );
};
