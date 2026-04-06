import React from 'react';
import { FloatingToolbarVisual } from './floating-toolbar.visual';
import { useFloatingToolbarLogic } from './floating-toolbar.logic';

export const FloatingToolbarMain: React.FC = () => {
  const logic = useFloatingToolbarLogic();
  return <FloatingToolbarVisual {...logic} />;
};
