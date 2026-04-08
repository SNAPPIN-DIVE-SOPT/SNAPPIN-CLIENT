'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';
import { ON_BOARDING_SESSION_KEY } from '@/constants/on-boarding/on-boarding';

export default function ClientFooter() {
  const router = useRouter();
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    setRedirect(sessionStorage.getItem(ON_BOARDING_SESSION_KEY.REDIRECT));
  }, []);

  const handleClick = () => {
    sessionStorage.removeItem(ON_BOARDING_SESSION_KEY.REDIRECT);
    router.push(redirect ?? ROUTES.HOME);
  };

  return (
    <BottomCTAButton fixed className='px-[2.7rem] pb-[2.8rem]'>
      <BottomCTAButton.Single color='black' size='large' onClick={handleClick}>
        {redirect ? '예약하러 가기' : '홈으로 가기'}
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
