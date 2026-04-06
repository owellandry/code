import React from 'react';
import { AppVisual } from './app.visual';
import { useAppLogic } from './app.logic';
import { AppContext } from './app.context';

export const AppMain: React.FC = () => {
  const logic = useAppLogic();

  return (
    <AppContext.Provider value={logic}>
      <AppVisual theme={logic.theme} />
    </AppContext.Provider>
  );
};
