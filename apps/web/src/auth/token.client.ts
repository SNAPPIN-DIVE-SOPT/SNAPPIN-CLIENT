'use client';

import { ACCESS_TOKEN_COOKIE_NAME } from '@/auth/constant/cookie';

const getCookieValueFromBrowser = (name: string) => {
  const matchedCookie = document.cookie.split('; ').find((cookie) => cookie.startsWith(`${name}=`));

  return matchedCookie
    ? decodeURIComponent(matchedCookie.split('=').slice(1).join('='))
    : undefined;
};

async function setAccessToken(value: string) {
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=${encodeURIComponent(value)}; path=/`;
}

async function getAccessToken() {
  return getCookieValueFromBrowser(ACCESS_TOKEN_COOKIE_NAME);
}

async function deleteAccessToken() {
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

async function isUserLoggedIn() {
  const isUserAccessToken = await getAccessToken();
  return Boolean(isUserAccessToken);
}

export { setAccessToken, getAccessToken, deleteAccessToken, isUserLoggedIn };
