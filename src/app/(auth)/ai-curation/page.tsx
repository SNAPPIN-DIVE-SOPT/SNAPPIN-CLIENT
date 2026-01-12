import { Logo } from '@/assets';
import { ClientFooter, ClientNavigation } from './components';
import ImageSlide from '../_components/image-slide/ImageSlide';

export default function page() {
  return (
    <div className='bg-black-10 flex h-dvh flex-col gap-[2.2rem]'>
      <ClientNavigation />
      <div className='flex flex-col items-center gap-[1.2rem]'>
        <Logo className='text-neon-black h-[2rem] w-[10rem]' />
        <div className='flex flex-col items-center gap-[0.2rem]'>
          <h1 className='title-30-eb text-black-1'>AI 무드 큐레이션</h1>
          <p className='font-16-md text-black-7'>좋아하는 스냅 사진 무드 찾기</p>
        </div>
      </div>
      <ImageSlide />
      <p className='text-black-5 caption-14-md text-center'>
        간단한 테스트로 원하는 무드의
        <br />
        스냅 작가를 큐레이션 할게요
      </p>
      <ClientFooter />
    </div>
  );
}
