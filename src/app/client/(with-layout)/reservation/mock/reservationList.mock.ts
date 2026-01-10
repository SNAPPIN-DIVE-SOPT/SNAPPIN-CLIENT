import type { MoodCode } from '@/types/moodCode';
import type { StateCode } from '@/types/stateCode';

export type ReservationMockProduct = {
  id: number;
  status: StateCode;
  imageUrl: string;
  title: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: MoodCode[];
  isReviewed: boolean;
};

export type ReservationMock = {
  products: ReservationMockProduct[];
};

export const RESERVATION_MOCK: ReservationMock = {
  products: [
    {
      id: 1,
      status: 'RESERVATION_REQUESTED',
      imageUrl: 'https://picsum.photos/576/576?random=1',
      title: '찰나의 순간을 기억으로 남기는 소중한 촬영',
      rate: 4.7,
      reviewCount: 32,
      photographer: '작가명',
      price: 80000,
      moods: ['따스한', '내추럴', '투명한'],
      isReviewed: false,
    },
    {
      id: 2,
      status: 'PHOTOGRAPHER_CHECKING',
      imageUrl: 'https://picsum.photos/576/576?random=2',
      title: '상품명2',
      rate: 4.9,
      reviewCount: 18,
      photographer: '작가명2',
      price: 120000,
      moods: ['차가운', '디지털'],
      isReviewed: false,
    },
    {
      id: 3,
      status: 'PAYMENT_REQUESTED',
      imageUrl: 'https://picsum.photos/576/576?random=3',
      title: '상품명3',
      rate: 4.8,
      reviewCount: 25,
      photographer: '작가명3',
      price: 95000,
      moods: ['몽환적인', '서사적인'],
      isReviewed: false,
    },
    {
      id: 4,
      status: 'PAYMENT_COMPLETED',
      imageUrl: 'https://picsum.photos/576/576?random=4',
      title: '상품명4',
      rate: 4.6,
      reviewCount: 42,
      photographer: '작가명4',
      price: 110000,
      moods: ['Y2K', '뚜렷한'],
      isReviewed: false,
    },
    {
      id: 5,
      status: 'RESERVATION_CONFIRMED',
      imageUrl: 'https://picsum.photos/576/576?random=5',
      title: '상품명5',
      rate: 5.0,
      reviewCount: 15,
      photographer: '작가명5',
      price: 130000,
      moods: ['아날로그', '연출된'],
      isReviewed: true,
    },
    {
      id: 6,
      status: 'SHOOT_COMPLETED',
      imageUrl: 'https://picsum.photos/576/576?random=6',
      title: '상품명6',
      rate: 4.5,
      reviewCount: 11,
      photographer: '작가명6',
      price: 70000,
      moods: ['청량한', '내추럴'],
      isReviewed: true,
    },
    {
      id: 7,
      status: 'RESERVATION_CANCELED',
      imageUrl: 'https://picsum.photos/576/576?random=7',
      title: '상품명7',
      rate: 4.3,
      reviewCount: 9,
      photographer: '작가명7',
      price: 90000,
      moods: ['아날로그', '서사적인'],
      isReviewed: false,
    },
    {
      id: 8,
      status: 'SHOOT_COMPLETED',
      imageUrl: 'https://picsum.photos/576/576?random=8',
      title: '상품명8',
      rate: 3.9,
      reviewCount: 14,
      photographer: '작가명8',
      price: 68000,
      moods: ['아날로그', '서사적인'],
      isReviewed: false,
    },
  ],
};
