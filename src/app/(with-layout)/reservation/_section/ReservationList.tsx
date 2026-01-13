'use client';

import { Fragment, useState } from 'react';
import { Divider, SectionTabs } from '@/ui';
import { RESERVATION_MOCK } from '../mock/reservationList.mock';
import { RESERVATION_TABS, ReservationTabValue } from '../constants/tabs';
import { EmptyView, ReservationCard } from '../components';
import type { MoodCode } from '@/types/moodCode';
import { STATE_CODES, type StateCode } from '@/types/stateCode';

const DONE_RESERVATION_STATUS: StateCode = STATE_CODES.SHOOT_COMPLETED;
const EMPTY_VIEW_DESCRIPTION = '탐색에서 다양한 포트폴리오를 확인해보세요';

const createdAtLabelString = (createdAt: string) => {
  const match = createdAt.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!match) {
    return createdAt;
  }
  const [, year, month, day, hour, minute] = match;
  return `${year.slice(2)}년 ${month}월 ${day}일 ${hour}:${minute}`;
};

export default function ReservationList() {
  const [selectedTabValue, setSelectedTabValue] = useState<ReservationTabValue>('CLIENT_OVERVIEW');

  const handleTabValueChange = (value: string) => {
    const nextTabValue = value as ReservationTabValue;
    setSelectedTabValue(nextTabValue);
  };

  const { reservations } = RESERVATION_MOCK;

  // 각 탭 값에 따라 보여줄 목록 분류
  const getListByTabValue = (tabValue: ReservationTabValue) => {
    const hasDoneTab = tabValue === 'CLIENT_DONE';
    return reservations.filter(({ reservation }) =>
      hasDoneTab
        ? reservation.status === DONE_RESERVATION_STATUS
        : reservation.status !== DONE_RESERVATION_STATUS,
    );
  };

  return (
    <>
      <SectionTabs
        value={selectedTabValue}
        handleValueChange={handleTabValueChange}
        className='bg-black-1'
      >
        <SectionTabs.List className='bg-black-1 border-black-4 border-t'>
          {RESERVATION_TABS.map((tab) => (
            <SectionTabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </SectionTabs.Tab>
          ))}
        </SectionTabs.List>

        {RESERVATION_TABS.map((tab) => {
          const reservationsByTabValue = getListByTabValue(tab.value);
          const emptyTitle =
            tab.value === 'CLIENT_DONE' ? '촬영 완료한 상품이 없어요' : '예약 문의한 상품이 없어요';

          return (
            <SectionTabs.Contents key={tab.value} value={tab.value}>
              {reservationsByTabValue.length === 0 ? (
                <EmptyView title={emptyTitle} description={EMPTY_VIEW_DESCRIPTION} />
              ) : (
                <div className='flex flex-col p-[2rem]'>
                  {reservationsByTabValue.map(({ reservation }, reservationIndex) => (
                    <Fragment key={reservation.reservationId}>
                      <ReservationCard
                        image={{
                          src: reservation.product.imageUrl,
                          alt: reservation.product.title,
                        }}
                        date={createdAtLabelString(reservation.createdAt)}
                        name={reservation.product.title}
                        rating={reservation.product.rate}
                        reviewCount={reservation.product.reviewCount}
                        author={reservation.product.photographer}
                        price={reservation.product.price}
                        tags={reservation.product.moods as MoodCode[]}
                        isReviewed={reservation.product.isReviewed}
                        reviewHref={`/photo-completed/${reservation.reservationId}`}
                        status={reservation.status as StateCode}
                        href={
                          tab.value === 'CLIENT_DONE'
                            ? `/photo-completed/${reservation.reservationId}`
                            : `/reservation-detail/${reservation.reservationId}`
                        }
                      />
                      {reservationIndex !== reservationsByTabValue.length - 1 ? (
                        <div className='-mx-[2rem] py-[1.2rem]'>
                          <Divider thickness='large' color='bg-black-3' />
                        </div>
                      ) : null}
                    </Fragment>
                  ))}
                </div>
              )}
            </SectionTabs.Contents>
          );
        })}
      </SectionTabs>
    </>
  );
}
