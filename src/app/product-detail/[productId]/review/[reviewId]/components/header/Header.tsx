'use client';

import { useRouter } from 'next/navigation';
import { Navigation, IconButton } from '@/ui';
import { IconClose } from '@/assets';

export default function Header() {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <Navigation
      left={
        <IconButton
          className='flex items-center w-[4.4rem] h-[4.4rem] gap-[1rem]'
          onClick={handleClose}
        >
          <IconClose className='text-black-1' />
        </IconButton>
      }
      center={
        <h1 className='font-16-bd text-black-1 text-center flex-1'>포토 리뷰</h1>
      }
      className='px-[3rem] py-[0.1rem] border-b-1 border-b-black-8 bg-black-10'
      isFixed={true}
    />
  );
}