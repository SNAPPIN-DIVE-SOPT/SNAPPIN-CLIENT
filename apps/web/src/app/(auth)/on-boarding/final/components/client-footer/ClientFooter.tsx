'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { readReturnToContext, resolveReturnToPath } from '@/auth/utils/returnTo';
import { ROUTES } from '@/constants/routes/routes';

export default function ClientFooter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnToContext = readReturnToContext(searchParams);
  const buttonLabel = returnToContext.returnTo ? '이전 화면으로 가기' : '홈으로 가기';

  const handleClick = () => {
    router.push(resolveReturnToPath(returnToContext, ROUTES.HOME));
  };

  return (
    <BottomCTAButton fixed className='px-[2.7rem] pb-[2.8rem]'>
      <BottomCTAButton.Single color='black' size='large' onClick={handleClick}>
        {buttonLabel}
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
