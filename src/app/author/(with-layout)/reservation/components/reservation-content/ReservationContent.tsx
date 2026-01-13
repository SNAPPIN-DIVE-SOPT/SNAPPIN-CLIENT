'use client';

import { useState } from 'react';
import { StateCode } from '@/types/stateCode';
import { Divider, SectionTabs } from '@/ui';
import { RESERVATION_TABS, ReservationTabValue } from '../../constants/tabs';
import ReservationCard from '../reservation-card/ReservationCard';
import { RESERVATION_MOCK } from '../../mock/reservation.mock';

export default function ReservationContent() {
  const [selectedTabValue, setSelectedTabValue] =
    useState<ReservationTabValue>('PHOTOGRAPHER_REQUESTED');

  const handleTabChange = (value: string) => {
    setSelectedTabValue(value as ReservationTabValue);
  };

  //TODO: 서버 데이터 연동( 파라미터에 selectedTabValue 추가)
  const data = RESERVATION_MOCK;

  return (
    <div className='flex flex-col'>
      <SectionTabs value={selectedTabValue} handleValueChange={handleTabChange}>
        <SectionTabs.List>
          {RESERVATION_TABS.map((tab) => (
            <SectionTabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </SectionTabs.Tab>
          ))}
        </SectionTabs.List>

        <SectionTabs.Contents value={selectedTabValue}>
          <div className='flex flex-col gap-[1.2rem]'>
            {data.products.map((product, index) => (
              <div key={product.id}>
                <ReservationCard
                  reservationId={product.id}
                  status={product.status as StateCode}
                  image={{ src: product.imageUrl, alt: product.title }}
                  name={product.title}
                  rate={product.rate}
                  reviewCount={product.reviewCount}
                  photographer={product.photographer}
                  price={product.price}
                  moods={product.moods}
                  date={product.date}
                />
                {index !== data.products.length - 1 && (
                  <Divider thickness='large' color='bg-black-3' />
                )}
              </div>
            ))}
          </div>
        </SectionTabs.Contents>
      </SectionTabs>
    </div>
  );
}
