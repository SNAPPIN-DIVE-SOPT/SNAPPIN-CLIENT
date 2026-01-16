import { useState } from 'react';
import { Button, BottomCTAButton, ReservationBottomDrawer } from '@/ui';
import { ReservationDraft, ReservationConstraints } from '@/ui/drawer/reservation/types/reservation';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useAuth } from '@/auth/hooks/useAuth';

type FooterProps = {
  productId: string;
  amount: number;
  reservationConstraints: ReservationConstraints;
}

export default function Footer({
  productId,
  amount,
  reservationConstraints,
}: FooterProps) {
  const { isLogIn } = useAuth();
  const { alert, login } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [draft, setDraft] = useState<ReservationDraft>({
    date: null,
    time: null,
    durationHours: 1,
    participantCount: 1,
    place: '',
    request: '',
  });
  const toastStyle = 'px-[2rem] bottom-[8.4rem]';

  const handleContact = () => {
    if (isLogIn) {
      alert('메시지 기능은 준비 중이에요. 조금만 기다려주세요!', undefined, toastStyle);
    } else {
      login('문의 기능은 로그인 후에 사용할 수 있어요.', undefined, toastStyle);
    }
  }

  const handleReservation = () => {
    if (!isLogIn) {
      setIsDrawerOpen(true);
    } else {
      login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, toastStyle);
    }
  }

  // TODO: 예약 로직
  const handleSubmit = () => {};

  return (
    <>
      <BottomCTAButton
        className='bottom-0 w-full max-w-[45rem] px-[2rem] pt-[0.8rem] pb-[2.4rem] bg-black-1'
        fixed={true}
      >
        <BottomCTAButton.Double
          leftButton={<Button color='white' size='medium' onClick={handleContact}>문의하기</Button>}
          rightButton={<Button color='black' size='medium' onClick={handleReservation}>예약하기</Button>}
        />
      </BottomCTAButton>
      <ReservationBottomDrawer
        isOpen={isDrawerOpen}
        productId={Number(productId)}
        amount={amount}
        handleOpenChangeAction={setIsDrawerOpen}
        draft={draft}
        handleDraftChangeAction={setDraft}
        reservationConstraints={reservationConstraints}
        onFormSubmitAction={handleSubmit}
      />
    </>
  );
}