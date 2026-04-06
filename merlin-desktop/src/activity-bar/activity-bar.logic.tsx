import { useState } from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscExtensions, VscDatabase, VscWarning, VscSettingsGear } from 'react-icons/vsc';
import { SiReact } from 'react-icons/si';

export const useActivityBarLogic = () => {
  const [activeId, setActiveId] = useState('explorer');

  const topItems = [
    { id: 'logo', icon: SiReact, active: false }, // Placeholder for merlin logo
    { id: 'explorer', icon: VscFiles },
    { id: 'search', icon: VscSearch },
    { id: 'git', icon: VscSourceControl },
    { id: 'extensions', icon: VscExtensions },
    { id: 'database', icon: VscDatabase },
  ];

  const bottomItems = [
    { id: 'problems', icon: VscWarning },
    { id: 'settings', icon: VscSettingsGear },
  ];

  const handleItemClick = (id: string) => {
    if (id !== 'logo') {
      setActiveId(id);
    }
  };

  return {
    topItems,
    bottomItems,
    activeId,
    onItemClick: handleItemClick,
  };
};
