'use client';

import { type UseFormSetValue } from 'react-hook-form';
import type { ReservationCopyFormInput } from '@/app/product/[id]/reservation-form/constants';
import { usePlaceSearchField } from '@/hooks/usePlaceSearchField';

type UseReservationPlaceFieldProps = {
  values: ReservationCopyFormInput;
  setValue: UseFormSetValue<ReservationCopyFormInput>;
};

// 예약 신청 양식의 장소 검색
const useReservationPlaceField = ({ values, setValue }: UseReservationPlaceFieldProps) => {
  const {
    options: placeOptions,
    handleChange: handlePlaceKeywordChange,
    handleBlur: handlePlaceBlur,
  } = usePlaceSearchField({
    value: values.placeKeyword,
    onValueChange: (nextPlaceKeyword) =>
      setValue('placeKeyword', nextPlaceKeyword, { shouldValidate: true }),
    selectedId: values.placeId ? values.placeId : null,
    setSelectedId: (nextPlaceId) =>
      setValue('placeId', nextPlaceId ?? '', { shouldValidate: true }),
    clearOnBlurWhenNoId: false,
  });

  return {
    placeOptions,
    handlePlaceKeywordChange,
    handlePlaceBlur,
  };
};

export default useReservationPlaceField;
