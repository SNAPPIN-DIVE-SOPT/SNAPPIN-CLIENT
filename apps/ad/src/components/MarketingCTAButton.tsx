"use client";

import { useRouter } from "next/navigation";
import { Button } from "@snappin/design-system";
import { cn } from "@snappin/design-system/lib";
import { IconArrows } from "@snappin/design-system/assets";

type Base = {
  label: string;
  gtagButtonName: string;
  pagePath: string;
  className?: string;
};

type MarketingCTAButtonProps = Base &
  ({ href: string; route?: never } | { route: string; href?: never });

export default function MarketingCTAButton({
  label,
  gtagButtonName,
  pagePath,
  className,
  href,
  route,
}: MarketingCTAButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    window.gtag?.("event", "button_click", {
      button_name: gtagButtonName,
      page_path: pagePath,
    });
    if (href) window.open(href, "_blank", "noopener,noreferrer");
    else if (route) router.push(route);
  };

  return (
    <Button
      className={cn(`
        w-[26.4rem] px-[2rem] py-[1.3rem] mt-[5.1rem] rounded-[5.6rem]
        flex items-center justify-center gap-[0.4rem]
        font-16-bd text-black-10
        bg-[linear-gradient(94deg,#E7FF7E_10.79%,#D0FF00_91.23%)]
        `,
        className
      )}
      onClick={handleClick}
    >
      {label}
      <IconArrows />
    </Button>
  );
}
