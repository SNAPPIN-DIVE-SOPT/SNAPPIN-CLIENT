'use client';

import { cn } from '@snappin/design-system/lib';
import { LikeButton } from '@snappin/design-system';
import { useAuth } from '@/auth/hooks/useAuth';
import { type LikeProps, useLikeButton } from './hooks/useLikeButton';
import { useWishProductLike } from './apis';

export default function LikeClient({ id, isLiked }: LikeProps) {
  const { isLogIn } = useAuth();
  const { mutate: wishProduct } = useWishProductLike({ id, isLogIn: !!isLogIn });
  const { liked, handleLike } = useLikeButton({ id, isLiked, mutate: wishProduct });

  return (
    <LikeButton
      isLiked={liked}
      handleClick={handleLike}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      className={cn(liked ? 'text-neon-black' : 'text-black-1', 'h-[2rem] w-[2rem]')}
    />
  );
}
