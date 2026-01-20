import { Suspense } from 'react';
import { ReservationContent, NavigationClient } from './components';

export default function Page() {
  return (
    <div className='flex flex-col'>
      <NavigationClient />
      <Suspense fallback={null}>
        <ReservationContent />
      </Suspense>
    </div>
  );
}
