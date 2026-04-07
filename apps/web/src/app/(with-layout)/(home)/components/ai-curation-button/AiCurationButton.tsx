import { Button } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib';

type AiCurationButtonProps = {
  className?: string;
};

export default function AiCurationButton({ className }: AiCurationButtonProps) {
  return (
    <Button
      color='primary'
      size='large'
      className={cn('font-16-sb rounded-[4.6rem] px-[2.4rem] py-[1.3rem]', className)}
    >
      AI 무드큐레이션 하러가기
    </Button>
  );
}
