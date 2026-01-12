'use client';

import { use, useState } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

import { HeaderNavigation } from '@/app/reservation-detail/[id]/components';
import { getReservationDetailMockById } from '@/app/reservation-detail/[id]/mock/reservationDetail.mock';
import { ReviewByReservationProductIdAtom } from '@/app/review/store';
import { Divider, ProductCard, BottomCTAButton } from '@/ui';
import { ReviewedByReservationProductIdAtom } from '@/app/client/(with-layout)/reservation/store';
import WriteReview from './_section/WriteReview';
import { useNavVisibility } from '@/app/(with-layout)/(home)/hooks/useNavVisibility';

type ReviewWritePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const createDoneDetailPath = (reservationProductId: number) =>
  `/client/done-detail/${reservationProductId}`;

const createTodayDateString = () => new Date().toISOString().slice(0, 10);

export default function Page({ params }: ReviewWritePageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isVisible } = useNavVisibility();
  const [reviewByReservationProductId, setReviewByReservationProductId] = useAtom(
    ReviewByReservationProductIdAtom,
  );
  const [, setReviewedByReservationProductId] = useAtom(ReviewedByReservationProductIdAtom);

  const reservationProductId = Number(id);
  const resolvedReservationProductId = Number.isNaN(reservationProductId)
    ? 1
    : reservationProductId;
  const { productInfo } = getReservationDetailMockById(resolvedReservationProductId);

  const [rating, setRating] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>('');
  const [reviewImageUrls, setReviewImageUrls] = useState<string[]>([]);

  const handleRatingChange = (nextRating: number) => {
    setRating(nextRating);
  };

  const handleReviewContentChange = (nextReviewContent: string) => {
    setReviewContent(nextReviewContent);
  };

  const trimmedReviewContent = reviewContent.trim();
  const hasSubmitDisabled =
    rating === 0 || trimmedReviewContent.length <= 1 || trimmedReviewContent.length > 500;

  const handleReviewSubmit = () => {
    if (hasSubmitDisabled) {
      return;
    }

    setReviewByReservationProductId((previousReviewByReservationProductId) => ({
      ...previousReviewByReservationProductId,
      [resolvedReservationProductId]: {
        reservationProductId: resolvedReservationProductId,
        reviewer: '작성자명',
        rating,
        createdAt: createTodayDateString(),
        imageUrls: reviewImageUrls,
        content: trimmedReviewContent,
      },
    }));
    setReviewedByReservationProductId((previousReviewedByReservationProductId) => ({
      ...previousReviewedByReservationProductId,
      [resolvedReservationProductId]: true,
    }));
    router.replace(createDoneDetailPath(resolvedReservationProductId));
  };

  return (
    <div className='bg-black-3 flex min-h-full flex-col pb-[10rem]'>
      <HeaderNavigation isVisible={isVisible} />
      <Divider color='bg-black-5' />
      <section className='bg-black-1 px-[2rem] pt-[1.7rem] pb-[1.2rem]'>
        <ProductCard
          image={{
            src: productInfo.imageUrl,
            alt: `${productInfo.title} 상품 이미지`,
          }}
          name={productInfo.title}
          rating={productInfo.rate}
          reviewCount={productInfo.reviewCount}
          author={productInfo.photographer}
          price={productInfo.price}
          tags={productInfo.moods}
          className='w-full'
        />
      </section>
      <Divider thickness='large' />
      <WriteReview
        rating={rating}
        reviewContent={reviewContent}
        reviewImageUrls={reviewImageUrls}
        handleRatingChange={handleRatingChange}
        handleReviewContentChange={handleReviewContentChange}
        handleReviewImageUrlsChange={setReviewImageUrls}
      />
      <BottomCTAButton fixed={true} background='white' hasPadding={true}>
        <BottomCTAButton.Single
          size='large'
          color='primary'
          type='button'
          disabled={hasSubmitDisabled}
          onClick={handleReviewSubmit}
        >
          등록하기
        </BottomCTAButton.Single>
      </BottomCTAButton>
    </div>
  );
}
