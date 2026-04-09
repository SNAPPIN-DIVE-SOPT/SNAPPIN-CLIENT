'use client';

import { cn } from '@snappin/design-system/lib';
import { LikeButton } from '@snappin/design-system';
import { useAuth } from '@/auth/hooks/useAuth';
import { useWishProductLike } from '@/ui/frame/apis';
import { type LikeProps, useLikeButton } from '@/ui/frame/hooks/useLike';

export default function ProductClient({ id, isLiked }: LikeProps) {
  const { isLogIn } = useAuth();
  const { mutate: wishProduct } = useWishProductLike({ id, isLogin: !!isLogIn });
  const { liked, handleLike } = useLikeButton({ id, isLiked, mutate: wishProduct });

  return (
    <LikeButton
      isLiked={liked}
      handleClick={handleLike}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      className={cn('h-[1.4rem] w-[1.4rem]', liked ? 'text-neon-black' : 'text-black-1')}
    />
  );
}
