'use client';

import { useNavVisibility } from '@/hooks/useNavVisibility';
import Header from './components/header/Header';

export default function PageClient() {
  const { isVisible } = useNavVisibility();

  return (
    <div>
      <Header isVisible={isVisible} />
      <div className='h-[200px]' />
    </div>
  );
}
