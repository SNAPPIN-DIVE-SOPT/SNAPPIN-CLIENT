'use client';

import { cn } from '@/utils/cn';
import { IconButton } from '@/ui';
import { IconHeart, IconHeartFill } from '@/assets';

type LikeButtonProps = {
  isLiked: boolean;
  className?: string;
  handleClick: () => void;
}

export default function LikeButton({
  isLiked,
  className,
  handleClick
}: LikeButtonProps) {
  return (
    <IconButton className={cn('w-[2.4rem] h-[2.4rem] shrink-0', className)} onClick={handleClick}>
      {isLiked
        ? <IconHeartFill className='text-black-9' />
        : <IconHeart className='text-black-9' /> 
      }
    </IconButton>
  );
}