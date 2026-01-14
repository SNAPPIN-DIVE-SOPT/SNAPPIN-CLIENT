import type { StateCode } from '@/types/stateCode';

type ReservationMockResponse = {
  reservations: Array<{
    reservation: {
      reservationId: number;
      status: StateCode;
      client: string;
      createdAt: string;
      product: {
        id: number;
        imageUrl: string;
        title: string;
        rate: number;
        reviewCount: number;
        photographer: string;
        price: number;
        moods: string[];
        isReviewed: boolean;
      };
    };
  }>;
};

export const RESERVATION_MOCK = {
  reservations: [
    {
      reservation: {
        reservationId: 101,
        status: 'RESERVATION_REQUESTED',
        client: '고객명',
        createdAt: '2026-03-01 14:23:11',
        product: {
          id: 1,
          imageUrl: 'https://picsum.photos/576/576?random=1',
          title: '찰나의 순간을 기억으로 남기는 소중한 촬영',
          rate: 4.7,
          reviewCount: 32,
          photographer: '작가명',
          price: 80000,
          moods: ['따스한', '내추럴', '투명한'],
          isReviewed: false,
        },
      },
    },
    {
      reservation: {
        reservationId: 102,
        status: 'PHOTOGRAPHER_CHECKING',
        client: '고객명',
        createdAt: '2026-03-01 13:05:44',
        product: {
          id: 2,
          imageUrl: 'https://picsum.photos/576/576?random=2',
          title: '상품명2',
          rate: 4.9,
          reviewCount: 18,
          photographer: '작가명2',
          price: 120000,
          moods: ['차가운', '디지털'],
          isReviewed: false,
        },
      },
    },
    {
      reservation: {
        reservationId: 103,
        status: 'PAYMENT_REQUESTED',
        client: '고객명',
        createdAt: '2026-03-01 11:00:00',
        product: {
          id: 3,
          imageUrl: 'https://picsum.photos/576/576?random=3',
          title: '상품명3',
          rate: 4.8,
          reviewCount: 25,
          photographer: '작가명3',
          price: 95000,
          moods: ['몽환적인', '서사적인'],
          isReviewed: false,
        },
      },
    },
    {
      reservation: {
        reservationId: 104,
        status: 'PAYMENT_COMPLETED',
        client: '고객명',
        createdAt: '2026-02-28 10:30:00',
        product: {
          id: 4,
          imageUrl: 'https://picsum.photos/576/576?random=4',
          title: '상품명4',
          rate: 4.6,
          reviewCount: 42,
          photographer: '작가명4',
          price: 110000,
          moods: ['Y2K', '뚜렷한'],
          isReviewed: false,
        },
      },
    },
    {
      reservation: {
        reservationId: 105,
        status: 'RESERVATION_CONFIRMED',
        client: '고객명',
        createdAt: '2026-02-27 17:10:00',
        product: {
          id: 5,
          imageUrl: 'https://picsum.photos/576/576?random=5',
          title: '상품명5',
          rate: 5.0,
          reviewCount: 15,
          photographer: '작가명5',
          price: 130000,
          moods: ['아날로그', '연출된'],
          isReviewed: true,
        },
      },
    },
    {
      reservation: {
        reservationId: 106,
        status: 'SHOOT_COMPLETED',
        client: '고객명',
        createdAt: '2026-02-18 10:05:44',
        product: {
          id: 6,
          imageUrl: 'https://picsum.photos/576/576?random=6',
          title: '상품명6',
          rate: 4.5,
          reviewCount: 11,
          photographer: '작가명6',
          price: 70000,
          moods: ['청량한', '내추럴'],
          isReviewed: true,
        },
      },
    },
    {
      reservation: {
        reservationId: 107,
        status: 'RESERVATION_CANCELED',
        client: '고객명',
        createdAt: '2026-02-25 09:12:00',
        product: {
          id: 7,
          imageUrl: 'https://picsum.photos/576/576?random=7',
          title: '상품명7',
          rate: 4.3,
          reviewCount: 9,
          photographer: '작가명7',
          price: 90000,
          moods: ['아날로그', '서사적인'],
          isReviewed: false,
        },
      },
    },
    {
      reservation: {
        reservationId: 108,
        status: 'SHOOT_COMPLETED',
        client: '고객명',
        createdAt: '2026-02-20 19:40:00',
        product: {
          id: 8,
          imageUrl: 'https://picsum.photos/576/576?random=8',
          title: '상품명8',
          rate: 3.9,
          reviewCount: 14,
          photographer: '작가명8',
          price: 68000,
          moods: ['아날로그', '서사적인'],
          isReviewed: false,
        },
      },
    },
  ],
} satisfies ReservationMockResponse;
