'use client';

import { useNavVisibility } from '@/hooks/useNavVisibility';
import Header from './components/header/Header';
import { IconSuccess, IconError } from '@/assets';

export default function PageClient() {
  const { isVisible, handleShowHeader } = useNavVisibility();

  return (
    <div>
      <Header isVisible={isVisible} />
      <div className='h-[200px]' />
      <button onClick={handleShowHeader} className='font-16-bd p-1 text-red-500'>
        SHOW HEADER
      </button>
      <IconSuccess />
      <IconError />
      <div className='h-[1000px] bg-red-500' />
    </div>
  );
}
