import React from 'react';
import { StatusBarVisual } from './status-bar.visual';
import { useStatusBarLogic } from './status-bar.logic';

export const StatusBarMain: React.FC = () => {
  const logic = useStatusBarLogic();
  return <StatusBarVisual {...logic} />;
};
