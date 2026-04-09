'use client';

import { type UseFormSetValue } from 'react-hook-form';
import type { ReservationCopyFormInput } from '@/app/product/[id]/reservation-form/constants';
import { usePlaceSearchField } from '@/hooks/usePlaceSearchField';

type UseReservationPlaceFieldProps = {
  placeKeyword: ReservationCopyFormInput['placeKeyword'];
  placeId: ReservationCopyFormInput['placeId'];
  setValue: UseFormSetValue<ReservationCopyFormInput>;
};

// 예약 신청 양식의 장소 검색
export default function useReservationPlaceField({
  placeKeyword,
  placeId,
  setValue,
}: UseReservationPlaceFieldProps) {
  const {
    options: placeOptions,
    handleChange: handlePlaceKeywordChange,
    handleBlur: handlePlaceBlur,
  } = usePlaceSearchField({
    value: placeKeyword,
    onValueChange: (nextPlaceKeyword) =>
      setValue('placeKeyword', nextPlaceKeyword, { shouldValidate: true }),
    selectedId: placeId ? placeId : null,
    setSelectedId: (nextPlaceId) =>
      setValue('placeId', nextPlaceId ?? '', { shouldValidate: true }),
    clearOnBlurWhenNoId: false,
  });

  return {
    placeOptions,
    handlePlaceKeywordChange,
    handlePlaceBlur,
  };
}
