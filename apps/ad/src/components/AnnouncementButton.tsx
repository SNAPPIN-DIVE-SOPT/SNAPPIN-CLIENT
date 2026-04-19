'use client';

import { cn } from '@snappin/design-system/lib';
import { Button } from '@snappin/design-system';
import { IconArrows } from '@snappin/design-system/assets';
import { ROUTES } from '@/src/constants/routes';

type AnnouncementButtonProps = {
  className?: string;
};

export default function AnnouncementButton({ className }: AnnouncementButtonProps) {
  const handleButtonClick = () => {
    window.open(ROUTES.SNAPPIN_INSTAGRAM, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      className={cn(
        `font-16-bd text-black-10 flex w-[26.4rem] items-center justify-center gap-[0.4rem] rounded-[5.6rem] bg-[linear-gradient(94deg,#E7FF7E_10.79%,#D0FF00_91.23%)] px-[2rem] py-[1.3rem]`,
        className,
      )}
      onClick={handleButtonClick}
    >
      OPEN 소식 받아보기
      <IconArrows />
    </Button>
  );
}
