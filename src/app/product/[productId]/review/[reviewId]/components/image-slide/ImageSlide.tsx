import { ImageCarouselWithSideBtn } from '@/ui/carousel';

type ImageSlideProps = {
  images: { src: string; alt?: string }[];
  initialIndex?: number;
};

export default function ImageSlide({ images, initialIndex }: ImageSlideProps) {
  return <ImageCarouselWithSideBtn images={images} initialIndex={initialIndex} />;
}
