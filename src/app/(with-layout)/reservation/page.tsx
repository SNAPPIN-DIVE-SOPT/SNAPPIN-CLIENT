'use client';

import { HeaderNavigation, ReservationContent } from './components';
import { useNavVisibility } from '@/hooks/useNavVisibility';

const SCROLL_DIRECTION_THRESHOLD_PX = 8;

export default function Page() {
  const { isVisible: isHeaderVisible } = useNavVisibility({
    mode: 'direction',
    initialVisible: true,
    directionThresholdPx: SCROLL_DIRECTION_THRESHOLD_PX,
  });

  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <HeaderNavigation isVisible={isHeaderVisible} />
      <ReservationContent isHeaderVisible={isHeaderVisible} />
    </div>
  );
}
