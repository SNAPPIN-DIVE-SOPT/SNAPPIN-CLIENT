'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePlaceSearchField } from '@/hooks/usePlaceSearchField';
import { formatShortDate } from '@/utils/formatDate';
import RESERVATION_FORM_MOCK from '../mock/reservationForm.mock';

const MINIMUM_PEOPLE_COUNT = 1;
const PEOPLE_COUNT_STEP = 1;
const DURATION_STEP_HOURS = 0.5;
const REQUEST_CONTENT_MAX_LENGTH = 500;
const REQUEST_CONTENT_ERROR_MESSAGE = '최대 500자까지 입력할 수 있어요.';

// 1~3지망 일정 관련
const SCHEDULE_CHOICE_KEYS = ['firstChoice', 'secondChoice', 'thirdChoice'] as const;
const PRIMARY_SCHEDULE_CHOICE_KEY = SCHEDULE_CHOICE_KEYS[0];

type ScheduleChoiceKey = (typeof SCHEDULE_CHOICE_KEYS)[number];
type SchedulePickerType = 'date' | 'time';
type ActiveSchedulePicker = {
  scheduleChoiceKey: ScheduleChoiceKey;
  schedulePickerType: SchedulePickerType;
};
type StepDirection = 'increase' | 'decrease';
type UploadConsentStatus = 'agree' | 'disagree' | '';

const SCHEDULE_CHOICE_LABELS: Record<ScheduleChoiceKey, string> = {
  firstChoice: '1지망',
  secondChoice: '2지망',
  thirdChoice: '3지망',
};

export const SCHEDULE_CHOICES: ReadonlyArray<{
  key: ScheduleChoiceKey;
  label: string;
}> = SCHEDULE_CHOICE_KEYS.map((scheduleChoiceKey) => {
  return {
    key: scheduleChoiceKey,
    label: SCHEDULE_CHOICE_LABELS[scheduleChoiceKey],
  };
});

type ScheduleSelectionValue = {
  date: string;
  time: string;
};

type ScheduleSelections = Record<ScheduleChoiceKey, ScheduleSelectionValue>;

type ReservationCopyFormInput = {
  placeId: string;
  placeKeyword: string;
  durationHours: number;
  peopleCount: number;
  schedules: ScheduleSelections;
  uploadConsentStatus: UploadConsentStatus;
  requestContent: string;
};

type UseReservationCopyFormProps = {
  minimumDurationHours?: number;
  maxPeople?: number;
};

// 날짜와 시간이 모두 선택 되었는지 검증
const checkHasCompletedSchedule = (scheduleSelection: ScheduleSelectionValue) => {
  return scheduleSelection.date.length > 0 && scheduleSelection.time.length > 0;
};

// 예약 폼 검증 스키마
const createReservationCopyFormSchema = ({
  minimumDurationHours,
  maximumDurationHours,
  minPeople,
  maxPeople,
}: {
  minimumDurationHours: number;
  maximumDurationHours: number;
  minPeople: number;
  maxPeople: number;
}) => {
  const scheduleSelectionSchema = z
    .object({
      date: z.string(),
      time: z.string(),
    })
    .superRefine((scheduleSelectionValue, context) => {
      const hasAnySelectedScheduleValue =
        scheduleSelectionValue.date.length > 0 || scheduleSelectionValue.time.length > 0;
      const hasCompletedSchedule = checkHasCompletedSchedule(scheduleSelectionValue);
      if (hasAnySelectedScheduleValue && !hasCompletedSchedule) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: '날짜와 시간을 함께 선택해 주세요.',
        });
      }
    });

  // 일정 검증
  const scheduleSelectionSchemaShape = Object.fromEntries(
    SCHEDULE_CHOICE_KEYS.map((scheduleChoiceKey) => {
      return [scheduleChoiceKey, scheduleSelectionSchema];
    }),
  ) as Record<ScheduleChoiceKey, typeof scheduleSelectionSchema>;

  return z
    .object({
      placeId: z.string().min(1, '촬영 장소를 선택해 주세요.'),
      placeKeyword: z.string().min(1, '촬영 장소를 입력해 주세요.'),
      durationHours: z.number().min(minimumDurationHours).max(maximumDurationHours),
      peopleCount: z.number().min(minPeople).max(maxPeople),
      schedules: z.object(scheduleSelectionSchemaShape),
      uploadConsentStatus: z.union([z.literal('agree'), z.literal('disagree'), z.literal('')]),
      requestContent: z.string().max(REQUEST_CONTENT_MAX_LENGTH, REQUEST_CONTENT_ERROR_MESSAGE),
    })
    .superRefine((reservationCopyFormValue, context) => {
      const hasSelectedUploadConsent = reservationCopyFormValue.uploadConsentStatus.length > 0;
      // 1~3지망 확인
      const hasAnySelectedSchedule = SCHEDULE_CHOICE_KEYS.some((scheduleChoiceKey) => {
        return checkHasCompletedSchedule(reservationCopyFormValue.schedules[scheduleChoiceKey]);
      });

      if (!hasSelectedUploadConsent) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['uploadConsentStatus'],
          message: '업로드 동의 여부를 선택해 주세요.',
        });
      }

      if (!hasAnySelectedSchedule) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['schedules', PRIMARY_SCHEDULE_CHOICE_KEY, 'date'],
          message: '1~3지망 중 최소 1개 일정을 선택해 주세요.',
        });
      }
    });
};

