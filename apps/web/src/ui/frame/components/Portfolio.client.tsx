'use client';

import { LikeButton } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib/cn';
import { useAuth } from '@/auth/hooks/useAuth';
import { useWishPortfolioLike } from '@/ui/frame/apis';
import { type LikeProps, useLikeButton } from '@/ui/frame/hooks/useLike';

export default function PortfolioClient({ id, isLiked }: LikeProps) {
  const { isLogIn } = useAuth();
  const { mutate: wishPortfolio } = useWishPortfolioLike({ id, isLogin: !!isLogIn });
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
