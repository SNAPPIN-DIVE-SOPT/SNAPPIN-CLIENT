import dynamic from 'next/dynamic';
import { NavigationClient } from './components';
import ReservationCardSkeleton from './components/reservation-card/ReservationCardSkeleton';

const ReservationContent = dynamic(
  () => import('./components/reservation-content/ReservationContent'),
  {
    loading: () => <ReservationCardSkeleton />,
  },
);

export default function Page() {
  return (
    <div className='flex flex-col'>
      <NavigationClient />
      <ReservationContent />
    </div>
  );
}
