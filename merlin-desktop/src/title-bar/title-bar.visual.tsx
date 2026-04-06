import React from 'react';
import {
  VscChromeClose,
  VscChevronDown,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
  VscAdd,
  VscLayout,
  VscSearch,
  VscPlay,
  VscDebugAltSmall,
  VscSettingsGear,
  VscSplitHorizontal,
  VscEllipsis,
  VscListSelection,
  VscLayoutPanel,
} from 'react-icons/vsc';
import { BsBezier2 } from 'react-icons/bs';
import type { TitleBarProps } from './title-bar.shared';

export const TitleBarVisual: React.FC<TitleBarProps> = ({
  title,
  workspaceName,
  collaborators,
  isMaximized,
  onMinimize,
  onToggleMaximize,
  onClose,
}) => {
  return (
    <header className="drag-region relative flex h-12 items-center bg-[#161719] px-3">
      <div className="no-drag flex items-center gap-2">
        <button
          type="button"
          className="flex h-9 items-center gap-1.5 rounded-xl border border-white/5 bg-[#1c1d1f] px-3 text-[#57a0ff] transition hover:bg-[#262729]"
        >
          <BsBezier2 className="text-xl" />
          <VscChevronDown className="text-[10px] text-[#8a909a] opacity-50" />
        </button>

        <button
          type="button"
          className="flex h-9 min-w-0 items-center gap-2.5 rounded-xl border border-[#2cab5c]/20 bg-[#14261b] px-3 shadow-[0_0_20px_rgba(44,171,92,0.08)] transition hover:bg-[#1a3123]"
        >
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#2cab5c] text-white">
            <BsBezier2 className="text-[11px]" />
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="truncate text-[13px] font-semibold text-white">{workspaceName}</span>
            <VscChevronDown className="shrink-0 text-[10px] text-[#bbd2be] opacity-50" />
          </div>
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-[#1c1d1f] text-[#8e95a0] transition hover:bg-[#262729] hover:text-white"
        >
          <VscAdd className="text-lg" />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 text-center text-xs font-medium tracking-[0.22em] text-[#8a909a] opacity-30">
        <span className="inline-block pt-[13px] uppercase">{title}</span>
      </div>

      <div className="no-drag ml-auto flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#161719] text-[10px] font-semibold text-white"
                style={{ backgroundColor: collaborator.accent }}
                title={collaborator.name}
              >
                {collaborator.initials}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="rounded-lg bg-[#2563eb] px-3 py-1 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)] transition hover:bg-[#3470f6]"
          >
            Collaboration
          </button>
        </div>

        <div className="h-4 w-px bg-white/10"></div>

        <div className="flex items-center gap-1 text-[#8e95a0]">
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/5 hover:text-white">
            <VscLayout className="text-base" />
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/5 hover:text-white">
            <VscListSelection className="text-base" />
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#57a0ff]">
            <VscLayoutPanel className="text-base" />
          </button>
        </div>

        <div className="h-4 w-px bg-white/10"></div>

        <div className="flex items-center gap-1 text-[#8e95a0]">
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/5 hover:text-white">
            <VscSettingsGear className="text-base" />
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/5 hover:text-white">
            <VscSearch className="text-base" />
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/5 hover:text-white">
            <VscPlay className="text-base" />
          </button>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/5 hover:text-white">
            <VscDebugAltSmall className="text-base" />
          </button>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => void onMinimize()}
            className="flex h-9 w-11 items-center justify-center rounded-lg text-[#9ea4af] transition hover:bg-white/6 hover:text-white"
            aria-label="Minimize"
          >
            <VscChromeMinimize className="text-base" />
          </button>
          <button
            type="button"
            onClick={() => void onToggleMaximize()}
            className="flex h-9 w-11 items-center justify-center rounded-lg text-[#9ea4af] transition hover:bg-white/6 hover:text-white"
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
          >
            {isMaximized ? <VscChromeRestore className="text-base" /> : <VscChromeMaximize className="text-base" />}
          </button>
          <button
            type="button"
            onClick={() => void onClose()}
            className="flex h-9 w-11 items-center justify-center rounded-lg text-[#9ea4af] transition hover:bg-[#e81123] hover:text-white"
            aria-label="Close window"
          >
            <VscChromeClose className="text-base" />
          </button>
        </div>
      </div>
    </header>
  );
};
