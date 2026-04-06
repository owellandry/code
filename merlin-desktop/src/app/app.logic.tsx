import { useState } from 'react';

export const useAppLogic = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return {
    theme,
  };
};
