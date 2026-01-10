'use client';

import { use } from 'react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

import { PaymentDetail, ReservationDetail, ReviewDetail, ShootCompleted } from './_section';
import { HeaderNavigation } from './components';
import { Divider } from '@/ui';
import { getReservationDetailMockById } from './mock/reservationDetail.mock';
import { ReviewByReservationProductIdAtom } from '@/app/client/review/store';

type DoneDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const createReviewWritePath = (reservationProductId: number) => `/client/review/write/${reservationProductId}`;

export default function Page({ params }: DoneDetailPageProps) {
  const { id } = use(params);
  const reservationProductId = Number(id);
  const resolvedReservationProductId = Number.isNaN(reservationProductId) ? 1 : reservationProductId;
  const reservationDetailMock = getReservationDetailMockById(resolvedReservationProductId);
  const reviewByReservationProductId = useAtomValue(ReviewByReservationProductIdAtom);
  const reviewFromStore = reviewByReservationProductId[resolvedReservationProductId];
  const reviewFromMock = reservationDetailMock.reviewInfo;
  const resolvedReviewInfo = reviewFromStore ?? reviewFromMock;
  const hasReviewCreated = Boolean(resolvedReviewInfo);

  const router = useRouter();

  const handleInquiryClick = () => {};

  const handleReviewCreateClick = () => {
    router.push(createReviewWritePath(resolvedReservationProductId));
  };

  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <HeaderNavigation title='촬영 완료' />
      <Divider color='bg-black-5' />
      <ShootCompleted
        reservationProductId={resolvedReservationProductId}
        hasReviewCreated={hasReviewCreated}
        handleInquiryClick={handleInquiryClick}
        handleReviewCreateClick={handleReviewCreateClick}
      />
      <Divider thickness='large' />
      <ReservationDetail
        reservationStatus='SHOOT_COMPLETED'
        reservationInfo={reservationDetailMock.reservationInfo}
      />
      <Divider thickness='large' />
      <PaymentDetail paymentInfo={reservationDetailMock.paymentInfo} />
      {resolvedReviewInfo ? (
        <>
          <Divider thickness='large' />
          <ReviewDetail
            reservationProductId={resolvedReservationProductId}
            reviewer={resolvedReviewInfo.reviewer}
            rating={resolvedReviewInfo.rating}
            createdAt={resolvedReviewInfo.createdAt}
            imageUrls={'imageUrls' in resolvedReviewInfo ? resolvedReviewInfo.imageUrls : resolvedReviewInfo.images}
            content={resolvedReviewInfo.content}
          />
        </>
      ) : null}
    </div>
  );
}
