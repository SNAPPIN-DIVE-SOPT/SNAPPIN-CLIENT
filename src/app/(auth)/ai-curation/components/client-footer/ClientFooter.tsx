'use client';

import { useRouter } from 'next/navigation';
import { Button, BottomCTAButton } from '@/ui';
import { useGetAiCurationAllPrefetch } from '../../[step]/api';
import { useAuth } from '@/auth/hooks/useAuth';

export default function ClientFooter() {
  const router = useRouter();
  const prefetchAiCurationAll = useGetAiCurationAllPrefetch();
  const { isLogIn } = useAuth();
  
  const handleStartCuration = () => {
    if (!isLogIn) {
      router.push('/login');
      return;
    }
    prefetchAiCurationAll();
    router.push('/ai-curation/1');
  };

  return (
    <BottomCTAButton fixed={true} hasPadding={true} className=' flex flex-col gap-[0.7rem] px-[2rem] pb-[3rem] z-100'>
      <Button color='primary' size='large' onClick={handleStartCuration} className='font-16-bd'>
        AI 무드 큐레이션 시작하기
      </Button>
    </BottomCTAButton>
  );
}
