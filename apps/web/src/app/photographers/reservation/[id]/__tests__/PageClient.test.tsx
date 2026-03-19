import { render, screen } from '@testing-library/react';

import PageClient from '../page.client';
import { STATE_CODES } from '@snappin/shared/types';

const useGetReservationDetailMock = jest.fn();

jest.mock('../api', () => ({
  __esModule: true,
  useGetReservationDetail: (reservationId: number) => useGetReservationDetailMock(reservationId),
}));

jest.mock('../../../../../components/layout/reservation/SectionSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid='section-skeleton' />,
}));

jest.mock('@snappin/design-system', () => ({
  __esModule: true,
  Divider: () => <div data-testid='divider' />,
}));

jest.mock('../_section', () => ({
  __esModule: true,
  ProductStatus: ({ status }: { status: string }) => (
    <div data-testid='product-status'>{status}</div>
  ),
  ReservationDetail: ({ date }: { date: string }) => (
    <div data-testid='reservation-detail'>{date}</div>
  ),
  Receipt: ({
    basePrice,
    extraPrice,
    totalPrice,
  }: {
    basePrice: number;
    extraPrice: number[];
    totalPrice: number;
  }) => <div data-testid='receipt'>{`${basePrice}/${extraPrice.length}/${totalPrice}`}</div>,
  ReviewDetail: ({ reviewer, rating }: { reviewer: string; rating: number }) => (
    <div data-testid='review-detail'>{`${reviewer}/${rating}`}</div>
  ),
  DetailPageFooter: ({
    reservationId,
    date,
    status,
  }: {
    reservationId: number;
    date: string;
    status: string;
  }) => <div data-testid='detail-page-footer'>{`${reservationId}/${date}/${status}`}</div>,
}));

const createReservationDetail = (overrides?: Record<string, unknown>) => ({
  status: STATE_CODES.PAYMENT_COMPLETED,
  productInfo: {
    imageUrl: 'image-url',
    title: '상품명',
    rate: 4.7,
    reviewCount: 12,
    photographer: '작가',
    price: 100000,
    moods: ['natural'],
  },
  reservationInfo: {
    client: '고객',
    createdAt: '2026-01-01',
    date: '2026-02-01',
    startTime: '10:00',
    durationTime: 60,
    place: '서울',
    peopleCount: 2,
    requestNote: '요청사항',
  },
  paymentInfo: {
    basePrice: 100000,
    extraPrices: [20000, 30000],
    totalPrice: 150000,
  },
  reviewInfo: null,
  ...overrides,
});

describe('PageClient', () => {
  beforeEach(() => {
    useGetReservationDetailMock.mockReset();
  });

  it('로딩 중이면 SectionSkeleton을 렌더링한다', () => {
    useGetReservationDetailMock.mockReturnValue({
      data: undefined,
      isPending: true,
    });

    render(<PageClient id='7' />);

    expect(screen.getByTestId('section-skeleton')).toBeDefined();
    expect(screen.queryByTestId('detail-page-footer')).toBeNull();
  });

  it('PHOTOGRAPHER_CHECKING 상태면 영수증 없이 하단 CTA를 렌더링한다', () => {
    useGetReservationDetailMock.mockReturnValue({
      data: createReservationDetail({
        status: STATE_CODES.PHOTOGRAPHER_CHECKING,
      }),
      isPending: false,
    });

    render(<PageClient id='7' />);

    expect(screen.queryByTestId('receipt')).toBeNull();
    expect(screen.getByTestId('detail-page-footer').textContent).toContain(
      `7/2026-02-01/${STATE_CODES.PHOTOGRAPHER_CHECKING}`,
    );
  });

  it('리뷰가 없고 상태가 PHOTOGRAPHER_CHECKING이 아니면 영수증과 하단 CTA를 렌더링한다', () => {
    useGetReservationDetailMock.mockReturnValue({
      data: createReservationDetail(),
      isPending: false,
    });

    render(<PageClient id='7' />);

    expect(screen.getByTestId('receipt').textContent).toContain('100000/2/150000');
    expect(screen.getByTestId('detail-page-footer').textContent).toContain(
      `7/2026-02-01/${STATE_CODES.PAYMENT_COMPLETED}`,
    );
  });

  it('리뷰가 있으면 하단 CTA 대신 리뷰 상세를 렌더링한다', () => {
    useGetReservationDetailMock.mockReturnValue({
      data: createReservationDetail({
        reviewInfo: {
          id: 1,
          reviewer: '리뷰어',
          rating: 5,
          createdAt: '2026-02-02',
          images: ['review-image'],
          content: '좋아요',
        },
      }),
      isPending: false,
    });

    render(<PageClient id='7' />);

    expect(screen.getByTestId('review-detail').textContent).toContain('리뷰어/5');
    expect(screen.queryByTestId('detail-page-footer')).toBeNull();
  });
});
