export const DURATION_HOURS = {
  MIN: 1,
  MAX: 2,
  STEP: 0.5,
} as const;

export const PEOPLE_COUNT = {
  MIN: 1,
  MAX: 15,
  STEP: 1,
} as const;

export const REQUEST_CONTENT = {
  MAX_LENGTH: 500,
} as const;

export const RESERVATION_COPY_FORM_ERROR_MESSAGE = {
  PLACE_ID_REQUIRED: '촬영 장소를 선택해 주세요.',
  PLACE_KEYWORD_REQUIRED: '촬영 장소를 입력해 주세요.',
  SCHEDULE_PAIR_REQUIRED: '날짜와 시간을 함께 선택해 주세요.',
  SCHEDULE_REQUIRED: '1~3지망 중 최소 1개 일정을 선택해 주세요.',
  UPLOAD_CONSENT_REQUIRED: '업로드 동의 여부를 선택해 주세요.',
  REQUEST_CONTENT_MAX: `최대 ${REQUEST_CONTENT.MAX_LENGTH}자까지 입력할 수 있어요.`,
} as const;

export const SCHEDULE_CHOICES = [
  { key: 'firstChoice', label: '1지망' },
  { key: 'secondChoice', label: '2지망' },
  { key: 'thirdChoice', label: '3지망' },
] as const;

export type ScheduleChoiceKey = (typeof SCHEDULE_CHOICES)[number]['key'];

export const PRIMARY_SCHEDULE_CHOICE_KEY = SCHEDULE_CHOICES[0].key;

export const UPLOAD_CONSENT_NOTES = [
  { label: '동의 시', note: '보정본 1장 추가 제공' },
  { label: '비동의 시', note: '비동의 시 제공 범위가 달라질 수 있습니다.' },
] as const;

export const UPLOAD_CONSENT_STATUS_VALUES = ['', 'agree', 'disagree'] as const;

export type UploadConsentStatus = (typeof UPLOAD_CONSENT_STATUS_VALUES)[number];

export const UPLOAD_CONSENT_STATUS_LABEL = {
  agree: '동의',
  disagree: '비동의',
} as const;
