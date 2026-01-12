'use client';

import type { PointerEvent } from 'react';
import { useRef, useState } from 'react';

import { Carousel, CarouselContent, CarouselItem, TextareaField } from '@/ui';
import ImageUploadButton from '@/ui/button/upload/ImageUploadButton';
import ImagePreview from '@/ui/image-preview/ImagePreview';
import ReviewStar from '@/ui/review-star/ReviewStar';

type WriteReviewProps = {
  rating: number;
  reviewContent: string;
  reviewImageUrls: string[];
  handleRatingChange: (nextRating: number) => void;
  handleReviewContentChange: (nextReviewContent: string) => void;
  handleReviewImageUrlsChange: (nextReviewImageUrls: string[]) => void;
};

const MAX_RATING = 5;
const MAX_REVIEW_IMAGES_COUNT = 5;

const getRatingByPointerEvent = (
  event: PointerEvent<HTMLDivElement>,
  containerElement: HTMLDivElement,
) => {
  const pointerX = event.clientX;
  const starElements = Array.from(containerElement.querySelectorAll('svg'));

  const starIndex = starElements.findIndex(
    (starElement) => pointerX <= starElement.getBoundingClientRect().right,
  );

  const resolvedStarIndex = starIndex === -1 ? MAX_RATING - 1 : starIndex;
  return resolvedStarIndex + 1;
};

export default function WriteReview({
  rating,
  reviewContent,
  reviewImageUrls,
  handleRatingChange,
  handleReviewContentChange,
  handleReviewImageUrlsChange,
}: WriteReviewProps) {
  const starContainerRef = useRef<HTMLDivElement>(null);
  const [hasPointerDown, setHasPointerDown] = useState<boolean>(false);

  const handleReviewImageRemove = (reviewImageUrl: string) => {
    handleReviewImageUrlsChange(reviewImageUrls.filter((imageUrl) => imageUrl !== reviewImageUrl));
    URL.revokeObjectURL(reviewImageUrl);
  };

  // TODO: API 연동 필요
  const handleImageUploadAction = (files: FileList) => {
    const remainingImageCount = MAX_REVIEW_IMAGES_COUNT - reviewImageUrls.length;
    if (remainingImageCount <= 0) {
      return;
    }

    const nextReviewImageUrls = Array.from(files)
      .slice(0, remainingImageCount)
      .map((file) => URL.createObjectURL(file));

    handleReviewImageUrlsChange([...reviewImageUrls, ...nextReviewImageUrls]);
  };

  const handleStarPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const containerElement = starContainerRef.current;
    if (!containerElement) {
      return;
    }

    setHasPointerDown(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    handleRatingChange(getRatingByPointerEvent(event, containerElement));
  };

  const handleStarPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const containerElement = starContainerRef.current;
    if (!containerElement || !hasPointerDown) {
      return;
    }

    handleRatingChange(getRatingByPointerEvent(event, containerElement));
  };

  const handleStarPointerUp = () => {
    setHasPointerDown(false);
  };

  return (
    <section className='bg-black-1 px-[2.4rem] pt-[1.7rem] pb-[2rem]'>
      <div>
        <label className='caption-14-md text-black-10'>이번 촬영은 어떠셨나요?</label>
        <div className='mt-[1.2rem]'>
          <div ref={starContainerRef} className='relative inline-flex'>
            <ReviewStar starSize='large' rating={rating} />
            <div
              className='absolute inset-0 touch-none'
              role='slider'
              aria-label='별점 선택'
              aria-valuemin={0}
              aria-valuemax={MAX_RATING}
              aria-valuenow={rating}
              tabIndex={0}
              onPointerDown={handleStarPointerDown}
              onPointerMove={handleStarPointerMove}
              onPointerUp={handleStarPointerUp}
              onPointerCancel={handleStarPointerUp}
              onPointerLeave={handleStarPointerUp}
            />
          </div>
        </div>
      </div>

      <div className='mt-[2.8rem]'>
        <label className='caption-14-md text-black-10 mb-[1rem] block'>
          자세한 스냅 촬영 리뷰를 작성해주세요
        </label>
        <TextareaField
          id='review-content'
          placeholder='리뷰 입력'
          value={reviewContent}
          onChange={(event) => handleReviewContentChange(event.target.value)}
          hasError={reviewContent.length > 500}
          className='h-[13.4rem]'
          helpText={
            <div className='mt-[0.8rem] flex items-center justify-between'>
              {reviewContent.length > 500 ? (
                <span className='caption-12-md text-red-error'>
                  최대 500자까지 입력할 수 있어요
                </span>
              ) : null}
              <span className='caption-12-md text-black-7'>{`${reviewContent.length}/500`}</span>
            </div>
          }
        />

        {reviewImageUrls.length >= 2 ? (
          <div className='mt-[1.2rem] -mr-[2.4rem]'>
            <Carousel opts={{ align: 'start', dragFree: true, containScroll: 'trimSnaps' }}>
              <CarouselContent className='ml-0 gap-[0.4rem]'>
                {reviewImageUrls.map((reviewImageUrl) => (
                  <CarouselItem key={reviewImageUrl} className='basis-[14rem] pl-0'>
                    <ImagePreview
                      imageSrc={reviewImageUrl}
                      imageAlt='업로드한 리뷰 이미지'
                      showRemoveButton={true}
                      handleRemove={() => handleReviewImageRemove(reviewImageUrl)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        ) : reviewImageUrls.length === 1 ? (
          <div className='mt-[1.2rem]'>
            <ImagePreview
              imageSrc={reviewImageUrls[0]}
              imageAlt='업로드한 리뷰 이미지'
              showRemoveButton={true}
              handleRemove={() => handleReviewImageRemove(reviewImageUrls[0])}
            />
          </div>
        ) : null}
        <div className='mt-[1.2rem] flex items-center justify-between'>
          <ImageUploadButton handleUploadAction={handleImageUploadAction} multiple={true} />
        </div>
      </div>
    </section>
  );
}
