import { Divider } from '@/ui';
import { ClientHeader, ClientProfileCard, Menus, SwitchProfile } from './components';

export default function Page() {
  return (
    <div className='bg-black-3 flex flex-col'>
      <ClientHeader />
      <ClientProfileCard />
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <Menus />
      <SwitchProfile />
    </div>
  );
}
