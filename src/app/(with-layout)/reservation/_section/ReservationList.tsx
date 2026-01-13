'use client';

import { Fragment, useState } from 'react';
import { Divider, SectionTabs } from '@/ui';
import { RESERVATION_MOCK } from '../mock/reservationList.mock';
import { RESERVATION_TABS, ReservationTabValue } from '../constants/tabs';
import { EmptyView, ReservationCard } from '../components';
import type { MoodCode } from '@/types/moodCode';
import type { StateCode } from '@/types/stateCode';
import { formatCreatedAt } from '@/utils/formatNumberWithComma';

export default function ReservationList() {
  const [selectedTabValue, setSelectedTabValue] = useState<ReservationTabValue>(
    RESERVATION_TABS[0].value,
  );

  const handleTabValueChange = (value: string) => {
    const nextTabValue = value as ReservationTabValue;
    setSelectedTabValue(nextTabValue);
  };

  const { reservations } = RESERVATION_MOCK;

  return (
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
        const emptyTitle =
          tab.value === 'CLIENT_DONE' ? '촬영 완료한 상품이 없어요' : '예약 문의한 상품이 없어요';

        return (
          <SectionTabs.Contents key={tab.value} value={tab.value}>
            {reservations.length === 0 ? (
              <EmptyView
                title={emptyTitle}
                description='탐색에서 다양한 포트폴리오를 확인해보세요'
              />
            ) : (
              <div className='flex flex-col p-[2rem]'>
                {reservations.map(({ reservation }, reservationIndex) => (
                  <Fragment key={reservation.reservationId}>
                    <ReservationCard
                      image={{
                        src: reservation.product.imageUrl,
                        alt: reservation.product.title,
                      }}
                      date={formatCreatedAt(reservation.createdAt)}
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
                    {reservationIndex !== reservations.length - 1 ? (
                      <div className='-mx-[2rem] py-[1.2rem]'>
                        <Divider className='h-[0.6rem]' color='bg-black-3' />
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
  );
}
