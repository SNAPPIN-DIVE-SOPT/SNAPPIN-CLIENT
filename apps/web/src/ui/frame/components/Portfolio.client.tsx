'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui';
import { LikeButton } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib/cn';
import { useWishPortfolioLike } from '../apis';

type PortfolioClientProps = {
  id: number;
  isLiked: boolean;
};

export default function PortfolioClient({ id, isLiked }: PortfolioClientProps) {
  const { isLogIn } = useAuth();
  const { error } = useToast();
  const { mutate: wishPortfolio } = useWishPortfolioLike({ id, isLogin: !!isLogIn });
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLike = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (isLogIn === null) {
      return;
    }

    if (!isLogIn) {
      error('로그인이 필요한 기능입니다.', undefined, 'bottom-[8.4rem]');
      return;
    }

    const previousLiked = liked;

    setLiked((prev) => !prev);
    wishPortfolio(id, {
      onError: () => {
        setLiked(previousLiked);
      },
    });
  };

  return (
    <LikeButton
      isLiked={liked}
      handleClick={handleLike}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      className={cn('h-[1.4rem] w-[1.4rem]', liked ? 'text-neon-black' : 'text-black-1')}
    />
  );
}
