'use client';

import { useRouter } from 'next/navigation';

import { Carousel, CarouselContent, CarouselItem, Divider } from '@/ui';
import ImagePreview from '@/ui/image-preview/ImagePreview';
import ReviewStar from '@/ui/review-star/ReviewStar';

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

const createReviewCreatedAtLabel = (createdAt: string) => {
  const match = createdAt.match(/(\d{4})[-.](\d{2})[-.](\d{2})/);
  if (!match) {
    return createdAt;
  }

  const [, year, month, day] = match;
  return `${year.slice(2)}.${month}.${day}`;
};

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
    <section className='bg-black-1 px-[2rem] pt-[1.7rem]'>
      <label className='caption-14-bd text-black-10'>리뷰 상세</label>
      <div className='flex flex-col gap-[1.2rem] py-[2rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex justify-between'>
            <ReviewStar rating={rating} starSize='small' />
            <div className='caption-12-md text-black-7'>
              {createReviewCreatedAtLabel(createdAt)}
            </div>
          </div>
          <div className='caption-12-md text-black-7'>{reviewer}</div>
        </div>
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
        <div className='caption-14-md text-black-10 whitespace-pre-wrap'>{content}</div>
      </div>
    </section>
  );
}
