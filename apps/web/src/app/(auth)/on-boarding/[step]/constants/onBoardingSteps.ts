import {
  GENDER_VALUES,
  SNAP_CATEGORIES_VALUES,
} from '@/app/(auth)/on-boarding/[step]/constants/onBoardingForm.schema';
import type { OnBoardingStep } from '@/app/(auth)/on-boarding/[step]/types/onBoardingStep';

const INFO_STEP_TITLE = '서비스 이용을 위해\n정보를 입력해 주세요.';
const INFO_STEP_DESCRIPTION = '스냅 사진 예약 시 필요한 정보예요.';

export const ON_BOARDING_STEPS = [
  {
    step: 1,
    title: INFO_STEP_TITLE,
    description: INFO_STEP_DESCRIPTION,
    triggerFields: ['name', 'gender'],
    fields: [
      {
        name: 'name',
        label: '이름',
        placeholder: '본인의 이름을 입력해주세요',
        type: 'text',
      },
      {
        name: 'gender',
        label: '성별',
        type: 'select',
        options: GENDER_VALUES,
      },
    ],
  },
  {
    step: 2,
    title: INFO_STEP_TITLE,
    description: INFO_STEP_DESCRIPTION,
    triggerFields: ['nickname'],
    fields: [
      {
        name: 'nickname',
        label: '닉네임',
        placeholder: '닉네임, 영문, 숫자 2~10자 이내',
        type: 'text',
      },
    ],
  },
  {
    step: 3,
    title: INFO_STEP_TITLE,
    description: INFO_STEP_DESCRIPTION,
    triggerFields: ['phone'],
    fields: [
      {
        name: 'phone',
        label: '전화번호',
        placeholder: "'-' 없이 숫자만 입력해주세요",
        type: 'text',
      },
    ],
  },
  {
    step: 4,
    title: INFO_STEP_TITLE,
    description: INFO_STEP_DESCRIPTION,
    triggerFields: ['email'],
    fields: [
      {
        name: 'email',
        label: '이메일',
        placeholder: '이메일 주소를 입력해주세요',
        type: 'text',
      },
    ],
  },
  {
    step: 5,
    title: '관심 있는 스냅 촬영을\n모두 선택해 주세요.',
    description: undefined,
    triggerFields: ['snapCategories'],
    fields: [
      {
        name: 'snapCategories',
        label: '',
        type: 'checkbox',
        options: SNAP_CATEGORIES_VALUES,
      },
    ],
  },
] as const satisfies readonly OnBoardingStep[];

export const TOTAL_STEP_COUNT = ON_BOARDING_STEPS.length;

export const getOnBoardingStep = (step: number) =>
  ON_BOARDING_STEPS.find((item) => item.step === step);
