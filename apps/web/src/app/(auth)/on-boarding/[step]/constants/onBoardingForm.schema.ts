import { z } from 'zod';

export const SCHEMA = {
  NAME_MAX: 4,
  NICKNAME_MIN: 2,
  NICKNAME_MAX: 10,
} as const;

export const GENDER_VALUES = ['girl', 'boy'] as const;
export const INTEREST_VALUES = ['graduation', 'friendship', 'couple', 'life'] as const;
export type GenderValue = (typeof GENDER_VALUES)[number];
export type InterestValue = (typeof INTEREST_VALUES)[number];

export const GENDER_LABELS: Record<GenderValue, string> = {
  girl: '여자',
  boy: '남자',
};

export const INTEREST_LABELS: Record<InterestValue, string> = {
  graduation: '나만의 졸업 스냅',
  friendship: '친구와의 우정 스냅',
  couple: '연인과의 커플 스냅',
  life: '소중한 내 인생 스냅',
};

export const ERROR_MESSAGES = {
  NAME_REQUIRED: '이름을 입력해주세요.',
  NAME_MAX: `이름을 ${SCHEMA.NAME_MAX}글자 이내로 입력해주세요.`,
  NAME_NO_WHITESPACE: '띄어쓰기 없이 작성해주세요.',
  GENDER_REQUIRED: '성별을 선택해주세요.',
  NICKNAME_TEXT: `한글, 영문, 숫자 ${SCHEMA.NICKNAME_MIN}-${SCHEMA.NICKNAME_MAX}자 이내로 입력해주세요.`,
  NICKNAME_NO_WHITESPACE: '띄어쓰기 없이 작성해주세요.',
  PHONE_NUMBER: '정확한 전화번호를 입력해주세요.',
  EMAIL: '정확한 이메일 주소를 입력해주세요.',
  INTERESTS_REQUIRED: '관심 있는 스냅 촬영을 1개 이상 선택해주세요.',
} as const;

export const PHONE_NUMBER_REGEX = /^01[0-9]\d{7,8}$/;

export const onBoardingSchema = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGES.NAME_REQUIRED)
    .max(SCHEMA.NAME_MAX, ERROR_MESSAGES.NAME_MAX)
    .refine((value) => !/\s/.test(value), {
      message: ERROR_MESSAGES.NAME_NO_WHITESPACE,
    }),

  gender: z.enum(GENDER_VALUES, {
    error: ERROR_MESSAGES.GENDER_REQUIRED,
  }),

  nickname: z
    .string()
    .min(SCHEMA.NICKNAME_MIN, ERROR_MESSAGES.NICKNAME_TEXT)
    .max(SCHEMA.NICKNAME_MAX, ERROR_MESSAGES.NICKNAME_TEXT)
    .refine((value) => !/\s/.test(value), {
      message: ERROR_MESSAGES.NICKNAME_NO_WHITESPACE,
    }),

  phoneNumber: z.string().refine((value) => PHONE_NUMBER_REGEX.test(value.replace(/-/g, '')), {
    message: ERROR_MESSAGES.PHONE_NUMBER,
  }),

  email: z.email(ERROR_MESSAGES.EMAIL),

  interests: z.array(z.enum(INTEREST_VALUES)).min(1, ERROR_MESSAGES.INTERESTS_REQUIRED),
});

export type OnBoardingInput = z.infer<typeof onBoardingSchema>;
