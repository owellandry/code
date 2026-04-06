import { useState } from 'react';
import {
  VscFiles,
  VscExtensions,
  VscDatabase,
  VscError,
  VscSettingsGear,
  VscSymbolEvent,
} from 'react-icons/vsc';

export const useActivityBarLogic = () => {
  const [activeId, setActiveId] = useState('explorer');

  const topItems = [
    { id: 'explorer', icon: VscFiles },
    { id: 'extensions', icon: VscExtensions },
    { id: 'git', icon: VscSymbolEvent },
    { id: 'database', icon: VscDatabase },
  ];

  const bottomItems = [
    { id: 'problems', icon: VscError },
    { id: 'settings', icon: VscSettingsGear },
  ];

  return {
    topItems,
    bottomItems,
    activeId,
    onItemClick: (id: string) => {
      setActiveId(id);
    },
  };
};
