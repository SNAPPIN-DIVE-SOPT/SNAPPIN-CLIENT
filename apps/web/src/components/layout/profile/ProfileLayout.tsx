import { Divider } from '@snappin/design-system';
import { ClientHeader, ProfileCard, Menus } from './components';
import { UserType } from '@snappin/shared/types';

type ProfileLayoutProps = {
  userType: UserType | null;
  children?: React.ReactNode;
  isSwitching?: boolean;
};

export default function ProfileLayout({ userType, children, isSwitching }: ProfileLayoutProps) {
  return (
    <div className='flex flex-col'>
      <ClientHeader />
      <ProfileCard userType={userType} isSwitching={isSwitching} />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Menus />
      {children}
    </div>
  );
}
