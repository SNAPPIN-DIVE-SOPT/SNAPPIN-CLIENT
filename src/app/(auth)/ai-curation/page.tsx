import { Logo } from '@/assets';
import { ClientFooter, LottieAnimation } from './components';

export default function Page() {
  return (
    <div className='bg-black-10 flex h-dvh flex-col'>
      <div className='flex flex-col gap-[4.4rem] mt-[6.4rem]'>
        <div className='flex flex-col items-center gap-[1.2rem]'>
          <Logo className='text-neon-black h-[2.6rem] w-[12.9rem]' />
          <div className='flex flex-col items-center gap-[0.8rem]'>
            <h1 className='title-30-eb text-black-1'>AI 무드 큐레이션</h1>
            <p className='caption-14-md text-black-7'>좋아하는 스냅 사진 무드 찾기</p>
          </div>
        </div>
        <LottieAnimation />
        <ClientFooter />
      </div>
    </div>
  );
}
