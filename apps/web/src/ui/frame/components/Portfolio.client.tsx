'use client';

import { LikeButton } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib/cn';
import { useAuth } from '@/auth/hooks/useAuth';
import { useWishPortfolioLike } from '@/ui/frame/apis';
import { type LikeProps, useLikeButton } from '@/ui/frame/hooks/useLike';

export default function PortfolioClient({ id, isLiked, likeCount }: LikeProps) {
  const { isLogIn } = useAuth();
  const { mutate: wishPortfolio } = useWishPortfolioLike({ id, isLogIn: !!isLogIn });
  const { liked, handleLike, currentLikeCount } = useLikeButton({
    id,
    isLiked,
    likeCount,
    mutate: wishPortfolio,
  });

  return (
    <div className='flex items-center justify-center gap-[0.4rem]'>
      <LikeButton
        isLiked={liked}
        handleClick={handleLike}
        aria-label={liked ? '좋아요 취소' : '좋아요'}
        className={cn(liked ? 'text-neon-black' : 'text-black-1', 'h-[1.6rem] w-[1.6rem]')}
      />
      <span className='caption-11-md text-black-1'>{currentLikeCount}</span>
    </div>
  );
}
