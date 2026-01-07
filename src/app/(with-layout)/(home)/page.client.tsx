'use client';

import { useNavVisibility } from '@/app/(with-layout)/(home)/hooks/useNavVisibility';
import Header from './components/header/Header';

export default function PageClient() {
  const { isVisible } = useNavVisibility();

  return (
    <div>
      <Header isVisible={isVisible} />
      <div className='h-[200px] bg-red-500' />
      <div className='bg-black-3 h-[200px]' />
      <div className='h-[200px] bg-green-500' />
      <div className='h-[200px] bg-blue-500' />
      <div className='bg-black-3 h-[200px]' />
      <div className='h-[200px] bg-red-500' />
      <div className='bg-black-3 h-[200px]' />
      <div className='h-[200px] bg-green-500' />
      <div className='h-[200px] bg-blue-500' />
      <div className='bg-black-3 h-[200px]' />
    </div>
  );
}
