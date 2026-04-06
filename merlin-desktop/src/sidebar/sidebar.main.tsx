import React from 'react';
import { SidebarVisual } from './sidebar.visual';
import { useSidebarLogic } from './sidebar.logic';

export const SidebarMain: React.FC = () => {
  const logic = useSidebarLogic();
  return <SidebarVisual {...logic} />;
};
