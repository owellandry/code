import React from 'react';
import type { ActivityBarProps } from './activity-bar.shared';

export const ActivityBarVisual: React.FC<ActivityBarProps> = ({
  topItems,
  bottomItems,
  activeId,
  onItemClick,
}) => {
  const renderItem = (item: ActivityBarProps['topItems'][number]) => {
    const Icon = item.icon;
    const isActive = item.id === activeId;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onItemClick(item.id)}
        className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
          isActive
            ? 'text-white'
            : 'text-[#616161] hover:text-[#b5b5b5]'
        }`}
      >
        <Icon className="text-[22px]" />
      </button>
    );
  };

  return (
    <aside className="flex h-full w-[56px] flex-col justify-between bg-transparent px-2 py-4">
      <div className="flex flex-col items-center gap-4">
        {topItems.map(renderItem)}
      </div>
      <div className="flex flex-col items-center gap-4">
        {bottomItems.map(renderItem)}
      </div>
    </aside>
  );
};
