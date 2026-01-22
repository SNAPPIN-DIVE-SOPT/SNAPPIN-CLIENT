'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteAccessToken, getAccessToken } from '../token';
import { deleteUserType } from '../userType';

export function useAuth() {
  const router = useRouter();
  const [isLogIn, setIsLogIn] = useState<boolean|null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  useEffect(() => {
    getAccessToken().then((token) => {
      setIsLogIn(!!token);
    });
  }, []);

  const logout = async () => {
    setIsLoggingOut(true);
    await deleteAccessToken();
    await deleteUserType();
    setIsLogIn(false);
    setIsLoggingOut(false);
    router.push('/');
  };

  return {
    isLogIn,
    logout,
    isLoggingOut,
  };
}