// 텍스트 복사 시, form의 각 항목 노출 방식 정의
const createReservationCopyText = ({
  placeKeyword,
  durationHours,
  peopleCount,
  schedules,
  uploadConsentStatus,
  requestContent,
}: ReservationCopyFormInput) => {
  const scheduleLines = SCHEDULE_CHOICES.filter(({ key }) => {
    return checkHasCompletedSchedule(schedules[key]);
  }).map(({ key, label }) => {
    const scheduleSelection = schedules[key];
    const formattedScheduleDate = formatShortDate(scheduleSelection.date).replaceAll('.', '/');
    return `• ${label}: ${formattedScheduleDate} ${scheduleSelection.time}`;
  });

  return [
    `1) 이름: ${RESERVATION_FORM_MOCK.name}`,
    `2) 전화번호: ${RESERVATION_FORM_MOCK.phoneNumber}`,
    `3) 이메일: ${RESERVATION_FORM_MOCK.email}`,
    `4) 촬영 장소: ${placeKeyword}`,
    `5) 촬영 시간: ${durationHours}시간`,
    `6) 촬영 인원: ${peopleCount}명`,
    `7) 촬영 일정`,
    ...scheduleLines,
    `8) 업로드 동의 여부: ${uploadConsentStatus === 'agree' ? '동의' : '비동의'}`,
    `9) 기타 요청 사항: ${requestContent || '-'}`,
  ].join('\n');
};

