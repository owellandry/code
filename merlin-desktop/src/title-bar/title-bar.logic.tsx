import { useState } from 'react';

export const useTitleBarLogic = () => {
  const [title] = useState('Merlin Editor');
  return { title };
};
