'use server';

import { cookies } from 'next/headers';
import { HAS_PHOTOGRAPHER_PROFILE_COOKIE_NAME, USER_TYPE_COOKIE_NAME } from './constant/cookie';
import { AuthUser } from '@snappin/shared/types';

async function setAuthUser(value: AuthUser) {
  const cookieStore = await cookies();
  cookieStore.set(USER_TYPE_COOKIE_NAME, value.role);
  cookieStore.set(HAS_PHOTOGRAPHER_PROFILE_COOKIE_NAME, value.hasPhotographerProfile.toString());
}

async function deleteAuthUser() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_TYPE_COOKIE_NAME);
  cookieStore.delete(HAS_PHOTOGRAPHER_PROFILE_COOKIE_NAME);
}

async function getUserType() {
  const cookieStore = await cookies();
  return cookieStore.get(USER_TYPE_COOKIE_NAME)?.value;
}

async function getHasPhotographerProfile() {
  const cookieStore = await cookies();
  return cookieStore.get(HAS_PHOTOGRAPHER_PROFILE_COOKIE_NAME)?.value === 'true';
}

export { setAuthUser, deleteAuthUser, getUserType, getHasPhotographerProfile };
