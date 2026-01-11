'use client';

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';

import type { StateCode } from '@/types/stateCode';
import { Divider, ProductCard, SectionTabs, StateChip, Button } from '@/ui';
import {
  RESERVATION_TABS,
  type ReservationTabValue,
} from '@/app/client/(with-layout)/reservation/constants/tabList';
import { RESERVATION_MOCK } from '@/app/client/(with-layout)/reservation/mock/reservationList.mock';
import { ReservationStatusByReservationProductIdAtom } from '@/app/client/(with-layout)/reservation/store';
import { IconArrowForward } from '@/assets';
import { ReviewByReservationProductIdAtom } from '@/app/client/review/store';
import { ReviewedByReservationProductIdAtom } from '@/app/client/(with-layout)/reservation/store';

const createReservationDetailPath = (reservationProductId: number) =>
  `/client/reservation-detail/${reservationProductId}`;

const createDoneDetailPath = (reservationProductId: number) => `/client/done-detail/${reservationProductId}`;

const createReviewWritePath = (reservationProductId: number) => `/client/review/write/${reservationProductId}`;

const createReservationDetailPathByStatus = (
  reservationStatus: StateCode,
  reservationProductId: number,
) =>
  reservationStatus === 'SHOOT_COMPLETED'
    ? createDoneDetailPath(reservationProductId)
    : createReservationDetailPath(reservationProductId);

const hasShootCompletedStatus = (status: StateCode) => status === 'SHOOT_COMPLETED';

const getReservationTabValue = (value: string): ReservationTabValue =>
  RESERVATION_TABS.some(({ value: reservationTabValue }) => reservationTabValue === value)
    ? (value as ReservationTabValue)
    : RESERVATION_TABS[0].value;

export default function ReservationContent() {
  const router = useRouter();
  const [selectedTabValue, setSelectedTabValue] = useState<ReservationTabValue>(
    RESERVATION_TABS[0].value,
  );
  const reservationStatusByReservationProductId = useAtomValue(
    ReservationStatusByReservationProductIdAtom,
  );
  const reviewByReservationProductId = useAtomValue(ReviewByReservationProductIdAtom);
  const reviewedByReservationProductId = useAtomValue(ReviewedByReservationProductIdAtom);

  const handleReservationDetailNavigation = (
    reservationStatus: StateCode,
    reservationProductId: number,
  ) => {
    router.push(createReservationDetailPathByStatus(reservationStatus, reservationProductId));
  };

  const handleWriteReviewNavigation = (reservationProductId: number) => {
    router.push(createReviewWritePath(reservationProductId));
  };

  const handleTabValueChange = (value: string) => {
    setSelectedTabValue(getReservationTabValue(value));
  };

  const getReservationStatus = (
    reservationProductId: number,
    fallbackReservationStatus: StateCode,
  ) => reservationStatusByReservationProductId[reservationProductId] ?? fallbackReservationStatus;

  const getReservationsByTabValue = (reservationTabValue: ReservationTabValue) =>
    RESERVATION_MOCK.reservations.filter(({ reservation }) => {
      const reservationStatus = getReservationStatus(
        reservation.reservationId,
        reservation.status,
      );
      const hasClientDoneTab = reservationTabValue === 'CLIENT_DONE';

      return hasClientDoneTab
        ? hasShootCompletedStatus(reservationStatus)
        : !hasShootCompletedStatus(reservationStatus);
    });

  return (
    <>
      <Divider />
      <SectionTabs
        value={selectedTabValue}
        handleValueChange={handleTabValueChange}
        className='bg-black-1'
      >
        <SectionTabs.List>
          {RESERVATION_TABS.map(({ label, value }) => (
            <SectionTabs.Tab key={value} value={value}>
              {label}
            </SectionTabs.Tab>
          ))}
        </SectionTabs.List>
        {RESERVATION_TABS.map(({ value }) => {
          const reservations = getReservationsByTabValue(value);

          return (
            <SectionTabs.Contents key={`${value}-panel`} value={value}>
              {reservations.length === 0 ? null : (
                <div className='flex flex-col px-[2rem] py-[1.2rem]'>
                  {reservations.map(({ reservation }, reservationIndex) => {
                    const reservationProduct = reservation.product;
                    const reservationStatus = getReservationStatus(
                      reservation.reservationId,
                      reservation.status,
                    );

                    return (
                      <Fragment key={reservation.reservationId}>
                        <div className='border-black-5 rounded-[0.6rem] border-[0.07rem] p-[1.2rem]'>
                          <div className='flex flex-col gap-[1.2rem]'>
                            {/* TODO: 예약 일시로 바꾸기 */}
                            <div className='flex flex-col gap-[0.6rem]'>
                              <div className='text-caption-10-md text-black-7'>
                                {reservationStatus}
                              </div>
                              <div className='flex justify-between'>
                                <StateChip label={reservationStatus} />
                                <button
                                  type='button'
                                  className='flex flex-row items-center gap-[1rem]'
                                  onClick={() =>
                                    handleReservationDetailNavigation(
                                      reservationStatus,
                                      reservation.reservationId,
                                    )
                                  }
                                >
                                  <span className='text-black-8 caption-12-md'>예약상세</span>
                                  <IconArrowForward className='text-black-8 h-[1.6rem] w-[1.6rem]' />
                                </button>
                              </div>
                            </div>
                            <button
                              type='button'
                              className='block w-full appearance-none border-0 bg-transparent p-0 text-left'
                              aria-label={`${reservationProduct.title} 예약 상세 보기`}
                              onClick={() =>
                                handleReservationDetailNavigation(
                                  reservationStatus,
                                  reservation.reservationId,
                                )
                              }
                            >
                              <ProductCard
                                image={{
                                  src: reservationProduct.imageUrl,
                                  alt: `${reservationProduct.title} 상품 이미지`,
                                }}
                                name={reservationProduct.title}
                                rating={reservationProduct.rate}
                                reviewCount={reservationProduct.reviewCount}
                                author={reservationProduct.photographer}
                                price={reservationProduct.price}
                                tags={reservationProduct.moods}
                                className='w-full'
                              />
                            </button>
                            <div className='flex justify-end'>
                              {reservationStatus === 'SHOOT_COMPLETED' &&
                              !(
                                reviewedByReservationProductId[reservation.reservationId] ??
                                reservationProduct.isReviewed
                              ) &&
                              !reviewByReservationProductId[reservation.reservationId] ? (
                                <Button
                                  size='small'
                                  color='black'
                                  display='inline'
                                  type='button'
                                  onClick={() => handleWriteReviewNavigation(reservation.reservationId)}
                                >
                                  리뷰 작성
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {reservationIndex !== reservations.length - 1 ? (
                          <div className='-mx-[2rem] py-[1.2rem]'>
                            <Divider thickness='large' />
                          </div>
                        ) : null}
                      </Fragment>
                    );
                  })}
                </div>
              )}
            </SectionTabs.Contents>
          );
        })}
      </SectionTabs>
    </>
  );
}
