import { cn } from '@snappin/design-system/lib';
import { LikeButton } from '@snappin/design-system';

type ProductClientProps = {
  id: number;
  isLiked: boolean;
};

export default function ProductClient({ id, isLiked }: ProductClientProps) {
  //TODO: 로그인 여부에 따른 좋아요 기능 구현
  const handleLike = () => {
    console.log(`상품 ${id} 좋아요 토글 (현재 상태: ${isLiked})`);
  };

  return (
    <LikeButton
      isLiked={isLiked}
      handleClick={handleLike}
      className={cn('h-[1.4rem] w-[1.4rem]', isLiked ? 'text-neon-black' : 'text-black-1')}
    />
  );
}
