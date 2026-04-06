import React from 'react';
import { ActivityBarVisual } from './activity-bar.visual';
import { useActivityBarLogic } from './activity-bar.logic';

export const ActivityBarMain: React.FC = () => {
  const logic = useActivityBarLogic();
  return <ActivityBarVisual {...logic} />;
};
