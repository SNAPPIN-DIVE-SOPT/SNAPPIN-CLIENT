import { ReservationContent, NavigationClient } from './components';

export default function page() {
  return (
    <div className='flex flex-col'>
      <NavigationClient />
      <ReservationContent />
    </div>
  );
}
