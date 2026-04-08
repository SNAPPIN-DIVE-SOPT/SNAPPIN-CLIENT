'use client';

import { type MouseEvent, useEffect, useState } from 'react';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui';

export type LikeProps = {
  id: number;
  isLiked: boolean;
};

type UseLikeButtonProps = LikeProps & {
  mutate: (id: number, options: { onError: () => void }) => void;
};

export const useLikeButton = ({ id, isLiked, mutate }: UseLikeButtonProps) => {
  const { isLogIn } = useAuth();
  const { error } = useToast();
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleLike = (e?: MouseEvent<HTMLButtonElement>) => {
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
    mutate(id, {
      onError: () => {
        setLiked(previousLiked);
      },
    });
  };

  return { liked, handleLike };
};
