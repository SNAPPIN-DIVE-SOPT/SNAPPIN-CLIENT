import type {
  ScheduleChoiceKey,
  UploadConsentStatus,
} from '@/app/product/[id]/reservation-form/constants/reservationCopyForm';

export type ReservationApplicant = {
  name: string;
  phoneNumber: string;
  email: string;
};

export type ScheduleSelectionValue = {
  date: string;
  time: string;
};

export type ScheduleSelections = Record<ScheduleChoiceKey, ScheduleSelectionValue>;

export type ReservationCopyFormValue = {
  placeId: string;
  placeKeyword: string;
  durationHours: number;
  peopleCount: number;
  schedules: ScheduleSelections;
  uploadConsentStatus?: UploadConsentStatus;
  requestContent: string;
};
