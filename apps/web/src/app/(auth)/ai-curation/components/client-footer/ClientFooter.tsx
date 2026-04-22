'use client';

import { useRouter } from 'next/navigation';
import { Button, BottomCTAButton } from '@snappin/design-system';
import { useAuth } from '@/auth/hooks/useAuth';
import { ROUTES } from '@/constants/routes/routes';
import { useGetAiCurationAllPrefetch } from '@/app/(auth)/ai-curation/[step]/api';
import { useToast } from '@/ui';

export default function ClientFooter() {
  const router = useRouter();
  const prefetchAiCurationAll = useGetAiCurationAllPrefetch();
  const { isLogIn } = useAuth();
  const { login } = useToast();

  const handleStartCuration = () => {
    if (isLogIn === false) {
      login('로그인이 필요한 서비스입니다.', 'bottom-[8.5rem]');
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
