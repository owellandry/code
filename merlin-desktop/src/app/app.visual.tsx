import React from 'react';
import { LayoutMain } from '../layout/layout.main';

export const AppVisual: React.FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className={`${theme} h-full w-full overflow-hidden bg-[#111214]`}>
      <LayoutMain />
    </div>
  );
};
