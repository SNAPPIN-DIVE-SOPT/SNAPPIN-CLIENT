'use client';

import { useEffect, useState } from 'react';

import { isUserLoggedIn, deleteAccessToken } from '@/auth/token';
import { useRouter } from 'next/navigation';
import { deleteUserType } from '../userType';

export function useAuth() {
  const router = useRouter();
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedInStatus = await isUserLoggedIn();
        setIsLogIn(loggedInStatus);
      } catch {
        setIsLogIn(false);
      }
    };

    checkLoginStatus();
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
