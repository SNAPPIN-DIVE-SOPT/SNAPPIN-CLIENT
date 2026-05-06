import {
  useGetReservationApplicant,
  useGetReservationAvailableDurationTime,
  useGetReservationAvailablePeopleRange,
  useGetReservationExtraInfo,
} from '@/app/product/[id]/reservation-form/api';

type UseReservationFormDataProps = {
  productId: number;
  isEnabled: boolean;
};

// 예약 신청 폼 초기 데이터 조회 훅
export default function useReservationFormData({
  productId,
  isEnabled,
}: UseReservationFormDataProps) {
  const { data: reservationApplicant } = useGetReservationApplicant(isEnabled);
  const { data: reservationExtraInfo } = useGetReservationExtraInfo(productId, isEnabled);
  const { data: reservationAvailableDurationTime } =
    useGetReservationAvailableDurationTime(productId, isEnabled);
  const { data: reservationAvailablePeopleRange } =
    useGetReservationAvailablePeopleRange(productId, isEnabled);

  return {
    reservationApplicant,
    reservationExtraInfo,
    reservationAvailableDurationTime,
    reservationAvailablePeopleRange,
  };
}
