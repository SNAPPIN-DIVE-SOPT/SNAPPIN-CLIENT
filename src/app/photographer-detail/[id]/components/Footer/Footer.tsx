'use client';

import { BottomCTAButton } from '@/ui';
import { useToast } from '@/ui/toast/hooks/useToast';

export default function Footer() {
  const { alert } = useToast();

  const handleContact = () => alert('메시지 기능은 준비 중이에요. 조금만 기다려주세요!', undefined, 'bottom-[8.4rem] px-[2rem]');

  return (
    <BottomCTAButton
      className='bottom-0 w-full max-w-[45rem] px-[2rem] pt-[0.8rem] pb-[2.4rem] bg-black-1'
      fixed
      hasPadding
    >
      <BottomCTAButton.Single
        color='black'
        onClick={handleContact}
      >
        문의하기
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}