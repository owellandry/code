import { useState } from 'react';
import type { FileNode } from './sidebar.shared';

const initialFiles: FileNode[] = [
  {
    id: 'merlindev',
    name: 'merlinDev',
    type: 'folder',
    isOpen: true,
    children: [
      { id: 'images', name: 'Images', type: 'folder', iconType: 'blue-folder', isOpen: false, children: [] },
      {
        id: 'js',
        name: 'JavaScripts',
        type: 'folder',
        iconType: 'yellow-folder',
        isOpen: true,
        children: [
          { id: 'index.js', name: 'index.js', type: 'file', iconType: 'js' },
          { id: 'dat.gui', name: 'dat.gui.min.js', type: 'file', iconType: 'js' },
          { id: 'main.js', name: 'main-script.js', type: 'file', iconType: 'js' },
          { id: 'plugin.js', name: 'plugin.js', type: 'file', iconType: 'js' },
        ],
      },
      {
        id: 'css',
        name: 'Css',
        type: 'folder',
        iconType: 'blue-folder',
        isOpen: true,
        children: [
          { id: 'theme.css', name: 'theme.css', type: 'file', iconType: 'css' },
          { id: 'merlinbuild.css', name: 'merlinbuild.css', type: 'file', iconType: 'css' },
        ],
      },
      { id: 'ecom', name: 'Ecommerce-Product', type: 'folder', iconType: 'green-folder', isOpen: false, children: [] },
      {
        id: 'sql',
        name: 'Sql',
        type: 'folder',
        iconType: 'orange-folder',
        isOpen: true,
        children: [
          { id: 'index.html', name: 'index.html', type: 'file', iconType: 'html' },
          { id: 'doctype.html', name: 'doctype.html', type: 'file', iconType: 'html' },
        ],
      },
      { id: 'sample', name: 'Sample', type: 'folder', isOpen: false, children: [] },
      { id: 'codepen', name: 'Codepen projects', type: 'folder', isOpen: false, children: [] },
      { id: 'note', name: 'Note-module', type: 'folder', isOpen: false, children: [] },
    ],
  },
];

export const useSidebarLogic = () => {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
  const [activeFileId, setActiveFileId] = useState('index.html');

  const toggleFolder = (nodes: FileNode[], id: string): FileNode[] => {
    return nodes.map(node => {
      if (node.id === id && node.type === 'folder') {
        return { ...node, isOpen: !node.isOpen };
      }
      if (node.children) {
        return { ...node, children: toggleFolder(node.children, id) };
      }
      return node;
    });
  };

  const handleToggleFolder = (id: string) => {
    setFiles(prev => toggleFolder(prev, id));
  };

  const handleFileClick = (id: string) => {
    setActiveFileId(id);
  };

  return {
    files,
    activeFileId,
    onFileClick: handleFileClick,
    onToggleFolder: handleToggleFolder,
  };
};
