'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';

export default function ClientFooter() {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <BottomCTAButton fixed className='px-[2.7rem] pb-[2.8rem]'>
      <BottomCTAButton.Single color='black' size='large' onClick={handleClick}>
        홈으로 가기
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
