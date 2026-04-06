import React from 'react';
import type { SidebarProps } from './sidebar.shared';
import {
  VscChevronDown,
  VscChevronRight,
  VscSearch,
  VscNewFile,
  VscNewFolder,
  VscTrash,
  VscFolder,
  VscFolderOpened,
} from 'react-icons/vsc';
import { getFileIconComponent } from '../core/icon-map';

const renderTree = (
  nodes: SidebarProps['files'],
  level: number,
  activeId: string,
  onFileClick: (id: string) => void,
  onToggleFolder: (id: string) => void
) =>
  nodes.map((node) => {
    const isFolder = node.type === 'folder';
    const isActive = node.id === activeId;
    const Icon = getFileIconComponent(node.iconType);

    return (
      <div key={node.id}>
        <button
          type="button"
          className={`flex h-10 w-full items-center rounded-xl pr-3 text-left text-[15px] transition ${
            isActive ? 'bg-[#3a2b20] text-[#ffb066]' : 'text-[#bcc1ca] hover:bg-[#212224] hover:text-white'
          }`}
          style={{ paddingLeft: `${14 + level * 20}px` }}
          onClick={() => (isFolder ? onToggleFolder(node.id) : onFileClick(node.id))}
        >
          {isFolder ? (
            node.isOpen ? (
              <VscChevronDown className="mr-1 text-[#7f8791]" />
            ) : (
              <VscChevronRight className="mr-1 text-[#7f8791]" />
            )
          ) : (
            <span className="mr-1 inline-block w-4" />
          )}
          {isFolder ? (
            node.isOpen ? (
              <VscFolderOpened className="mr-2 text-[#dde2ea]" />
            ) : (
              <VscFolder className="mr-2 text-[#dde2ea]" />
            )
          ) : (
            <Icon className="mr-2 text-[18px]" />
          )}
          <span className={level === 0 ? 'font-semibold text-white' : ''}>{node.name}</span>
        </button>
        {isFolder && node.isOpen && node.children && (
          <div className="mt-1">{renderTree(node.children, level + 1, activeId, onFileClick, onToggleFolder)}</div>
        )}
      </div>
    );
  });

export const SidebarVisual: React.FC<SidebarProps> = ({
  files,
  activeFileId,
  onFileClick,
  onToggleFolder,
}) => {
  const [width, setWidth] = React.useState(260);
  const isResizing = React.useRef(false);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    // El sidebar está después del Activity Bar (56px) y un pequeño gap
    const sidebarX = 56 + 12; // Aproximadamente 68px desde el borde izquierdo
    const newWidth = e.clientX - sidebarX;
    if (newWidth > 150 && newWidth < 500) {
      setWidth(newWidth);
    }
  }, []);

  const stopResizing = React.useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'default';
  }, [handleMouseMove]);

  const startResizing = React.useCallback(() => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'col-resize';
  }, [handleMouseMove, stopResizing]);

  React.useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, [handleMouseMove, stopResizing]);

  return (
    <aside 
      className="relative flex shrink-0 flex-col bg-transparent"
      style={{ width: `${width}px` }}
    >
      <div className="m-1.5 flex min-h-0 flex-1 flex-col rounded-xl bg-[#17181a]">
        <div className="p-1.5">
          <div className="flex items-center gap-1.5">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/5 bg-[#111214] px-3 py-2">
              <VscSearch className="text-lg text-[#7f8791]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-[#7f8791]"
              />
            </div>
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111214] text-[#8c929d] transition hover:bg-[#262729] hover:text-white">
              <VscNewFile className="text-lg" />
            </button>
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111214] text-[#8c929d] transition hover:bg-[#262729] hover:text-white">
              <VscNewFolder className="text-lg" />
            </button>
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111214] text-[#8c929d] transition hover:bg-[#262729] hover:text-white">
              <VscTrash className="text-lg" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto m-1.5 mt-0 rounded-xl border border-white/5 bg-[#111214] p-3">
          <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-[#8a909a]">
            <VscChevronDown className="text-sm opacity-50" />
            <VscFolder className="text-base text-white" />
            <span className="text-white">merlinDev</span>
          </div>
          {renderTree(files, 0, activeFileId, onFileClick, onToggleFolder)}
        </div>
      </div>

      {/* Resize Handle */}
       <div
         className="absolute -right-1 top-0 z-50 h-full w-2 cursor-col-resize transition-colors hover:bg-blue-500/20 active:bg-blue-500/40"
         onMouseDown={startResizing}
       />
    </aside>
  );
};
