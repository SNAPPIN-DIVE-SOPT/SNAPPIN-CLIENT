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

export const SCHEDULE_CHOICE_KEY = ['firstChoice', 'secondChoice', 'thirdChoice'] as const;
export type ScheduleChoiceKey = (typeof SCHEDULE_CHOICE_KEY)[number];
export const PRIMARY_SCHEDULE_CHOICE_KEY = SCHEDULE_CHOICE_KEY[0];

export const SCHEDULE_CHOICE: Record<ScheduleChoiceKey, string> = {
  firstChoice: '1지망',
  secondChoice: '2지망',
  thirdChoice: '3지망',
} as const;

export const UPLOAD_CONSENT_NOTE_LABEL = {
  agree: '동의 시',
  disagree: '비동의 시',
} as const;

export const UPLOAD_CONSENT_STATUS_KEY = ['agree', 'disagree'] as const;
export type UploadConsentStatus = (typeof UPLOAD_CONSENT_STATUS_KEY)[number];

export const UPLOAD_CONSENT_STATUS: Record<UploadConsentStatus, string> = {
  agree: '동의',
  disagree: '비동의',
} as const;
