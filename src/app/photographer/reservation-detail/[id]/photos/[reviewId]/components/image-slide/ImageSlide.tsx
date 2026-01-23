import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';

type ImageSlideProps = {
  images: { src: string; alt?: string }[];
  initialIndex?: number;
};

export default function ImageSlide({ images, initialIndex }: ImageSlideProps) {
  return (
    <Carousel opts={{ startIndex: initialIndex }}>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.src} className='flex h-[480px] w-full items-center'>
            <Image
              src={image.src}
              alt={image.alt ?? `image-${image.src}`}
              width={1200}
              height={800}
              className='object-cover'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className='top-1/2 left-0 mt-[4rem] flex h-[4.4rem] w-[4.4rem] -translate-y-1/2 items-center justify-center rounded-none' />
          <CarouselNext className='top-1/2 right-0 mt-[4rem] flex h-[4.4rem] w-[4.4rem] -translate-y-1/2 items-center justify-center rounded-none' />
        </>
      )}
    </Carousel>
  );
}
