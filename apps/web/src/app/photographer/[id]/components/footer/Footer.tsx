'use client';

import { BottomCTAButton } from '@snappin/design-system';
import { useGetPhotographerDetail } from '@/app/photographer/[id]/api';

type FooterProps = {
  id: number;
}

export default function Footer({ id }: FooterProps) {
  const { data } = useGetPhotographerDetail(id);

  const handleContactClick = () => {
    if (data.contact) {
      window.open(data.contact, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <BottomCTAButton
      className='bg-black-1 bottom-0 w-full max-w-[45rem] px-[2rem] pt-[0.8rem] pb-[2.4rem]'
      fixed
      hasPadding
    >
      <BottomCTAButton.Single
        color='white'
        size='medium'
        onClick={handleContactClick}
        className='border-black-10 text-black-10'
      >
        문의하러 가기
      </BottomCTAButton.Single>
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
      <BottomCTAButton.Single
        color='white'
        size='medium'
        className='border-black-10 text-black-10'
      >
        문의하러 가기
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}