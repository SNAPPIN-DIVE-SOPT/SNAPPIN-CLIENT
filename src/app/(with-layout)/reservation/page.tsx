import ReservationList from './_section/ReservationList';
import { ClientNavigation } from './components';

export default function Page() {
  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <ClientNavigation />
      <ReservationList />
    </div>
  );
}
