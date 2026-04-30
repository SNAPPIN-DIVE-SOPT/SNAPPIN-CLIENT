'use client';

import { type FormEvent } from 'react';
import AdditionalRequestSection from '@/app/product/[id]/reservation-form/_form/AdditionalRequestSection';
import ShootReservationSection from '@/app/product/[id]/reservation-form/_form/ShootReservationSection';
import {
  ApplicantInfoSection,
  ClientFooter,
  SchedulePickerDrawers,
} from '@/app/product/[id]/reservation-form/components';
import { useReservationCopyForm } from '@/app/product/[id]/reservation-form/hooks';
import RESERVATION_FORM_MOCK from '@/app/product/[id]/reservation-form/mock/reservationForm.mock';

type ReservationFormWrapperProps = {
  handleCopySuccess?: () => void;
};

export default function ReservationFormWrapper({
  handleCopySuccess,
}: ReservationFormWrapperProps) {
  const reservationCopyFormModel = useReservationCopyForm({
    applicant: RESERVATION_FORM_MOCK,
  });

  const {
    viewState: { isCopyPending },
    actions: { handleCopyReservationForm },
  } = reservationCopyFormModel;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='flex flex-col gap-[3rem] p-[2rem]'>
          <ApplicantInfoSection applicant={RESERVATION_FORM_MOCK} />
          <ShootReservationSection reservationCopyFormModel={reservationCopyFormModel} />
          <AdditionalRequestSection reservationCopyFormModel={reservationCopyFormModel} />
        </div>
      </form>

      {/* 하단 버튼 */}
      <ClientFooter
        disabled={isCopyPending}
        handleClick={handleCopyReservationForm}
        handleCopySuccess={handleCopySuccess}
      />

      <SchedulePickerDrawers reservationCopyFormModel={reservationCopyFormModel} />
    </>
  );
}
