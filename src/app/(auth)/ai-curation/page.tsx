import { Logo } from '@/assets';
import { ClientFooter, ClientNavigation } from './components';

import LottieAnimation from './components/lottie-animation/LottieAnimation';

export default function Page() {
  return (
    <div className='bg-black-10 flex h-dvh flex-col'>
      <ClientNavigation />
      <div className='flex flex-col gap-[4.1rem]'>
        <div className='flex flex-col items-center gap-[1.2rem]'>
          <Logo className='text-neon-black h-[2.6rem] w-[12.9rem]' />
          <div className='flex flex-col items-center gap-[0.2rem]'>
            <h1 className='title-30-eb text-black-1'>AI 무드 큐레이션</h1>
            <p className='font-16-md text-black-7'>좋아하는 스냅 사진 무드 찾기</p>
          </div>
        </div>
        <LottieAnimation />
        <p className='text-black-5 caption-14-md text-center'>
          간단한 질문을 통해
          <br />
          내가 원하는 무드를 알아볼게요
        </p>
        <ClientFooter />
      </div>
    </div>
  );
}
