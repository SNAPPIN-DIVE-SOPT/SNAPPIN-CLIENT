import {
  RESERVATION_MOCK,
  type ReservationMockProduct,
  type ReservationMockReservation,
} from '@/app/client/(with-layout)/reservation/mock/reservationList.mock';

export type ReservationDetailMockProductInfo = Pick<
  ReservationMockProduct,
  | 'id'
  | 'imageUrl'
  | 'title'
  | 'rate'
  | 'reviewCount'
  | 'photographer'
  | 'price'
  | 'moods'
>;

export type ReservationDetailMockReservationInfo = {
  client: string;
  createdAt: string;
  date: string;
  startTime: string;
  durationTime: number;
  place: string;
  peopleCount: number;
  requestNote: string;
};

export type ReservationDetailMockPaymentInfo = {
  basePrice: number;
  extraPrice: number;
  totalPrice: number;
};

export type ReservationDetailMockReviewInfo = {
  id: number;
  reviewer: string;
  rating: number;
  createdAt: string;
  images: string[];
  content: string;
};

export type ReservationDetailMock = {
  status: ReservationMockReservation['status'];
  productInfo: ReservationDetailMockProductInfo;
  reservationInfo: ReservationDetailMockReservationInfo;
  paymentInfo: ReservationDetailMockPaymentInfo;
  reviewInfo?: ReservationDetailMockReviewInfo;
};

const createReservationInfoByReservation = (
  reservation: ReservationMockReservation,
): ReservationDetailMockReservationInfo => ({
  client: reservation.client,
  createdAt: reservation.createdAt,
  date: `2026-03-${String(14 + reservation.product.id).padStart(2, '0')}`,
  startTime: reservation.product.id % 2 === 0 ? '11:00' : '10:00',
  durationTime:
    reservation.product.id % 2 === 0
      ? 60 * ((reservation.product.id % 3) + 1)
      : 60 * ((reservation.product.id % 3) + 1) + 30,
  place: '건국대',
  peopleCount: (reservation.product.id % 4) + 1,
  requestNote: 'A, B, C 장소 필수 포함 요청드려요! 원본 JPG 전부 받고 싶습니다.',
});

const createPaymentInfoByPrice = (price: number): ReservationDetailMockPaymentInfo => {
  const basePrice = price * 2;
  const extraPrice = price >= 100000 ? 50000 : 30000;
  return {
    basePrice,
    extraPrice,
    totalPrice: basePrice + extraPrice,
  };
};

const createReviewInfoByReservationProductId = (
  reservation: ReservationMockReservation,
): ReservationDetailMockReviewInfo => ({
  id: reservation.product.id,
  reviewer: '작성자명',
  rating: 5,
  createdAt: '2026-03-20',
  images: [
    `https://picsum.photos/576/576?random=${reservation.reservationId + 100}`,
    `https://picsum.photos/576/576?random=${reservation.reservationId + 200}`,
  ],
  content: '리뷰 내용',
});

const createReservationDetailMockByReservation = (
  reservation: ReservationMockReservation,
): ReservationDetailMock => ({
  status: reservation.status,
  productInfo: {
    id: reservation.product.id,
    imageUrl: reservation.product.imageUrl,
    title: reservation.product.title,
    rate: reservation.product.rate,
    reviewCount: reservation.product.reviewCount,
    photographer: reservation.product.photographer,
    price: reservation.product.price,
    moods: reservation.product.moods,
  },
  reservationInfo: createReservationInfoByReservation(reservation),
  paymentInfo: createPaymentInfoByPrice(reservation.product.price),
  reviewInfo: reservation.product.isReviewed
    ? createReviewInfoByReservationProductId(reservation)
    : undefined,
});

const RESERVATION_DETAIL_MOCK_BY_RESERVATION_ID: Record<number, ReservationDetailMock> =
  RESERVATION_MOCK.reservations.reduce<Record<number, ReservationDetailMock>>(
    (reservationDetailMockByReservationId, { reservation }) => ({
      ...reservationDetailMockByReservationId,
      [reservation.reservationId]: createReservationDetailMockByReservation(reservation),
    }),
    {},
  );

export const RESERVATION_DETAIL_MOCKS: ReservationDetailMock[] = Object.values(
  RESERVATION_DETAIL_MOCK_BY_RESERVATION_ID,
);

export const getReservationDetailMockById = (reservationProductId: number): ReservationDetailMock =>
  RESERVATION_DETAIL_MOCK_BY_RESERVATION_ID[reservationProductId] ?? RESERVATION_DETAIL_MOCKS[0];

export const RESERVATION_DETAIL_MOCK = getReservationDetailMockById(
  RESERVATION_MOCK.reservations[0].reservation.reservationId,
);
