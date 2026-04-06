import React from 'react';
import MonacoEditor, { type OnMount } from '@monaco-editor/react';
import type { EditorProps } from './editor.shared';
import {
  VscChromeClose,
} from 'react-icons/vsc';
import { getFileIconComponent } from '../core/icon-map';

const getTabStyle = (iconType: EditorProps['activeTabs'][number]['iconType'], isActive: boolean) => {
  switch (iconType) {
    case 'html':
      return isActive
        ? 'border-[#7a5331] bg-[linear-gradient(180deg,#382a1f,#2a211c)] text-white'
        : 'border-white/10 bg-[#202123] text-[#c4c9d1]';
    case 'css':
      return isActive
        ? 'border-[#39577e] bg-[linear-gradient(180deg,#213246,#1b252f)] text-white'
        : 'border-white/10 bg-[#202123] text-[#c4c9d1]';
    case 'js':
      return isActive
        ? 'border-[#72622f] bg-[linear-gradient(180deg,#342d1f,#27221b)] text-white'
        : 'border-white/10 bg-[#202123] text-[#c4c9d1]';
    default:
      return isActive
        ? 'border-[#444c5a] bg-[linear-gradient(180deg,#272b32,#1f2228)] text-white'
        : 'border-white/10 bg-[#202123] text-[#c4c9d1]';
  }
};

export const EditorVisual: React.FC<EditorProps> = ({
  code,
  language,
  activeTabs,
  onChange,
  onTabClick,
  onTabClose,
  onCursorChange,
}) => {
  const handleMount: OnMount = (editor) => {
    editor.onDidChangeCursorPosition((event) => {
      onCursorChange(event.position.lineNumber, event.position.column);
    });
  };

  return (
    <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#17181a]">
      <div className="flex h-[58px] items-center border-b border-white/10 bg-[#17181a] px-6">
        <div className="custom-scrollbar flex min-w-0 flex-1 items-center gap-3 overflow-x-auto py-3">
          {activeTabs.map((tab) => {
            const Icon = getFileIconComponent(tab.iconType);

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => void onTabClick(tab.id)}
                className={`group flex h-full min-w-fit items-center rounded-[20px] border px-5 text-[15px] transition ${getTabStyle(tab.iconType, tab.isActive)}`}
              >
                <Icon className="mr-2.5 text-[18px]" />
                <span className={tab.iconType === 'css' ? 'italic' : ''}>{tab.name}</span>
                <VscChromeClose
                  className="ml-3 text-[#9aa1ad] opacity-0 transition group-hover:opacity-100 hover:text-white"
                  onClick={(event) => {
                    event.stopPropagation();
                    void onTabClose(tab.id);
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 bg-[#1b1c1e]">
        <MonacoEditor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={onChange}
          onMount={handleMount}
          options={{
            minimap: { enabled: false },
            fontSize: 15,
            fontFamily: '"Fira Code", Consolas, Monaco, monospace',
            fontLigatures: true,
            lineHeight: 28,
            lineNumbersMinChars: 3,
            padding: { top: 18 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
          }}
        />
      </div>
    </section>
  );
};
