import { RESERVATION_MOCK, type ReservationMockProduct } from '@/app/client/(with-layout)/reservation/mock/reservationList.mock';

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
  status: ReservationMockProduct['status'];
  productInfo: ReservationDetailMockProductInfo;
  reservationInfo: ReservationDetailMockReservationInfo;
  paymentInfo: ReservationDetailMockPaymentInfo;
  reviewInfo?: ReservationDetailMockReviewInfo;
};

const createReservationInfoByReservationProductId = (
  reservationProductId: number,
): ReservationDetailMockReservationInfo => ({
  date: `2026-03-${String(14 + reservationProductId).padStart(2, '0')}`,
  startTime: reservationProductId % 2 === 0 ? '11:00' : '10:00',
  durationTime:
    reservationProductId % 2 === 0
      ? 60 * ((reservationProductId % 3) + 1)
      : 60 * ((reservationProductId % 3) + 1) + 30,
  place: '건국대',
  peopleCount: (reservationProductId % 4) + 1,
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
  reservationProductId: number,
): ReservationDetailMockReviewInfo => ({
  id: reservationProductId,
  reviewer: '작성자명',
  rating: 5,
  createdAt: '2026-03-20',
  images: [
    `https://picsum.photos/576/576?random=${reservationProductId + 100}`,
    `https://picsum.photos/576/576?random=${reservationProductId + 200}`,
  ],
  content: '리뷰 내용',
});

const createReservationDetailMockByReservationProduct = (
  reservationProduct: ReservationMockProduct,
): ReservationDetailMock => ({
  status: reservationProduct.status,
  productInfo: {
    id: reservationProduct.id,
    imageUrl: reservationProduct.imageUrl,
    title: reservationProduct.title,
    rate: reservationProduct.rate,
    reviewCount: reservationProduct.reviewCount,
    photographer: reservationProduct.photographer,
    price: reservationProduct.price,
    moods: reservationProduct.moods,
  },
  reservationInfo: createReservationInfoByReservationProductId(reservationProduct.id),
  paymentInfo: createPaymentInfoByPrice(reservationProduct.price),
  reviewInfo: reservationProduct.isReviewed
    ? createReviewInfoByReservationProductId(reservationProduct.id)
    : undefined,
});

export const RESERVATION_DETAIL_MOCKS: ReservationDetailMock[] = RESERVATION_MOCK.products.map(
  (reservationProduct) => createReservationDetailMockByReservationProduct(reservationProduct),
);

export const getReservationDetailMockById = (reservationProductId: number): ReservationDetailMock =>
  RESERVATION_DETAIL_MOCKS.find(({ productInfo }) => productInfo.id === reservationProductId) ??
  RESERVATION_DETAIL_MOCKS[0];

export const RESERVATION_DETAIL_MOCK = getReservationDetailMockById(RESERVATION_MOCK.products[0].id);
