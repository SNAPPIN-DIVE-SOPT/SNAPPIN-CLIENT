'use client';

import { LikeButton } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib/cn';

type PortfolioClientProps = {
  id: number;
  isLiked: boolean;
};

export default function PortfolioClient({ id, isLiked }: PortfolioClientProps) {
  const handleClickLike = () => {
    console.log(`포트폴리오 ${id} 좋아요 토글 (현재 상태: ${isLiked})`);
  };

  return (
    <LikeButton
      isLiked={isLiked}
      handleClick={handleClickLike}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      className={cn('h-[1.4rem] w-[1.4rem]', isLiked ? 'text-neon-black' : 'text-black-1')}
    />
  );
}
