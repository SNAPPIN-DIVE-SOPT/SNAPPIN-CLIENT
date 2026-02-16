'use client';

import { useRouter } from 'next/navigation';
import { Button, BottomCTAButton } from '@/ui';
import { useGetAiCurationAllPrefetch } from '../../[step]/api';
import { useAuth } from '@/auth/hooks/useAuth';
import { ROUTES } from '@/constants/routes/routes';

export default function ClientFooter() {
  const router = useRouter();
  const prefetchAiCurationAll = useGetAiCurationAllPrefetch();
  const { isLogIn } = useAuth();

  const handleStartCuration = () => {
    if (isLogIn === false) {
      router.push(ROUTES.LOGIN());
      return;
    }
    prefetchAiCurationAll();
    router.push(ROUTES.AI_CURATION_STEP(1));
  };

  return (
    <BottomCTAButton
      fixed={true}
      hasPadding={true}
      className='z-100 flex flex-col gap-[0.7rem] px-[2rem] pb-[3rem]'
    >
      <Button color='primary' size='large' onClick={handleStartCuration} className='font-16-bd'>
        AI 무드 큐레이션 시작하기
      </Button>
    </BottomCTAButton>
  );
}
