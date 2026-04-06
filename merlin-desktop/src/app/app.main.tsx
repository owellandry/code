import React from 'react';
import { AppVisual } from './app.visual';
import { useAppLogic } from './app.logic';

export const AppMain: React.FC = () => {
  const logic = useAppLogic();
  return <AppVisual {...logic} />;
};
