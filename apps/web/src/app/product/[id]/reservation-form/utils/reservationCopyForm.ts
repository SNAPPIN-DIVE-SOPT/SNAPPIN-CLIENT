import {
  DURATION_HOURS,
  PEOPLE_COUNT,
  SCHEDULE_CHOICES,
  type ScheduleChoiceKey,
} from '@/app/product/[id]/reservation-form/constants/reservationCopyForm';
import type {
  ReservationCopyFormValue,
  ScheduleSelections,
  ScheduleSelectionValue,
} from '@/app/product/[id]/reservation-form/types/copy';

// 날짜와 시간이 모두 선택되었는지 확인
export const hasCompletedSchedule = (scheduleSelection: ScheduleSelectionValue) => {
  return scheduleSelection.date.length > 0 && scheduleSelection.time.length > 0;
};

// 이전 지망이 완료되어 있어야 현재 지망 선택 가능
export const hasSelectableScheduleChoice = (
  scheduleChoiceKey: ScheduleChoiceKey,
  scheduleSelections: ScheduleSelections,
) => {
  const scheduleChoiceIndex = SCHEDULE_CHOICES.findIndex(({ key }) => {
    return key === scheduleChoiceKey;
  });

  if (scheduleChoiceIndex <= 0) {
    return true;
  }

  return SCHEDULE_CHOICES.slice(0, scheduleChoiceIndex).every(({ key }) => {
    return hasCompletedSchedule(scheduleSelections[key]);
  });
};

const createInitialScheduleSelections = (): ScheduleSelections => {
  return Object.fromEntries(
    SCHEDULE_CHOICES.map(({ key }) => {
      return [key, { date: '', time: '' }];
    }),
  ) as ScheduleSelections;
};

export const createDefaultReservationCopyFormValue = (): ReservationCopyFormValue => {
  return {
    placeId: '',
    placeKeyword: '',
    durationHours: DURATION_HOURS.MIN,
    peopleCount: PEOPLE_COUNT.MIN,
    schedules: createInitialScheduleSelections(),
    uploadConsentStatus: undefined,
    requestContent: '',
  };
};

export const createDurationLabel = (durationHours: number) => {
  return `${Number.isInteger(durationHours) ? durationHours : durationHours.toFixed(1)}시간`;
};

export const createScheduleDateLabel = (scheduleDate: string) => {
  return scheduleDate.length > 0 ? `${scheduleDate.replaceAll('-', '.')}.` : '날짜 선택';
};

export const createScheduleTimeLabel = (scheduleTime: string) => {
  const [hourValueString = '0', minuteValueString = '00'] = scheduleTime.split(':');
  const hourValue = Number(hourValueString);
  const isMorning = hourValue < 12;
  const hourValueForDisplay = hourValue % 12 === 0 ? 12 : hourValue % 12;

  return scheduleTime.length > 0
    ? `${isMorning ? '오전' : '오후'} ${String(hourValueForDisplay).padStart(2, '0')}:${minuteValueString}`
    : '시간 선택';
};
