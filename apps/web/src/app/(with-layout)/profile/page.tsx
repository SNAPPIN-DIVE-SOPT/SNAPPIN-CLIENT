import { redirect } from 'next/navigation';
import { getHasPhotographerProfile } from '@/auth/userType';
import ProfileLayout from '../../../components/layout/profile/ProfileLayout';
import { PHOTOGRAPHERS_ROUTES } from '@/constants/routes/routes';
import { USER_TYPE } from '@snappin/shared/types/userType';

export default async function Page() {
  const hasPhotographerProfile = await getHasPhotographerProfile();

  if (hasPhotographerProfile) {
    redirect(PHOTOGRAPHERS_ROUTES.PROFILE);
  }
  return <ProfileLayout userType={USER_TYPE.CLIENT} />;
}
