'use client';

import { type MouseEvent, useEffect, useState } from 'react';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui';

export type LikeProps = {
  id: number;
  isLiked: boolean;
  likeCount?: number;
  iconClassName?: string;
  textClassName?: string;
};

type UseLikeButtonProps = Pick<LikeProps, 'id' | 'isLiked' | 'likeCount'> & {
  mutate: (id: number, options: { onError: () => void }) => void;
};

export const useLikeButton = ({ id, isLiked, likeCount, mutate }: UseLikeButtonProps) => {
  const { isLogIn } = useAuth();
  const { error } = useToast();
  const [liked, setLiked] = useState(isLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount ?? 0);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  useEffect(() => {
    setCurrentLikeCount(likeCount ?? 0);
  }, [likeCount]);

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
    const previousLikeCount = currentLikeCount;
    const nextLiked = !previousLiked;

    setLiked(nextLiked);
    setCurrentLikeCount(nextLiked ? previousLikeCount + 1 : previousLikeCount - 1);
    mutate(id, {
      onError: () => {
        setLiked(previousLiked);
        setCurrentLikeCount(previousLikeCount);
      },
    });
  };

  return { liked, handleLike, currentLikeCount };
};
