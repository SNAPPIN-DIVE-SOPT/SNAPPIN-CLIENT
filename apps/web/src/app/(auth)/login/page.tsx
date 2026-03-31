import { ImageSlide } from '@snappin/design-system';
import { Logo } from '@snappin/design-system/assets';
import { IMAGE_SLIDE_MOCK } from '@snappin/shared/mocks';
import { ClientNavigation, LoginButton } from './components';

export default function Page() {
  return (
    <div className='bg-black-10 h-full'>
      <ClientNavigation />
      <div className='mt-[6.4rem] flex flex-col gap-[2.4rem]'>
        <div className='flex flex-col items-center gap-[1.2rem]'>
          <Logo className='text-neon-black h-[2.8rem] w-[15.8rem]' />
          <p className='title-20-md text-black-1'>나만의 무드에서 시작되는 스냅</p>
        </div>
        <ImageSlide data={IMAGE_SLIDE_MOCK.portfolios} />
        <div className='flex justify-center px-[2rem]'>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
