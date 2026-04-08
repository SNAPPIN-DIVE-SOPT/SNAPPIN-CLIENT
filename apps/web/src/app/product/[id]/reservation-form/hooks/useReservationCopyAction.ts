'use client';

import { useState } from 'react';
import { type UseFormGetValues, type UseFormTrigger } from 'react-hook-form';
import type { ReservationCopyFormInput } from '@/app/product/[id]/reservation-form/constants';
import type { ReservationApplicant } from '@/app/product/[id]/reservation-form/types/copy';
import { createCopyText } from '@/app/product/[id]/reservation-form/utils';

type UseReservationCopyActionProps = {
  applicant: ReservationApplicant;
  getValues: UseFormGetValues<ReservationCopyFormInput>;
  trigger: UseFormTrigger<ReservationCopyFormInput>;
};

// 예약 신청 양식 복사 액션 훅
const useReservationCopyAction = ({
  applicant,
  getValues,
  trigger,
}: UseReservationCopyActionProps) => {
  const [isCopyPending, setIsCopyPending] = useState(false);

  const handleCopyReservationForm = async () => {
    const isCurrentFormValid = await trigger();

    if (!isCurrentFormValid) {
      return false;
    }

    const reservationCopyText = createCopyText({
      applicant,
      reservationCopyFormValue: getValues(),
    });

    try {
      setIsCopyPending(true);
      await navigator.clipboard.writeText(reservationCopyText);
      return true;
    } catch {
      return false;
    } finally {
      setIsCopyPending(false);
    }
  };

  return {
    isCopyPending,
    handleCopyReservationForm,
  };
};

export default useReservationCopyAction;
