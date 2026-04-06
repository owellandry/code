import React from 'react';
import { LayoutVisual } from './layout.visual';
import { useLayoutLogic } from './layout.logic';

export const LayoutMain: React.FC = () => {
  const logic = useLayoutLogic();
  return <LayoutVisual {...logic} />;
};
