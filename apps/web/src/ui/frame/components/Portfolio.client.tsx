'use client';

import { LikeButton } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib/cn';
import { useAuth } from '@/auth/hooks/useAuth';
import { useWishPortfolioLike } from '@/ui/frame/apis';
import { type LikeProps, useLikeButton } from '@/ui/frame/hooks/useLike';

export function PortfolioClient({ id, isLiked }: LikeProps) {
  const { isLogIn } = useAuth();
  const { mutate: wishPortfolio } = useWishPortfolioLike({ id, isLogIn: !!isLogIn });
  const { liked, handleLike } = useLikeButton({ id, isLiked, mutate: wishPortfolio });

  return (
    <LikeButton
      isLiked={liked}
      handleClick={handleLike}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      className={cn(liked ? 'text-neon-black' : 'text-black-1')}
    />
  );
}

export function PortfolioWithLikeCountClient({ id, isLiked, likeCount }: LikeProps) {
  const { isLogIn } = useAuth();
  const { mutate: wishPortfolio } = useWishPortfolioLike({ id, isLogIn: !!isLogIn });
  const { liked, handleLike, currentLikeCount } = useLikeButton({
    id,
    isLiked,
    likeCount,
    mutate: wishPortfolio,
  });

  return (
    <>
      <LikeButton
        isLiked={liked}
        handleClick={handleLike}
        aria-label={liked ? '좋아요 취소' : '좋아요'}
        className={cn(liked ? 'text-neon-black' : 'text-black-1')}
      />
      <span className='caption-11-md text-black-1'>{currentLikeCount}</span>
    </>
  );
}
