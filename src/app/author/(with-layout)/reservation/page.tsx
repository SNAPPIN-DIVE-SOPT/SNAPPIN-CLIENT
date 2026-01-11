import { ReservationContent, NavigationClient } from './components';

export default function Page() {
  return (
    <div className='flex flex-col'>
      <NavigationClient />
      <ReservationContent />
    </div>
  );
}
