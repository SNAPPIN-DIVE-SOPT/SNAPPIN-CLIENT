'use client';

import { useEffect, useState } from 'react';
import { getLoginStatus } from '../localStorage';

export function useAuth() {
  const [isLogIn, setIsLogIn] = useState<boolean | null>(() =>
    getLoginStatus() === 'logged_in',
  );

  const sync = () => {
    setIsLogIn(getLoginStatus() === 'logged_in');
  };

  useEffect(() => {
    window.addEventListener('auth:changed', sync);
    return () => window.removeEventListener('auth:changed', sync);
  }, []);

  return { isLogIn };
}
