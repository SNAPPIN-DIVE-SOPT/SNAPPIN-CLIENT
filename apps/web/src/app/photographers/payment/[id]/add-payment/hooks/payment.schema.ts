import { formatPrice } from '@snappin/shared/lib';

export const ADD_PAYMENT_LIMITS = {
  MAX_AMOUNT: 99_999_999,
  MAX_NAME_LENGTH: 20,
} as const;

export const ADD_PAYMENT_TEXT = {
  NAME_LABEL: '비용명',
  NAME_REQUIRED: '비용명을 입력해주세요.',
  NAME_HELP: `공백 포함 ${ADD_PAYMENT_LIMITS.MAX_NAME_LENGTH}자까지 입력 가능해요.`,
  NAME_MAX_ERROR: `비용명은 ${ADD_PAYMENT_LIMITS.MAX_NAME_LENGTH}자 이하이어야 합니다.`,

  AMOUNT_LABEL: '금액(원)',
  AMOUNT_REQUIRED: '금액을 입력해주세요.',
  AMOUNT_HELP: `${formatPrice(ADD_PAYMENT_LIMITS.MAX_AMOUNT)}원 이하까지 입력 가능해요.`,
  AMOUNT_MAX_ERROR: `금액은 ${formatPrice(ADD_PAYMENT_LIMITS.MAX_AMOUNT)}원 이하이어야 합니다.`,
  AMOUNT_ONLY_NUMBER_ERROR: '숫자만 입력해주세요.',
  AMOUNT_MIN_ERROR: '금액은 1원 이상이어야 합니다.',
} as const;
