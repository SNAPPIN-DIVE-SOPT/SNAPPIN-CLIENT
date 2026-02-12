import { Divider } from '@/ui';
import { UserType } from '@/auth/constant/userType';
import { ClientHeader, ClientProfileCard, Menus } from './components';

type ProfileLayoutProps = {
  userType: UserType;
  children?: React.ReactNode;
};

export default function ProfileLayout({ userType, children }: ProfileLayoutProps) {
  return (
    <div className='flex flex-col'>
      <ClientHeader />
      <ClientProfileCard userType={userType} />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Menus />
      {children && children}
    </div>
  );
}
