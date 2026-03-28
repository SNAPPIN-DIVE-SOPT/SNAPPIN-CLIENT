"use client";

import { cn } from "@snappin/design-system/lib";
import { Button } from "@snappin/design-system";
import { IconArrows } from "@snappin/design-system/assets";

type AnnouncementButtonProps = {
  className?: string
}

export default function AnnouncementButton({ className }: AnnouncementButtonProps) {
  const handleButtonClick = () => {
    window.open(
      "https://www.instagram.com/snapping.mag/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Button
      className={cn(`
        w-[26.4rem] px-[2rem] py-[1.3rem] rounded-[5.6rem]
        flex items-center justify-center gap-[0.4rem]
        font-16-bd text-black-10
        bg-[linear-gradient(94deg,#E7FF7E_10.79%,#D0FF00_91.23%)]
        `,
        className
      )}
      onClick={handleButtonClick}
    >
      OPEN 소식 받아보기
      <IconArrows />
    </Button>
  );
}
