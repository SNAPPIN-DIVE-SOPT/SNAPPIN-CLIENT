'use client';

import { useNavVisibility, NavVisibleContext } from '@/hooks/useNavVisibility';

import Header from './components/header/Header';

export default function PageClient() {
  const { isVisible, handleShowHeader } = useNavVisibility();
  return (
    <NavVisibleContext.Provider value={isVisible}>
      <Header />
      <div className='h-[200px]'></div>
      <button onClick={handleShowHeader} className='font-16-bd p-1 text-red-500'>
        SHOW HEADER
      </button>
      <div className='h-[1000px]'></div>
    </NavVisibleContext.Provider>
  );
}
