'use client';

import { type FormEvent } from 'react';
import { ClientFooter, SchedulePickerDrawers } from '../components';
import { useReservationCopyForm } from '../hooks';
import AdditionalRequestSection from './AdditionalRequestSection';
import ReservationDetailsSection from './ReservationDetailsSection';
import ReservationInfoSection from './ReservationInfoSection';

type ReservationFormContentProps = {
  handleCopySuccess?: () => void;
};

const DEFAULT_MINIMUM_DURATION_HOURS = 1;
const DEFAULT_MAX_PEOPLE = 15;

export default function ReservationFormContent({
  handleCopySuccess,
}: ReservationFormContentProps) {
  const reservationCopyFormModel = useReservationCopyForm({
    minimumDurationHours: DEFAULT_MINIMUM_DURATION_HOURS,
    maxPeople: DEFAULT_MAX_PEOPLE,
  });

  const { isCopyDisabled, handleCopyReservationForm } = reservationCopyFormModel;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='flex flex-col gap-[3rem] p-[2rem]'>
          <ReservationInfoSection />
          <ReservationDetailsSection reservationCopyFormModel={reservationCopyFormModel} />
          <AdditionalRequestSection reservationCopyFormModel={reservationCopyFormModel} />
        </div>
      </form>

      {/* 하단 버튼 */}
      <ClientFooter
        disabled={isCopyDisabled}
        handleClick={handleCopyReservationForm}
        handleCopySuccess={handleCopySuccess}
      />

      <SchedulePickerDrawers reservationCopyFormModel={reservationCopyFormModel} />
    </>
  );
}
