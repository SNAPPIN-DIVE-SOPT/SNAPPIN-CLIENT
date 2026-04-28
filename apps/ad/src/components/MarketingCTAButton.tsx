'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib';
import { IconArrows } from '@snappin/design-system/assets';
import { Base } from '@/src/constants/gtags';

type MarketingCTAButtonProps = Base & {
  className?: string;
};

export default function MarketingCTAButton({
  label,
  gtag,
  route,
  className,
}: MarketingCTAButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    window.gtag?.('event', 'button_click', {
      button_name: gtag,
      page_path: route,
    });

    if (!route) return;

    if (route.startsWith('http://') || route.startsWith('https://')) {
      window.open(route, '_blank', 'noopener,noreferrer');
      return;
    }

    router.push(route);
  };

  return (
    <Button
      className={cn(
        `font-16-bd text-black-10 mt-[5.1rem] flex w-[26.4rem] items-center justify-center gap-[0.4rem] rounded-[5.6rem] bg-[linear-gradient(94deg,#E7FF7E_10.79%,#D0FF00_91.23%)] px-[2rem] py-[1.3rem]`,
        className,
      )}
      onClick={handleClick}
    >
      {label}
      <IconArrows />
    </Button>
  );
}
