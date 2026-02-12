import { redirect } from 'next/navigation';
import { getHasPhotographerProfile } from '@/auth/userType';
import { USER_TYPE } from '@/auth/constant/userType';
import ProfileLayout from '@/components/layout/profile/ProfileLayout';

export default async function Page() {
  const has = await getHasPhotographerProfile();

  if (has === 'true') {
    redirect('/photographers/profile');
  }
  return <ProfileLayout userType={USER_TYPE.CLIENT} />;
}
