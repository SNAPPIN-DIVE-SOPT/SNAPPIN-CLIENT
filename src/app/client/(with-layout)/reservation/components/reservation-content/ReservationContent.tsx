'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
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
import { IconKeyboardArrowRight } from '@/assets';
import { ReviewByReservationProductIdAtom } from '@/app/client/review/store';
import { ReviewedByReservationProductIdAtom } from '@/app/client/(with-layout)/reservation/store';
import { cn } from '@/utils/cn';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui/toast/hooks/useToast';

const CLIENT_RESERVATION_TAB_HISTORY_STATE_KEY = 'CLIENT_RESERVATION_TAB';

const createReservationDetailPath = (reservationProductId: number) =>
  `/client/reservation-detail/${reservationProductId}`;

const createDoneDetailPath = (reservationProductId: number) =>
  `/client/done-detail/${reservationProductId}`;

const createReviewWritePath = (reservationProductId: number) =>
  `/client/review/write/${reservationProductId}`;

const createReservationDetailPathByStatus = (
  reservationStatus: StateCode,
  reservationProductId: number,
) =>
  reservationStatus === 'SHOOT_COMPLETED'
    ? createDoneDetailPath(reservationProductId)
    : createReservationDetailPath(reservationProductId);

const hasShootCompletedStatus = (status: StateCode) => status === 'SHOOT_COMPLETED';

const createReservationCreatedAtLabel = (createdAt: string) => {
  const match = createdAt.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!match) {
    return createdAt;
  }

  const [, year, month, day, hour, minute] = match;
  return `${year.slice(2)}년 ${month}월 ${day}일 ${hour}:${minute}`;
};

const getReservationTabValue = (value: string): ReservationTabValue =>
  RESERVATION_TABS.some(({ value: reservationTabValue }) => reservationTabValue === value)
    ? (value as ReservationTabValue)
    : RESERVATION_TABS[0].value;

type ReservationContentProps = {
  isHeaderVisible: boolean;
  isLoggedInOverride?: boolean;
};

export default function ReservationContent({
  isHeaderVisible,
  isLoggedInOverride,
}: ReservationContentProps) {
  const toast = useToast();
  const { isLogIn } = useAuth();
  const hasShownLoginToastRef = useRef(false);
  const resolvedLoggedInStatus =
    typeof isLoggedInOverride === 'boolean' ? isLoggedInOverride : isLogIn;
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

  const reservationMockList = resolvedLoggedInStatus ? RESERVATION_MOCK.reservations : [];

  const getReservationsByTabValue = (reservationTabValue: ReservationTabValue) =>
    reservationMockList.filter(({ reservation }) => {
      const reservationStatus = getReservationStatus(reservation.reservationId, reservation.status);
      const hasClientDoneTab = reservationTabValue === 'CLIENT_DONE';

      return hasClientDoneTab
        ? hasShootCompletedStatus(reservationStatus)
        : !hasShootCompletedStatus(reservationStatus);
    });

  useEffect(() => {
    if (resolvedLoggedInStatus !== false || hasShownLoginToastRef.current) {
      return;
    }

    toast.login('예약 기능은 로그인 후에 사용할 수 있어요.', 5000);
    hasShownLoginToastRef.current = true;
  }, [resolvedLoggedInStatus, toast]);

  if (resolvedLoggedInStatus === null) {
    return null;
  }

  return (
    <>
      <Divider />
      <SectionTabs
        value={selectedTabValue}
        handleValueChange={handleTabValueChange}
        historyStateKey={CLIENT_RESERVATION_TAB_HISTORY_STATE_KEY}
        className='bg-black-1'
      >
        <SectionTabs.List
          className={cn('bg-black-1 sticky z-10', isHeaderVisible ? 'top-[5rem]' : 'top-0')}
        >
          {RESERVATION_TABS.map(({ label, value }) => (
            <SectionTabs.Tab key={value} value={value}>
              {label}
            </SectionTabs.Tab>
          ))}
        </SectionTabs.List>
        {RESERVATION_TABS.map(({ value }) => {
          const reservations = getReservationsByTabValue(value);
          const emptyTitle =
            value === 'CLIENT_DONE' ? '촬영 완료한 상품이 없어요' : '예약 문의한 상품이 없어요';

          return (
            <SectionTabs.Contents key={`${value}-panel`} value={value}>
              {reservations.length === 0 ? (
                <div className='flex min-h-[calc(100dvh-11rem)] flex-col items-center justify-center gap-[0.4rem] px-[2rem] text-center'>
                  <div className='font-18-bd text-black-10'>{emptyTitle}</div>
                  <div className='caption-14-md text-black-6'>
                    탐색에서 다양한 포트폴리오를 확인해보세요
                  </div>
                </div>
              ) : (
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
                            <div className='flex flex-col gap-[0.6rem]'>
                              <div className='caption-10-md text-black-7'>
                                {createReservationCreatedAtLabel(reservation.createdAt)}
                              </div>
                              <div className='flex justify-between'>
                                <StateChip label={reservationStatus} />
                                <button
                                  type='button'
                                  className='flex items-center'
                                  onClick={() =>
                                    handleReservationDetailNavigation(
                                      reservationStatus,
                                      reservation.reservationId,
                                    )
                                  }
                                >
                                  <span className='text-black-7 caption-12-md'>예약상세</span>
                                  <IconKeyboardArrowRight className='text-black-7 h-[2.4rem] w-[2.4rem]' />
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
                                  onClick={() =>
                                    handleWriteReviewNavigation(reservation.reservationId)
                                  }
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
