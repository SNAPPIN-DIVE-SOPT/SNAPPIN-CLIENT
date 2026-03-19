import { getUserType } from '@/auth/userType';
import PageClient from './page.client';
import ProfileLayout from '../../../../components/layout/profile/ProfileLayout';
import { isValidUserType, USER_TYPE } from '@snappin/shared/types';

export default async function Page() {
  const sessionUserType = await getUserType();
  const userType =
    sessionUserType && isValidUserType(sessionUserType) ? sessionUserType : USER_TYPE.PHOTOGRAPHER;

  return (
    <ProfileLayout userType={userType}>
      <PageClient initialUserType={userType} />
    </ProfileLayout>
  );
}
