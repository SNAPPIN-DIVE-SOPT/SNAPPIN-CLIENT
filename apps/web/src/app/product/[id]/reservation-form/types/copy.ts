import { SCHEDULE_CHOICES } from '../constants/copy-form';

export type ReservationApplicant = {
  name: string;
  phoneNumber: string;
  email: string;
};

export type ScheduleChoiceKey = (typeof SCHEDULE_CHOICES)[number]['key'];

export type UploadConsentStatus = '' | 'agree' | 'disagree';

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
  uploadConsentStatus: UploadConsentStatus;
  requestContent: string;
};
