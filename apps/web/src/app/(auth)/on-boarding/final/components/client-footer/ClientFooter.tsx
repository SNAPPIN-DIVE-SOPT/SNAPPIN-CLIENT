'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { resolveReturnToPath } from '@/auth/utils/returnTo';
import { ROUTES } from '@/constants/routes/routes';

type ClientFooterProps = {
  returnTo?: string;
};
export default function ClientFooter({ returnTo }: ClientFooterProps) {
  const router = useRouter();

  const buttonLabel = returnTo ? '이전 화면으로 가기' : '홈으로 가기';

  const handleClick = () => {
    router.push(resolveReturnToPath({ returnTo }, ROUTES.HOME));
  };

  return (
    <BottomCTAButton fixed className='px-[2.7rem] pb-[2.8rem]'>
      <BottomCTAButton.Single color='black' size='large' onClick={handleClick}>
        {buttonLabel}
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
