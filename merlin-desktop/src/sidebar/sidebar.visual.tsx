import React from 'react';
import type { SidebarProps, FileNode } from './sidebar.shared';
import { VscChevronRight, VscChevronDown, VscSearch, VscNewFile, VscNewFolder, VscTrash, VscAdd } from 'react-icons/vsc';
import { FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import { DiReact } from 'react-icons/di';

const getFileIcon = (iconType?: string) => {
  switch (iconType) {
    case 'js': return <FaJs className="text-yellow-400 mr-2" />;
    case 'css': return <FaCss3Alt className="text-blue-400 mr-2" />;
    case 'html': return <FaHtml5 className="text-orange-500 mr-2" />;
    case 'blue-folder': return <FcFolder className="text-blue-400 mr-2" />;
    case 'yellow-folder': return <FcFolder className="text-yellow-400 mr-2" />;
    case 'green-folder': return <FcFolder className="text-green-500 mr-2" />;
    case 'orange-folder': return <FcFolder className="text-orange-400 mr-2" />;
    default: return <VscChevronRight className="text-textMuted mr-2 opacity-0" />;
  }
};

const renderTree = (
  nodes: FileNode[], 
  level: number, 
  activeId: string, 
  onFileClick: (id: string) => void, 
  onToggleFolder: (id: string) => void
) => {
  return nodes.map(node => {
    const isFolder = node.type === 'folder';
    const isActive = node.id === activeId;
    const paddingLeft = `${level * 16 + 16}px`;

    return (
      <div key={node.id}>
        <div 
          className={`flex items-center py-1 cursor-pointer transition text-sm ${
            isActive 
              ? 'bg-[#352c24] text-orange-400 font-medium border-l-2 border-orange-500' 
              : 'text-textMuted hover:bg-[#2a2a2a] hover:text-white border-l-2 border-transparent'
          }`}
          style={{ paddingLeft }}
          onClick={() => isFolder ? onToggleFolder(node.id) : onFileClick(node.id)}
        >
          {isFolder ? (
            node.isOpen ? <VscChevronDown className="text-textMuted mr-1" /> : <VscChevronRight className="text-textMuted mr-1" />
          ) : (
            <div className="w-4 h-4 mr-1"></div>
          )}
          
          {isFolder ? (
            node.isOpen ? <FcOpenedFolder className="mr-2" /> : <FcFolder className="mr-2" />
          ) : getFileIcon(node.iconType)}
          
          <span>{node.name}</span>
        </div>
        {isFolder && node.isOpen && node.children && (
          <div>{renderTree(node.children, level + 1, activeId, onFileClick, onToggleFolder)}</div>
        )}
      </div>
    );
  });
};

export const SidebarVisual: React.FC<SidebarProps> = ({ files, activeFileId, onFileClick, onToggleFolder }) => {
  return (
    <div className="w-64 bg-bgSidebar flex flex-col border-r border-[#2a2a2a]">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-[#2d2d2d] px-3 py-1.5 rounded-md cursor-pointer hover:bg-[#353535] transition">
          <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
             <DiReact className="text-white text-xs" />
          </div>
          <span className="text-sm font-semibold text-white">merlinDev</span>
          <VscChevronDown className="text-xs text-textMuted" />
        </div>
        <div className="w-7 h-7 flex items-center justify-center bg-[#2d2d2d] rounded-md cursor-pointer hover:bg-[#353535] transition text-white">
          <VscAdd className="text-sm" />
        </div>
      </div>
      
      <div className="px-4 pb-2">
        <div className="flex items-center bg-[#1a1a1a] rounded-md px-2 py-1.5 border border-[#333]">
          <VscSearch className="text-textMuted text-sm" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs text-textMain w-full ml-2 placeholder-textMuted" />
          <VscNewFile className="text-textMuted text-sm ml-1 cursor-pointer hover:text-white" />
          <VscNewFolder className="text-textMuted text-sm ml-1 cursor-pointer hover:text-white" />
          <VscTrash className="text-textMuted text-sm ml-1 cursor-pointer hover:text-white" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-2 custom-scrollbar">
        {renderTree(files, 0, activeFileId, onFileClick, onToggleFolder)}
      </div>
    </div>
  );
};
