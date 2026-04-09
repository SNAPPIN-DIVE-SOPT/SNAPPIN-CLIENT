import type React from 'react';
import ImageCarouselWithDots from './ImageCarouselWithDots';
import ImageCarouselWithSideBtn from './ImageCarouselWithSideBtn';

type Variant = 'sideButtons' | 'dots';

export type ImageCarouselBaseProps = React.ComponentProps<'div'> & {
  images: { src: string; alt?: string }[];
  initialIndex?: number;
};

export type ImageCarouselProps = ImageCarouselBaseProps & {
  variant?: Variant;
};

const VARIANT_COMPONENT: Record<Variant, React.ComponentType<ImageCarouselBaseProps>> = {
  sideButtons: ImageCarouselWithSideBtn,
  dots: ImageCarouselWithDots,
};

export default function ImageCarousel({
  images,
  variant = 'sideButtons',
  initialIndex = 0,
  ...props
}: ImageCarouselProps) {
  const Component = VARIANT_COMPONENT[variant];

  if (images.length === 0) return null;
  return <Component images={images} initialIndex={initialIndex} {...props} />;
}
