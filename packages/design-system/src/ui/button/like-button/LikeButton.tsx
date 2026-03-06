'use client';

import { cn } from '@snappin/design-system/lib/cn';
import IconButton from '@snappin/design-system/ui/button/icon-button/IconButton';
import { IconHeart, IconHeartFill } from '../../../assets';

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
    <IconButton aria-label={isLiked ? '좋아요 취소' : '좋아요'} onClick={handleClick}>
      {isLiked
        ? <IconHeartFill className={cn('text-black-9', className)} />
        : <IconHeart className={cn('text-black-9', className)} /> 
      }
    </IconButton>
  );
}

