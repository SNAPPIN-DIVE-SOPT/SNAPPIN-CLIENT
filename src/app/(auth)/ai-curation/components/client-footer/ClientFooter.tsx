'use client';

import { Button } from '@/ui';
import { useRouter } from 'next/navigation';

export default function ClientFooter() {
  const router = useRouter();
  const handleStartCuration = () => {
    //TODO: AI 무드 큐레이션 시작하기
    router.push('/ai-curation/1');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <BottomCTAButton className='flex flex-col gap-[0.7rem] px-[2rem] pb-[3rem]'>
      <Button color='primary' size='large' onClick={handleStartCuration}>
        AI 무드 큐레이션 시작하기
      </Button>
      <Button color='primary' size='large' onClick={handleGoHome} className='bg-black-4'>
        홈으로 가기
      </Button>
    </BottomCTAButton>
  );
}
