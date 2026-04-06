import React from 'react';
import { TitleBarVisual } from './title-bar.visual';
import { useTitleBarLogic } from './title-bar.logic';

export const TitleBarMain: React.FC = () => {
  const logic = useTitleBarLogic();
  return <TitleBarVisual {...logic} />;
};
