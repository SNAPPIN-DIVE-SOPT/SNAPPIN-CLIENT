import Link from 'next/link';
import { CSSProperties } from 'react';
import { ImageWithShadow } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';
import PortfolioClient from '../components/Portfolio.client';

type CssSize = CSSProperties['width'];

//TODO: swagger api 업데이트 시, 타입 수정 필요
export type PortfolioFrameProps = {
  id: number;
  image: {
    src: string;
    alt?: string;
  };
  isLiked: boolean;
  likesCount: number;
  height?: CssSize;
  width?: CssSize;
};

export default function PortfolioFrame({
  id,
  image,
  isLiked,
  likesCount,
  width = '100%',
  height = '26.6rem',
}: PortfolioFrameProps) {
  return (
    <Link
      href={ROUTES.PORTFOLIO(id)}
      className='relative flex flex-col overflow-hidden'
      style={{ width: width }}
    >
      <ImageWithShadow
        src={image.src}
        alt={image.alt ?? '포트폴리오 이미지'}
        imageHeight={height}
        imageWidth={width}
      />
      <div className='absolute right-0 bottom-0 flex items-center p-[1.2rem]'>
        <PortfolioClient id={id} isLiked={isLiked} likeCount={likesCount} />
      </div>
    </Link>
  );
}
