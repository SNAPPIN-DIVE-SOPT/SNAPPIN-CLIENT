import { ClientNavigation, LoginButton } from './components';
import ImageSlide from '@/app/(auth)/_components/image-slide/ImageSlide';
import { Logo } from '@/assets';

export default function Page() {
  return (
    <div className='bg-black-10 h-dvh'>
      <ClientNavigation />
      <div className='mt-[6.4rem] flex flex-col gap-[2.4rem]'>
        <div className='flex flex-col items-center gap-[1.2rem]'>
          <Logo className='text-neon-black h-[2.8rem] w-[15.8rem]' />
          <p className='title-20-bd text-neon-black'>가장 나다운 스냅 촬영</p>
        </div>
        <ImageSlide />
        <div className='flex justify-center px-[2rem]'>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
