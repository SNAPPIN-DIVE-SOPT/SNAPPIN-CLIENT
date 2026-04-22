'use client';

import { type FormEvent } from 'react';
import AdditionalRequestSection from '@/app/product/[id]/reservation-form/_form/AdditionalRequestSection';
import ShootReservationSection from '@/app/product/[id]/reservation-form/_form/ShootReservationSection';
import {
  useGetReservationApplicant,
  useGetReservationAvailableDurationTime,
  useGetReservationAvailablePeopleRange,
  useGetReservationExtraInfo,
} from '@/app/product/[id]/reservation-form/api';
import {
  ApplicantInfoSection,
  ClientFooter,
  SchedulePickerDrawers,
} from '@/app/product/[id]/reservation-form/components';
import { useAuth } from '@/auth/hooks/useAuth';
import { useReservationCopyForm } from '@/app/product/[id]/reservation-form/hooks';

type ReservationFormWrapperProps = {
  productId: number;
  handleCopySuccess?: () => void;
};

export default function ReservationFormWrapper({
  productId,
  handleCopySuccess,
}: ReservationFormWrapperProps) {
  const { isLogIn } = useAuth();
  const isReservationInfoEnabled = isLogIn === true;
  const {
    data: reservationApplicant,
  } = useGetReservationApplicant(isReservationInfoEnabled);
  const { data: reservationExtraInfo } = useGetReservationExtraInfo(
    productId,
    isReservationInfoEnabled,
  );
  const {
    data: reservationAvailableDurationTime,
  } = useGetReservationAvailableDurationTime(productId, isReservationInfoEnabled);
  const {
    data: reservationAvailablePeopleRange,
  } = useGetReservationAvailablePeopleRange(productId, isReservationInfoEnabled);
  const applicant = {
    name: reservationApplicant?.name ?? '',
    phoneNumber: reservationApplicant?.phoneNumber ?? '',
    email: reservationApplicant?.email ?? '',
  };

  const reservationCopyFormModel = useReservationCopyForm({
    applicant,
    minDurationHours: reservationAvailableDurationTime,
    minPeopleCount: reservationAvailablePeopleRange?.minPeople,
    maxPeopleCount: reservationAvailablePeopleRange?.maxPeople,
  });

  const {
    viewState: { isCopyPending },
    actions: { handleCopyReservationForm },
  } = reservationCopyFormModel;

  if (!isReservationInfoEnabled) {
    return null;
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='flex flex-col gap-[3rem] p-[2rem]'>
          {reservationApplicant ? <ApplicantInfoSection applicant={applicant} /> : null}
          <ShootReservationSection
            reservationCopyFormModel={reservationCopyFormModel}
            reservationExtraInfo={reservationExtraInfo}
          />
          <AdditionalRequestSection
            reservationCopyFormModel={reservationCopyFormModel}
            reservationExtraInfo={reservationExtraInfo}
          />
        </div>
      </form>

      <ClientFooter
        disabled={isCopyPending}
        handleClick={handleCopyReservationForm}
        handleCopySuccess={handleCopySuccess}
      />

      <SchedulePickerDrawers
        productId={productId}
        reservationCopyFormModel={reservationCopyFormModel}
      />
    </>
  );
}
