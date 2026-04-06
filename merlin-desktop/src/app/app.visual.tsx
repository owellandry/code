import React from 'react';
import { LayoutMain } from '../layout/layout.main';

export const AppVisual: React.FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className={`${theme} h-full w-full`}>
      <LayoutMain />
    </div>
  );
};