// 예약 신청 양식 복사 훅
export const useReservationCopyForm = ({
  minimumDurationHours = 1,
  maxPeople = 15,
}: UseReservationCopyFormProps = {}) => {
  const maximumDurationHours = minimumDurationHours + 1;
  const minPeople = MINIMUM_PEOPLE_COUNT;

  const reservationCopyFormSchema = createReservationCopyFormSchema({
    minimumDurationHours,
    maximumDurationHours,
    minPeople,
    maxPeople,
  });
  const initialScheduleSelections = Object.fromEntries(
    SCHEDULE_CHOICE_KEYS.map((scheduleChoiceKey) => {
      return [scheduleChoiceKey, { date: '', time: '' }];
    }),
  ) as ScheduleSelections;

  const {
    control,
    setValue,
    getValues,
    trigger,
    formState: { isValid, errors },
  } = useForm<ReservationCopyFormInput>({
    resolver: zodResolver(reservationCopyFormSchema),
    defaultValues: {
      placeId: '',
      placeKeyword: '',
      durationHours: minimumDurationHours,
      peopleCount: minPeople,
      schedules: initialScheduleSelections,
      uploadConsentStatus: '',
      requestContent: '',
    },
    mode: 'onChange',
  });

  const reservationCopyFormValue = useWatch({ control });
  const {
    placeId = '',
    placeKeyword = '',
    durationHours = minimumDurationHours,
    peopleCount = minPeople,
    schedules: scheduleSelections = initialScheduleSelections,
    requestContent = '',
  } = reservationCopyFormValue ?? {};
  const uploadConsentStatus = reservationCopyFormValue?.uploadConsentStatus ?? '';
  const requestContentErrorMessage = errors.requestContent?.message ?? '';

  const [activeSchedulePicker, setActiveSchedulePicker] = useState<ActiveSchedulePicker | null>(
    null,
  );
  const activeScheduleChoiceKey = activeSchedulePicker?.scheduleChoiceKey ?? null;

  // 장소 자동완성
  const {
    options: placeOptions,
    handleChange: handlePlaceKeywordChange,
    handleBlur: handlePlaceBlur,
  } = usePlaceSearchField({
    value: placeKeyword,
    onValueChange: (nextPlaceKeyword) =>
      setValue('placeKeyword', nextPlaceKeyword, { shouldValidate: true }),
    selectedId: placeId.length > 0 ? placeId : null,
    setSelectedId: (nextPlaceId) =>
      setValue('placeId', nextPlaceId ?? '', { shouldValidate: true }),
    clearOnBlurWhenNoId: false,
  });

  // 일정 드로어 열기
  const handleSchedulePickerOpen = (
    scheduleChoiceKey: ScheduleChoiceKey,
    schedulePickerType: SchedulePickerType,
  ) => {
    setActiveSchedulePicker({
      scheduleChoiceKey,
      schedulePickerType,
    });
  };

  const handleSchedulePickerClose = () => {
    setActiveSchedulePicker(null);
  };

  const handleScheduleSelection = (
    scheduleSelectionChangeField: keyof ScheduleSelectionValue,
    scheduleSelectionValue: string,
  ) => {
    if (!activeScheduleChoiceKey) {
      handleSchedulePickerClose();
      return;
    }

    setValue(
      `schedules.${activeScheduleChoiceKey}.${scheduleSelectionChangeField}`,
      scheduleSelectionValue,
      { shouldValidate: true },
    );

    handleSchedulePickerClose();
  };

  const handleSchedulePickerOpenChange = (nextOpenStatus: boolean) => {
    if (!nextOpenStatus) {
      handleSchedulePickerClose();
    }
  };

  // 촬영 시간 증감
  const handleDurationHoursStep = (stepDirection: StepDirection) => {
    const currentDurationHours = getValues('durationHours');
    const durationHoursStepValue =
      stepDirection === 'increase' ? DURATION_STEP_HOURS : -DURATION_STEP_HOURS;
    const nextDurationHours = Number(
      Math.min(
        maximumDurationHours,
        Math.max(minimumDurationHours, currentDurationHours + durationHoursStepValue),
      ).toFixed(1),
    );

    setValue('durationHours', nextDurationHours, { shouldValidate: true });
  };

  // 촬영 인원 증감
  const handlePeopleCountStep = (stepDirection: StepDirection) => {
    const currentPeopleCount = getValues('peopleCount');
    const peopleCountStepValue =
      stepDirection === 'increase' ? PEOPLE_COUNT_STEP : -PEOPLE_COUNT_STEP;
    const nextPeopleCount = Math.min(
      maxPeople,
      Math.max(minPeople, currentPeopleCount + peopleCountStepValue),
    );

    setValue('peopleCount', nextPeopleCount, { shouldValidate: true });
  };

  // 업로드 동의/비동의
  const handleUploadConsentStatusClick = (
    nextUploadConsentStatus: Exclude<UploadConsentStatus, ''>,
  ) => {
    const nextConsentStatus =
      uploadConsentStatus === nextUploadConsentStatus ? '' : nextUploadConsentStatus;

    setValue('uploadConsentStatus', nextConsentStatus, { shouldValidate: true });
  };

  // 요청사항 입력값 반영
  const handleRequestContentChange = (nextRequestContent: string) => {
    setValue('requestContent', nextRequestContent, { shouldValidate: true });
  };

  // 폼 검증 후 예약 신청 양식 텍스트를 클립보드에 복사
  const handleCopyReservationForm = async () => {
    const isCurrentFormValid = await trigger();

    if (!isCurrentFormValid) {
      return false;
    }
    const reservationCopyText = createReservationCopyText(getValues());

    try {
      await navigator.clipboard.writeText(reservationCopyText);
      return true;
    } catch {
      return false;
    }
  };

  return {
    minimumDurationHours,
    maximumDurationHours,
    minPeople,
    maxPeople,
    placeKeyword,
    placeOptions,
    durationHours,
    peopleCount,
    scheduleSelections,
    uploadConsentStatus,
    isDatePickerBottomDrawerOpen: activeSchedulePicker?.schedulePickerType === 'date',
    isTimePickerBottomDrawerOpen: activeSchedulePicker?.schedulePickerType === 'time',
    activeScheduleChoiceKey,
    requestContent,
    requestContentErrorMessage,
    isCopyDisabled: !isValid,
    handlePlaceKeywordChange,
    handlePlaceBlur,
    handleDurationHoursStep,
    handlePeopleCountStep,
    handleUploadConsentStatusClick,
    handleSchedulePickerOpen,
    handleSchedulePickerOpenChange,
    handleScheduleSelection,
    handleRequestContentChange,
    handleCopyReservationForm,
  };
};

export type ReservationCopyFormModel = ReturnType<typeof useReservationCopyForm>;
