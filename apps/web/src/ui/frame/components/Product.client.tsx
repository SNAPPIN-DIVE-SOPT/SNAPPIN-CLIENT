'use client';

import { useEffect, useState } from 'react';
import { cn } from '@snappin/design-system/lib';
import { LikeButton } from '@snappin/design-system';
import { useAuth } from '@/auth/hooks/useAuth';
import { useWishProductLike } from '@/ui/frame/apis';
import { useToast } from '@/ui';

type ProductClientProps = {
  id: number;
  isLiked: boolean;
};

export default function ProductClient({ id, isLiked }: ProductClientProps) {
  const { isLogIn } = useAuth();
  const { error } = useToast();
  const { mutate: wishProduct } = useWishProductLike({ id, isLogin: !!isLogIn });
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
    wishProduct(id, {
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
