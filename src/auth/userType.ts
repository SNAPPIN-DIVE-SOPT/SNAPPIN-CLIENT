'use server';

import { cookies } from 'next/headers';
import { UserType } from './constant/userType';
import { USER_TYPE_COOKIE_NAME } from './constant/cookie';

async function setUserType(value: UserType) {
  const cookieStore = await cookies();
  cookieStore.set(USER_TYPE_COOKIE_NAME, value);
}

async function getUserType() {
  const cookieStore = await cookies();
  return cookieStore.get(USER_TYPE_COOKIE_NAME)?.value;
}

async function deleteUserType() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_TYPE_COOKIE_NAME);
}

async function updateUserType(value: UserType) {
  const cookieStore = await cookies();
  cookieStore.set(USER_TYPE_COOKIE_NAME, value);
}

export { setUserType, getUserType, deleteUserType, updateUserType };
