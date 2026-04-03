'use client';

import { Button, BottomCTAButton } from '@snappin/design-system';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui';
import { useGetPhotographerDetail } from '@/app/photographer/[id]/api';

type FooterProps = {
  id: number;
}

export default function Footer({ id }: FooterProps) {
  const { data } = useGetPhotographerDetail(id);
  const { login } = useToast();
  const { isLogIn } = useAuth();

  const handleContactClick = () => {
    if (data.contact) {
      window.open(data.contact, '_blank', 'noopener,noreferrer');
    }
  };
  const handleReservationClick = () => {
    if (!isLogIn) {
      login('예약 기능은 로그인 후에 사용할 수 있어요.', undefined, 'bottom-[8.4rem] px-[2rem]');
      return;
    }
    // TODO: 온보딩 미완 -> 모달 띄우기 (온보딩 이동 모달 디자인 기다리는 중)
    // TODO: 온보딩 완료 -> 예약 양식 페이지로 이동
  };

  return (
    <BottomCTAButton
      className='bg-black-1 bottom-0 w-full max-w-[45rem] px-[2rem] pt-[0.8rem] pb-[2.4rem]'
      fixed
      hasPadding
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
  );
}

export const FooterSkeleton = () => {
  return (
    <BottomCTAButton
      className='bg-black-1 bottom-0 w-full max-w-[45rem] px-[2rem] pt-[0.8rem] pb-[2.4rem]'
      fixed
      hasPadding
    >
      <BottomCTAButton.Double
        leftButton={
          <Button
            color='white'
            size='medium'
            className='border-black-10 text-black-10'
          >
            문의하러 가기
          </Button>
        }
        rightButton={
          <Button
            color='black'
            size='medium'
          >
            예약 문의 작성
          </Button>
        }
      />
    </BottomCTAButton>
  );
}