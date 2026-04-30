'use client';

import { IconArrowBack } from '@snappin/design-system/assets';
import { IconButton, Navigation } from '@snappin/design-system';

type ClientHeaderProps = {
  handleClickBack: () => void;
};

export default function ClientHeader({ handleClickBack }: ClientHeaderProps) {
  return (
    <Navigation
      left={
        <IconButton onClick={handleClickBack} className='h-[2.4rem] w-[2.4rem]'>
          <IconArrowBack />
        </IconButton>
      }
      center={
        <h1 className='font-16-bd text-black-10 block max-w-[20rem] truncate'>
          예약 문의 양식 작성하기
        </h1>
      }
      isFixed
    />
  );
}
