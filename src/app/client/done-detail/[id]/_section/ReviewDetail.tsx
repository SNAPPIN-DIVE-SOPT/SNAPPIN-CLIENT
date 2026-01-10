'use client';

import { useRouter } from 'next/navigation';

import { Carousel, CarouselContent, CarouselItem, Divider } from '@/ui';
import ImagePreview from '@/ui/image-preview/ImagePreview';

type ReviewDetailProps = {
  reservationProductId: number;
  reviewer: string;
  rating: number;
  createdAt: string;
  imageUrls: string[];
  content: string;
};

const createReviewPhotosPath = (reservationProductId: number, imageIndex: number) =>
  `/client/review/photos/${reservationProductId}?index=${imageIndex}`;

export default function ReviewDetail({
  reservationProductId,
  reviewer,
  rating,
  createdAt,
  imageUrls,
  content,
}: ReviewDetailProps) {
  const router = useRouter();

  const handleReviewPhotoClick = (imageIndex: number) => {
    router.push(createReviewPhotosPath(reservationProductId, imageIndex));
  };

  return (
    <section className='bg-black-1 px-[2rem] pt-[1.7rem] pb-[2rem]'>
      <div className='flex items-center justify-between'>
        <label className='caption-14-bd text-black-10'>리뷰</label>
        <div className='text-caption-12-md text-black-7'>{createdAt}</div>
      </div>
      <div className='mt-[0.6rem] flex items-center justify-between'>
        <div className='text-caption-12-md text-black-8'>{reviewer}</div>
        <div className='text-caption-12-md text-black-8'>{`★ ${rating}`}</div>
      </div>
      <Divider color='bg-black-5' className='my-[1.2rem]' />
      {imageUrls.length >= 2 ? (
        <div className='-mr-[2rem]'>
          <Carousel opts={{ align: 'start', dragFree: true, containScroll: 'trimSnaps' }}>
            <CarouselContent className='ml-0 gap-[0.4rem]'>
              {imageUrls.map((imageUrl, imageIndex) => (
                <CarouselItem key={imageUrl} className='basis-[14rem] pl-0'>
                  <ImagePreview
                    imageSrc={imageUrl}
                    imageAlt='리뷰 이미지 보기'
                    showRemoveButton={false}
                    handleClickImage={() => handleReviewPhotoClick(imageIndex)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : imageUrls.length === 1 ? (
        <div>
          <ImagePreview
            imageSrc={imageUrls[0]}
            imageAlt='리뷰 이미지 보기'
            showRemoveButton={false}
            handleClickImage={() => handleReviewPhotoClick(0)}
          />
        </div>
      ) : null}
      <div className='text-body-14-md text-black-10 mt-[1.2rem] whitespace-pre-wrap'>
        {content}
      </div>
    </section>
  );
}
