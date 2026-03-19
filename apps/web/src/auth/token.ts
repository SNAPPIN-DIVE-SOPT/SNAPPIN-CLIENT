'use server';

import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE_NAME } from './constant/cookie';

async function setAccessToken(value: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, value);
}

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
}

async function deleteAccessToken() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE_NAME);
}

async function isUserLoggedIn() {
  const isUserAccessToken = await getAccessToken();
  if (!isUserAccessToken) {
    return false;
  }
  return true;
}

export { setAccessToken, getAccessToken, deleteAccessToken, isUserLoggedIn };
