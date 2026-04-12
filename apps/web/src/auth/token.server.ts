import 'server-only';

import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/auth/constant/cookie';

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
  return Boolean(isUserAccessToken);
}

export { setAccessToken, getAccessToken, deleteAccessToken, isUserLoggedIn };
