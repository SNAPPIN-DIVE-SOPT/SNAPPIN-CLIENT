import { z } from 'zod';

export const SCHEMA = {
  NAME_MAX: 4,
  NICKNAME_MIN: 2,
  NICKNAME_MAX: 10,
  PHONE_NUMBER_LENGTH: 11,
} as const;

export const GENDER_VALUES = ['MALE', 'FEMALE'] as const;
export const SNAP_CATEGORIES_VALUES = ['GRADUATION', 'FRIENDS', 'COUPLE', 'DAILY'] as const;
export type GenderValue = (typeof GENDER_VALUES)[number];
export type SnapCategoryValue = (typeof SNAP_CATEGORIES_VALUES)[number];

export const GENDER_LABELS: Record<GenderValue, string> = {
  FEMALE: '여자',
  MALE: '남자',
};

export const SNAP_CATEGORIES_LABELS: Record<SnapCategoryValue, string> = {
  GRADUATION: '나만의 졸업 스냅',
  FRIENDS: '친구와의 우정 스냅',
  COUPLE: '연인과의 커플 스냅',
  DAILY: '소중한 내 인생 스냅',
};

export const ERROR_MESSAGES = {
  NAME_REQUIRED: '이름을 입력해주세요.',
  NAME_MAX: `이름을 ${SCHEMA.NAME_MAX}글자 이내로 입력해주세요.`,
  NAME_NO_WHITESPACE: '띄어쓰기 없이 작성해주세요.',
  NAME_KOREAN_ONLY: '한글로 작성해주세요.',
  GENDER_REQUIRED: '성별을 선택해주세요.',
  NICKNAME_TEXT: `한글, 영문, 숫자 ${SCHEMA.NICKNAME_MIN}-${SCHEMA.NICKNAME_MAX}자 이내로 입력해주세요.`,
  NICKNAME_NO_WHITESPACE: '띄어쓰기 없이 작성해주세요.',
  PHONE_NUMBER: '정확한 전화번호를 입력해주세요.',
  EMAIL: '정확한 이메일 주소를 입력해주세요.',
  INTERESTS_REQUIRED: '관심 있는 스냅 촬영을 1개 이상 선택해주세요.',
} as const;

const PHONE_NUMBER_REGEX = /^01[0-9]\d{8}$/;
const NAME_REGEX = /^[가-힣]+$/;
const NICKNAME_TEXT_REGEX = /^[가-힣a-zA-Z0-9]+$/;
const NICKNAME_WHITESPACE_REGEX = /\s/;

export const ON_BOARDING_SCHEMA = z.object({
  name: z
    .string()
    .min(1, ERROR_MESSAGES.NAME_REQUIRED)
    .max(SCHEMA.NAME_MAX, ERROR_MESSAGES.NAME_MAX)
    .refine((value) => !/\s/.test(value), {
      message: ERROR_MESSAGES.NAME_NO_WHITESPACE,
    })
    .refine((value) => NAME_REGEX.test(value), {
      message: ERROR_MESSAGES.NAME_KOREAN_ONLY,
    }),

  gender: z.enum(GENDER_VALUES, {
    error: ERROR_MESSAGES.GENDER_REQUIRED,
  }),

  nickname: z
    .string()
    .min(SCHEMA.NICKNAME_MIN, ERROR_MESSAGES.NICKNAME_TEXT)
    .max(SCHEMA.NICKNAME_MAX, ERROR_MESSAGES.NICKNAME_TEXT)
    .refine((value) => !NICKNAME_WHITESPACE_REGEX.test(value), {
      message: ERROR_MESSAGES.NICKNAME_NO_WHITESPACE,
    })
    .refine((value) => NICKNAME_TEXT_REGEX.test(value), {
      message: ERROR_MESSAGES.NICKNAME_TEXT,
    }),

  phoneNumber: z.string().refine((value) => PHONE_NUMBER_REGEX.test(value.replace(/-/g, '')), {
    message: ERROR_MESSAGES.PHONE_NUMBER,
  }),

  email: z.email(ERROR_MESSAGES.EMAIL),

  snapCategories: z.array(z.enum(SNAP_CATEGORIES_VALUES)).min(1, ERROR_MESSAGES.INTERESTS_REQUIRED),
});

export type OnBoardingInput = z.infer<typeof ON_BOARDING_SCHEMA>;
