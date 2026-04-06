import { useState } from 'react';

export const useStatusBarLogic = () => {
  const [errors] = useState(0);
  const [warnings] = useState(0);
  const [info] = useState(0);

  return {
    errors,
    warnings,
    info,
  };
};
