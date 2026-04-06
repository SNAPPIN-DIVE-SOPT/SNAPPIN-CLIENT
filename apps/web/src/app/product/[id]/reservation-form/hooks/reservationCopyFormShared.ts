export const MINIMUM_PEOPLE_COUNT = 1;
export const PEOPLE_COUNT_STEP = 1;
export const DURATION_STEP_HOURS = 0.5;
export const REQUEST_CONTENT_MAX_LENGTH = 500;
export const REQUEST_CONTENT_ERROR_MESSAGE = '최대 500자까지 입력할 수 있어요.';

export const SCHEDULE_CHOICE_KEYS = ['firstChoice', 'secondChoice', 'thirdChoice'] as const;
export const PRIMARY_SCHEDULE_CHOICE_KEY = SCHEDULE_CHOICE_KEYS[0];

export type ScheduleChoiceKey = (typeof SCHEDULE_CHOICE_KEYS)[number];
export type SchedulePickerType = 'date' | 'time';
export type UploadConsentStatus = 'agree' | 'disagree' | '';

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

export type ReservationCopyFormInput = {
  placeId: string;
  placeKeyword: string;
  durationHours: number;
  peopleCount: number;
  schedules: ScheduleSelections;
  uploadConsentStatus: UploadConsentStatus;
  requestContent: string;
};

// 1~3지망 정의
const SCHEDULE_CHOICE_LABELS: Record<ScheduleChoiceKey, string> = {
  firstChoice: '1지망',
  secondChoice: '2지망',
  thirdChoice: '3지망',
};

// 렌더링에 사용할 일정 선택 옵션 목록
export const SCHEDULE_CHOICES: ReadonlyArray<{
  key: ScheduleChoiceKey;
  label: string;
}> = SCHEDULE_CHOICE_KEYS.map((scheduleChoiceKey) => ({
  key: scheduleChoiceKey,
  label: SCHEDULE_CHOICE_LABELS[scheduleChoiceKey],
}));

// 날짜와 시간이 모두 선택 되었는지 검증
export const checkHasCompletedSchedule = (scheduleSelection: ScheduleSelectionValue) => {
  return scheduleSelection.date.length > 0 && scheduleSelection.time.length > 0;
};

export const createInitialScheduleSelections = (): ScheduleSelections => {
  return Object.fromEntries(
    SCHEDULE_CHOICE_KEYS.map((scheduleChoiceKey) => {
      return [scheduleChoiceKey, { date: '', time: '' }];
    }),
  ) as ScheduleSelections;
};
