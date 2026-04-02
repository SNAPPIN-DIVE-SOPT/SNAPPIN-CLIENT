import { CSSProperties } from 'react';
import { ImageWithShadow } from '@snappin/design-system';
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
    <div className='relative overflow-hidden' style={{ width }}>
      <ImageWithShadow
        src={image.src}
        alt={image.alt ?? '포트폴리오 이미지'}
        imageHeight={height}
        imageWidth={width}
      />
      <div className='absolute right-0 bottom-0 flex items-center gap-[0.5rem] p-[1.2rem]'>
        <PortfolioClient id={id} isLiked={isLiked} />
        <span className='caption-11-md text-black-1'>{likesCount}</span>
      </div>
    </div>
  );
}
