import { getUserType } from '@/auth/userType';
import ProfileLayout from '@/components/layout/profile/ProfileLayout';
import { isValidUserType, USER_TYPE } from '@snappin/shared/types';
import PageClient from './page.client';

export default async function Page() {
  const sessionUserType = await getUserType();
  const userType =
    sessionUserType && isValidUserType(sessionUserType) ? sessionUserType : USER_TYPE.PHOTOGRAPHER;

  return <PageClient initialUserType={userType} />;
}
