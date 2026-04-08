'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, BottomCTAButton, ConfirmModal } from '@snappin/design-system';
import { useToast } from '@/ui';
import { ROUTES } from '@/constants/routes/routes';
import { useGetUsersOnboarding } from '@/app/product/[id]/api';
import { ON_BOARDING_SESSION_KEY } from '@/constants/on-boarding/on-boarding';

type FooterProps = {
  productId: number;
  contact: string;
  isLogIn: boolean;
};

const TOAST_STYLE = 'px-[2rem] bottom-[8.4rem]';

export default function Footer({ productId, contact, isLogIn }: FooterProps) {
  const router = useRouter();
  const { login } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const { data: hasOnboarding } = useGetUsersOnboarding(isLogIn);

  const handleContactClick = () => {
    if (contact) {
      window.open(contact, '_blank', 'noopener,noreferrer');
    }
  };
  const handleReservationClick = () => {
    // 비로그인 -> 토스트 노출
    if (isLogIn === false) {
      login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, TOAST_STYLE);
      return;
    }

    // 로그인 + 온보딩 완료 -> 예약 문의 작성 페이지로 이동
    if (hasOnboarding) {
      router.push(ROUTES.RESERVATION_FORM(productId));
      return;
    }

    // 로그인 + 온보딩 미완료 -> 온보딩 유도 모달 노출
    setIsOpen(true);
  };
  const handleOnboardingConfirm = () => {
    sessionStorage.setItem(ON_BOARDING_SESSION_KEY.REDIRECT, ROUTES.PRODUCT(productId));
    router.push(ROUTES.ON_BOARDING(1));
  };

  return (
    <>
      <BottomCTAButton
        className='bg-black-1 bottom-0 w-full max-w-[45rem] px-[2rem] pt-[0.8rem] pb-[2.4rem]'
        fixed={true}
      >
        <BottomCTAButton.Double
          leftButton={
            <Button
              color='white'
              size='medium'
              onClick={handleContactClick}
              className='border-black-10 text-black-10'
            >
              문의하러 가기
            </Button>
          }
          rightButton={
            <Button
              color='black'
              size='medium'
              onClick={handleReservationClick}
            >
              예약 문의 작성
            </Button>
          }
        />
      </BottomCTAButton>
      {isOpen && (
        <ConfirmModal
          open={isOpen}
          handleOpenChange={setIsOpen}
          showCloseButton={false}
          title={`예약 문의 작성 전\n기본 정보를 완성해주세요`}
          buttons={[
            {
              label: '취소',
              size: 'medium',
              color: 'disabled',
              onClick: () => setIsOpen(false),
            },
            {
              label: '확인',
              size: 'medium',
              color: 'black',
              onClick: handleOnboardingConfirm,
            },
          ]}
        />
      )}
    </>
  );
}
