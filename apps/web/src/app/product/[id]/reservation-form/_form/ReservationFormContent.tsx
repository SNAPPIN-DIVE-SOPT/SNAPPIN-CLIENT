'use client';

import { type FormEvent } from 'react';
import { ClientFooter, SchedulePickerDrawers } from '../components';
import useReservationCopyForm from '../hooks/useReservationCopyForm';
import RESERVATION_FORM_MOCK from '../mock/reservationForm.mock';
import AdditionalRequestSection from './AdditionalRequestSection';
import ReservationDetailsSection from './ReservationDetailsSection';
import ReservationInfoSection from './ReservationInfoSection';

type ReservationFormContentProps = {
  handleCopySuccess?: () => void;
};

export default function ReservationFormContent({
  handleCopySuccess,
}: ReservationFormContentProps) {
  const reservationCopyFormModel = useReservationCopyForm({
    applicant: RESERVATION_FORM_MOCK,
  });

  const {
    viewState: { isCopyPending, isCopyDisabled },
    actions: { handleCopyReservationForm },
  } = reservationCopyFormModel;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='flex flex-col gap-[3rem] p-[2rem]'>
          <ReservationInfoSection applicant={RESERVATION_FORM_MOCK} />
          <ReservationDetailsSection reservationCopyFormModel={reservationCopyFormModel} />
          <AdditionalRequestSection reservationCopyFormModel={reservationCopyFormModel} />
        </div>
      </form>

      {/* 하단 버튼 */}
      <ClientFooter
        disabled={isCopyPending || isCopyDisabled}
        handleClick={handleCopyReservationForm}
        handleCopySuccess={handleCopySuccess}
      />

      <SchedulePickerDrawers reservationCopyFormModel={reservationCopyFormModel} />
    </>
  );
}
