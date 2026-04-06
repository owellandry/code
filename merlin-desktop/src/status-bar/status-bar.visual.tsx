import React from 'react';
import type { StatusBarProps } from './status-bar.shared';
import { VscBell, VscError, VscShield, VscWarning, VscRemote, VscRadioTower } from 'react-icons/vsc';

export const StatusBarVisual: React.FC<StatusBarProps> = ({
  errors,
  warnings,
  info,
  line,
  column,
  indentation,
  encoding,
  eol,
  languageLabel,
}) => {
  return (
    <footer className="z-50 flex h-6 items-center justify-between bg-[#111214] text-[11px] text-[#969696] select-none">
      <div className="flex h-full items-center">
        <div className="flex h-full w-8 items-center justify-center bg-[#2563eb] text-white transition hover:bg-[#3b82f6]">
          <VscRemote className="text-[13px]" />
        </div>
        
        <div className="flex h-full items-center gap-1.5 border-r border-white/5 bg-white/[0.02] px-3 transition hover:bg-white/5 hover:text-white">
          <VscShield className="text-[12px]" />
          <span>Restricted Mode</span>
        </div>

        <div className="flex h-full items-center gap-4 px-4 transition hover:bg-white/5">
          <span className="flex items-center gap-1.5 hover:text-white">
            <VscError className="text-[13px]" />
            <span className="mt-0.5">{errors}</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-white">
            <VscWarning className="text-[13px]" />
            <span className="mt-0.5">{warnings}</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-white">
            <VscRadioTower className="text-[13px]" />
            <span className="mt-0.5">{info}</span>
          </span>
        </div>
      </div>

      <div className="flex h-full items-center">
        <div className="flex h-full w-10 items-center justify-center transition hover:bg-white/5 hover:text-white">
          <VscBell className="text-[14px]" />
        </div>
      </div>
    </footer>
  );
};
