'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib';
import { ROUTES } from '@/constants/routes/routes';
type AiCurationButtonProps = {
  className?: string;
};

export default function AiCurationButton({ className }: AiCurationButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.AI_CURATION);
  };

  return (
    <Button
      onClick={handleClick}
      color='primary'
      size='large'
      className={cn('font-16-sb rounded-[4.6rem] px-[2.4rem] py-[1.3rem]', className)}
    >
      AI 무드큐레이션 하러가기
    </Button>
  );
}
