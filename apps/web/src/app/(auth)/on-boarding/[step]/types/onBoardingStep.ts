import type {
  ON_BOARDING_SCHEMA,
  GenderValue,
  SnapCategoryValue,
} from '@/app/(auth)/on-boarding/[step]/constants/onBoardingForm.schema';

type OnBoardingFieldName = keyof typeof ON_BOARDING_SCHEMA.shape;

export type OnBoardingTextField = {
  name: Extract<OnBoardingFieldName, 'name' | 'nickname' | 'phoneNumber' | 'email'>;
  label: string;
  placeholder: string;
  type: 'text';
};

export type OnBoardingSelectField<T extends string = string> = {
  name: Extract<OnBoardingFieldName, 'gender'>;
  label: string;
  type: 'select';
  options: readonly T[];
};

export type OnBoardingCheckboxField<T extends string = string> = {
  name: Extract<OnBoardingFieldName, 'snapCategories'>;
  label: string;
  type: 'checkbox';
  options: readonly T[];
};

export type OnBoardingField =
  | OnBoardingTextField
  | OnBoardingSelectField<GenderValue>
  | OnBoardingCheckboxField<SnapCategoryValue>;

export type OnBoardingStep = {
  step: number;
  title: string;
  description?: string;
  fields: readonly OnBoardingField[];
  triggerFields: readonly OnBoardingFieldName[];
};
