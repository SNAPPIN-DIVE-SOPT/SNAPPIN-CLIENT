'use client';

import IconButton from '../icon-button/IconButton';
import { IconHeart, IconHeartFill } from '../../../assets';
import { cn } from '../../../lib/cn';

type LikeButtonProps = {
  isLiked: boolean;
  className?: string;
  handleClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function LikeButton({ isLiked, className, handleClick }: LikeButtonProps) {
  return (
    <IconButton aria-label={isLiked ? '좋아요 취소' : '좋아요'} onClick={handleClick}>
      {isLiked ? (
        <IconHeartFill className={cn('text-black-9', className)} />
      ) : (
        <IconHeart className={cn('text-black-9', className)} />
      )}
    </IconButton>
  );
}
