'use client';

import { useState } from 'react';
import { overlay } from 'overlay-kit';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/hooks/useAuth';
import { ROUTES } from '@/constants/routes/routes';
import { useToast } from '@/ui';
import { Button, BottomCTAButton, ResultModal } from '@snappin/design-system';
import { ReservationDraft } from '@/app/product/[id]/types/reservation';
import ReservationBottomDrawer from '@/app/product/[id]/components/reservation-bottom-drawer/ReservationBottomDrawer';

type FooterProps = {
  productId: number;
  contact: string;
  amount: number;
};

const TOAST_STYLE = 'px-[2rem] bottom-[8.4rem]';

export default function Footer({ productId, contact, amount }: FooterProps) {
  const router = useRouter();
  const { login } = useToast();
  const { isLogIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<ReservationDraft>({
    date: null,
    time: null,
    durationHours: null,
    participantCount: 1,
    placeId: null,
    place: '',
    request: '',
  });

  const close = () => setIsOpen(false);
  const handleContact = () => {
    if (contact) {
      window.open(contact, '_blank', 'noopener,noreferrer');
    }
  };
  const handleOpenDrawer = () => {
    if (isLogIn === false) {
      login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, TOAST_STYLE);
      return;
    }
    // TODO: 온보딩 미완 -> 모달 띄우기 (온보딩 이동 모달 디자인 기다리는 중)
    // TODO: 온보딩 완료 -> 예약 양식 페이지로 이동
    setIsOpen(true);
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
              onClick={handleContact}
              className='border-black-10 text-black-10'
            >
              문의하러 가기
            </Button>
          }
          rightButton={
            <Button
              color='black'
              size='medium'
              onClick={handleOpenDrawer}
            >
              예약 문의 작성
            </Button>
          }
        />
      </BottomCTAButton>
      {isOpen && (
        <ReservationBottomDrawer
          isOpen={isOpen}
          productId={String(productId)}
          amount={amount}
          draft={draft}
          setDraftAction={setDraft}
          handleOpenChangeAction={() => close()}
          onSuccessReservationAction={() => {
            overlay.open(({ isOpen, close }) => (
              <ResultModal
                open={isOpen}
                handleOpenChange={close}
                showCloseButton={false}
                type='success'
                title='예약 요청이 완료되었어요!'
                description="'내 예약'에서 진행 상황을 확인해보세요"
                buttons={[
                  {
                    label: '닫기',
                    size: 'medium',
                    color: 'disabled',
                    onClick: close,
                  },
                  {
                    label: '내 예약 확인',
                    size: 'medium',
                    color: 'black',
                    onClick: () => router.push(ROUTES.RESERVATIONS),
                  },
                ]}
              />
            ));
          }}
        />
      )}
    </>
  );
}
