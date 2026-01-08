import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel';
import Image from 'next/image';

type ImageCarouselProps = {
  images: { src: string; alt?: string }[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.src}>
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
          <CarouselPrevious className='top-1/2 left-[1.2rem] flex h-[4.4rem] w-[4.4rem] -translate-y-1/2 items-center justify-center rounded-none' />
          <CarouselNext className='top-1/2 right-[1.2rem] flex h-[4.4rem] w-[4.4rem] -translate-y-1/2 items-center justify-center rounded-none' />
        </>
      )}
    </Carousel>
  );
}
