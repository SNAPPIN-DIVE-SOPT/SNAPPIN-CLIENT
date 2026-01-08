import { ClientNavigation, ImageSlide, LoginButton } from './components';
import { Logo } from '@/assets';

export default function page() {
  return (
    <div>
      <ClientNavigation />
      <div className='mt-[11.4rem] flex flex-col gap-[2.4rem]'>
        <div className='flex flex-col items-center gap-[1.2rem]'>
          <Logo className='text-black-10 h-[2.6rem] w-[12.9rem]' />
          <p className='title-20-bd'>가장 나다운 스냅 촬영</p>
        </div>
        {/* TODO: 로그인 폼 */}
        <ImageSlide />

        <div className='flex justify-center px-[2rem]'>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
