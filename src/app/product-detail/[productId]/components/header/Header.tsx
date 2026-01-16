'use client';

import { useRouter } from 'next/navigation';
import { Navigation, IconButton} from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';

export default function Header() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  }

  const handleGoHome = () => {
    router.push('/');
  }

  return (
    <Navigation
      left={
        <IconButton
          className='flex items-center w-[4.4rem] h-[4.4rem] gap-[1rem]'
          onClick={handleGoBack}
        >
          <IconArrowBack />
        </IconButton>
      }
      center={
        <h1 className='caption-14-bd text-black-10 text-center flex-1'>상품 상세</h1>
      }
      right={
        <IconButton
          className='flex justify-end items-center w-[4.4rem] h-[4.4rem] gap-[1rem]'
          onClick={handleGoHome}
        >
          <IconHome />
        </IconButton>
      }
      className='flex justify-between items-center px-[2rem] py-[0.3rem] border-b-1 border-b-black-5 bg-black-1 z-20'
      isFixed={true}
    />
  );
}