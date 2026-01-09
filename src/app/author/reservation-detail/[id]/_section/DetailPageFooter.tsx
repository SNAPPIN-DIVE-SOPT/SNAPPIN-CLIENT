'use client';

import { STATE_CODES, StateCode } from '@/types/stateCode';
import Button from '@/ui/button/base/Button';

type DetailPageFooterProps = {
  date: string; // 예약 날짜 (YYYY-MM-DD)
  startTime: string; // 10:00
  status: StateCode;
};

type ButtonConfig = {
  label: string;
  disabled: boolean;
  onClick?: () => void;
};

export default function DetailPageFooter({ date, startTime, status }: DetailPageFooterProps) {
  const now = new Date();
  const start = new Date(`${date}T${startTime}:00`);

  const isAfterStart = now >= start;

  const getButtonConfig = (): ButtonConfig => {
    switch (status) {
      case STATE_CODES.PHOTOGRAPHER_CHECKING:
        return {
          label: '결제 요청하기',
          disabled: false,
          onClick: () => {
            //TODO: 결제 요청 페이지로 이동 후 결제 요청 API 호출 쿼리키 무효화
          },
        };
      case STATE_CODES.PAYMENT_REQUESTED:
        return {
          label: '결제 요청 중',
          disabled: true,
          onClick: undefined,
        };
      case STATE_CODES.PAYMENT_COMPLETED:
        return {
          label: '예약 확정하기',
          disabled: false,
          onClick: () => {
            // TODO: 예약 확정 API 호출 후 성공 시 쿼리키 무효화
          },
        };

      case STATE_CODES.RESERVATION_CONFIRMED:
        if (isAfterStart) {
          return {
            label: '촬영 완료하고 리뷰 요청하기',
            disabled: false,
            onClick: () => {
              // TODO:  API 호출 후 성공 시 쿼리키 무효화
            },
          };
        }
        return {
          label: '예약 확정',
          disabled: true,
          onClick: undefined,
        };
      case STATE_CODES.SHOOT_COMPLETED:
        return {
          label: '리뷰 요청 완료',
          disabled: true,
          onClick: undefined,
        };
      case STATE_CODES.RESERVATION_CANCELED:
        return {
          label: '고객님의 예약 취소',
          disabled: true,
          onClick: undefined,
        };
      case STATE_CODES.RESERVATION_REFUSED:
        return {
          label: '예약 거절 완료',
          disabled: true,
          onClick: undefined,
        };

      default:
        throw new Error(
          `작가 예약 상세 페이지에서 예약 상태에 대한 버튼 설정이 없습니다 : ${status}`,
        );
    }
  };

  const { label, disabled, onClick } = getButtonConfig();

  return (
    <Button disabled={disabled} onClick={onClick}>
      {label}
    </Button>
  );
}
