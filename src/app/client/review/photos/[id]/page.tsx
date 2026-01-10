'use client';

import { use, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';

import { HeaderNavigation } from '@/app/client/reservation-detail/[id]/components';
import { getReservationDetailMockById } from '@/app/client/reservation-detail/[id]/mock/reservationDetail.mock';
import { ReviewByReservationProductIdAtom } from '@/app/client/review/store';
import { Divider } from '@/ui';

type ReviewPhotosPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const getImageIndexBySearchParams = (index: string | null) => {
  const resolvedIndex = Number(index);
  return Number.isNaN(resolvedIndex) ? 0 : resolvedIndex;
};

export default function Page({ params }: ReviewPhotosPageProps) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const reviewByReservationProductId = useAtomValue(ReviewByReservationProductIdAtom);

  const reservationProductId = Number(id);
  const resolvedReservationProductId = Number.isNaN(reservationProductId) ? 1 : reservationProductId;
  const reviewFromStore = reviewByReservationProductId[resolvedReservationProductId];
  const reviewFromMock = getReservationDetailMockById(resolvedReservationProductId).reviewInfo;
  const reviewImages =
    reviewFromStore?.imageUrls ?? reviewFromMock?.images ?? [];

  const imageIndex = getImageIndexBySearchParams(searchParams.get('index'));

  const selectedImageUrl = useMemo(() => reviewImages[imageIndex], [imageIndex, reviewImages]);

  return (
    <div className='bg-black-3 flex min-h-full flex-col'>
      <HeaderNavigation title='리뷰 사진' />
      <Divider color='bg-black-5' />
      {selectedImageUrl ? (
        <div className='px-[2rem] py-[2rem]'>
          <img
            src={selectedImageUrl}
            alt='리뷰 이미지 미리보기'
            className='w-full rounded-[0.8rem] object-cover'
          />
        </div>
      ) : null}
    </div>
  );
}
