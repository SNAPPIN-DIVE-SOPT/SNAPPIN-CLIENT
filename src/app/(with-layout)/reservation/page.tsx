import ReservationList from './_section/ReservationList';
import { HeaderNavigation } from './components';

export default function Page() {
  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <HeaderNavigation />
      <ReservationList />
    </div>
  );
}
