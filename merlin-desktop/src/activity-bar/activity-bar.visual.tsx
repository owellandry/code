import React from 'react';
import type { ActivityBarProps } from './activity-bar.shared';

export const ActivityBarVisual: React.FC<ActivityBarProps> = ({ topItems, bottomItems, activeId, onItemClick }) => {
  return (
    <div className="w-14 bg-[#141414] flex flex-col items-center py-4 justify-between border-r border-[#2a2a2a] z-10">
      <div className="flex flex-col space-y-6 w-full items-center">
        {topItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          const isLogo = item.id === 'logo';
          return (
            <div 
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`relative cursor-pointer transition transform hover:scale-110 w-full flex justify-center ${
                isLogo ? 'text-blue-500' : isActive ? 'text-white' : 'text-textMuted hover:text-white'
              }`}
            >
              <Icon size={28} />
              {isActive && !isLogo && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r"></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col space-y-6 w-full items-center">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeId;
          return (
            <div 
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`relative cursor-pointer transition transform hover:scale-110 w-full flex justify-center ${
                isActive ? 'text-white' : 'text-textMuted hover:text-white'
              }`}
            >
              <Icon size={28} />
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
