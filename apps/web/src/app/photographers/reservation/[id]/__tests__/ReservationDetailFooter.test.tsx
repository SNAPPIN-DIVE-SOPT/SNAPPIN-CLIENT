import { fireEvent, render, screen } from '@testing-library/react';

import { PHOTOGRAPHERS_ROUTES } from '@/constants/routes/routes';
import DetailPageBottomCTA from '../_section/DetailPageBottomCTA';
import { STATE_CODES } from '@snappin/shared/types';

const pushMock = jest.fn();
const completeReservationMock = jest.fn();
const confirmReservationMock = jest.fn();

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock('../api', () => ({
  __esModule: true,
  useCompleteReservation: () => ({
    mutate: completeReservationMock,
  }),
  useConfirmReservation: () => ({
    mutate: confirmReservationMock,
  }),
}));

jest.mock('@snappin/design-system', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');

  const BottomCTAButton = function BottomCTAButton({ children }: { children: React.ReactNode }) {
    return React.createElement('div', null, children);
  };

  const BottomCTAButtonSingle = ({
    children,
    disabled,
    onClick,
  }: {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
  }) => React.createElement('button', { disabled, onClick }, children);

  BottomCTAButton.Single = BottomCTAButtonSingle;

  return {
    __esModule: true,
    BottomCTAButton,
  };
});

const renderBottomCTA = (
  status: (typeof STATE_CODES)[keyof typeof STATE_CODES],
  date = '2099-01-01',
) => {
  return render(<DetailPageBottomCTA reservationId={7} date={date} status={status} />);
};

describe('[작가] 예약 상세 페이지 하단 CTA 버튼 상태', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('PHOTOGRAPHER_CHECKING 상태: 라벨/활성화/라우팅이 동작한다', () => {
    renderBottomCTA(STATE_CODES.PHOTOGRAPHER_CHECKING);

    const button = screen.getByRole('button', {
      name: '결제 요청하기',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(false);

    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith(PHOTOGRAPHERS_ROUTES.PAYMENT(7));
    expect(confirmReservationMock).not.toHaveBeenCalled();
    expect(completeReservationMock).not.toHaveBeenCalled();
  });

  it('PAYMENT_REQUESTED 상태: 라벨이 맞고 비활성화되어 아무 동작도 하지 않는다', () => {
    renderBottomCTA(STATE_CODES.PAYMENT_REQUESTED);

    const button = screen.getByRole('button', {
      name: '결제 요청 중',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    fireEvent.click(button);

    expect(pushMock).not.toHaveBeenCalled();
    expect(confirmReservationMock).not.toHaveBeenCalled();
    expect(completeReservationMock).not.toHaveBeenCalled();
  });

  it('PAYMENT_COMPLETED 상태: 라벨/활성화/예약 확정 mutate 호출이 동작한다', () => {
    renderBottomCTA(STATE_CODES.PAYMENT_COMPLETED);

    const button = screen.getByRole('button', {
      name: '예약 확정하기',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(false);

    fireEvent.click(button);

    expect(confirmReservationMock).toHaveBeenCalledWith(7);
    expect(pushMock).not.toHaveBeenCalled();
    expect(completeReservationMock).not.toHaveBeenCalled();
  });

  it('RESERVATION_CONFIRMED 상태 + 예약일 이전: 라벨이 맞고 비활성화된다', () => {
    renderBottomCTA(STATE_CODES.RESERVATION_CONFIRMED, '2099-01-01');

    const button = screen.getByRole('button', {
      name: '예약 확정',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    fireEvent.click(button);

    expect(pushMock).not.toHaveBeenCalled();
    expect(confirmReservationMock).not.toHaveBeenCalled();
    expect(completeReservationMock).not.toHaveBeenCalled();
  });

  it('RESERVATION_CONFIRMED 상태 + 예약일 이후: 라벨/활성화/촬영 완료 mutate 호출이 동작한다', () => {
    renderBottomCTA(STATE_CODES.RESERVATION_CONFIRMED, '2000-01-01');

    const button = screen.getByRole('button', {
      name: '촬영 완료하고 리뷰 요청하기',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(false);

    fireEvent.click(button);

    expect(completeReservationMock).toHaveBeenCalledWith(7);
    expect(pushMock).not.toHaveBeenCalled();
    expect(confirmReservationMock).not.toHaveBeenCalled();
  });

  it('SHOOT_COMPLETED 상태: 라벨이 맞고 비활성화되어 아무 동작도 하지 않는다', () => {
    renderBottomCTA(STATE_CODES.SHOOT_COMPLETED);

    const button = screen.getByRole('button', {
      name: '리뷰 요청 완료',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    fireEvent.click(button);

    expect(pushMock).not.toHaveBeenCalled();
    expect(confirmReservationMock).not.toHaveBeenCalled();
    expect(completeReservationMock).not.toHaveBeenCalled();
  });

  it('RESERVATION_CANCELED 상태: 라벨이 맞고 비활성화되어 아무 동작도 하지 않는다', () => {
    renderBottomCTA(STATE_CODES.RESERVATION_CANCELED);

    const button = screen.getByRole('button', {
      name: '고객님의 예약 취소',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    fireEvent.click(button);

    expect(pushMock).not.toHaveBeenCalled();
    expect(confirmReservationMock).not.toHaveBeenCalled();
    expect(completeReservationMock).not.toHaveBeenCalled();
  });

  it('RESERVATION_REFUSED 상태: 라벨이 맞고 비활성화되어 아무 동작도 하지 않는다', () => {
    renderBottomCTA(STATE_CODES.RESERVATION_REFUSED);

    const button = screen.getByRole('button', {
      name: '예약 거절 완료',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    fireEvent.click(button);

    expect(pushMock).not.toHaveBeenCalled();
    expect(confirmReservationMock).not.toHaveBeenCalled();
    expect(completeReservationMock).not.toHaveBeenCalled();
  });

  it('RESERVATION_REQUESTED 상태: 라벨이 맞고 비활성화되어 아무 동작도 하지 않는다', () => {
    renderBottomCTA(STATE_CODES.RESERVATION_REQUESTED);

    const button = screen.getByRole('button', {
      name: '예약 요청 중',
    }) as HTMLButtonElement;

    expect(button.disabled).toBe(true);

    fireEvent.click(button);

    expect(pushMock).not.toHaveBeenCalled();
    expect(confirmReservationMock).not.toHaveBeenCalled();
    expect(completeReservationMock).not.toHaveBeenCalled();
  });
});
