'use server';

import { cookies } from 'next/headers';

async function setAccessToken(value: string) {
  const cookieStore = await cookies();
  return cookieStore.set('AccessToken', value);
}

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('AccessToken')?.value;
}

async function deleteAccessToken() {
  const cookieStore = await cookies();
  cookieStore.delete('AccessToken');
}

async function isUserLoggedIn() {
  const isUserAccessToken = await getAccessToken();
  if (!isUserAccessToken) {
    return false;
  } else {
    return true;
  }
}

export { setAccessToken, getAccessToken, deleteAccessToken, isUserLoggedIn };
