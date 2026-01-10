import { HeaderNavigation, ReservationContent } from './components';

export default function Page() {
  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <HeaderNavigation />
      <ReservationContent />
    </div>
  );
}
