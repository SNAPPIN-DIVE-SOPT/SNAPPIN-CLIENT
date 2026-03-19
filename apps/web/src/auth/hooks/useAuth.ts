'use client';

import { useEffect, useState } from 'react';
import { getAccessToken } from '../token';

export const useAuth = () => {
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);

  useEffect(() => {
    getAccessToken().then((token) => {
      setIsLogIn(!!token);
    });
  }, []);

  return {
    isLogIn,
  };
};
