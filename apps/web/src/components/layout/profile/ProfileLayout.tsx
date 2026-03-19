import { Divider } from '@snappin/design-system';
import { ClientHeader, ProfileCard, Menus } from './components';
import { UserType } from '@snappin/shared/types';

type ProfileLayoutProps = {
  userType: UserType | null;
  children?: React.ReactNode;
};

export default function ProfileLayout({ userType, children }: ProfileLayoutProps) {
  return (
    <div className='flex flex-col'>
      <ClientHeader />
      <ProfileCard userType={userType} />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Menus />
      {children}
    </div>
  );
}
