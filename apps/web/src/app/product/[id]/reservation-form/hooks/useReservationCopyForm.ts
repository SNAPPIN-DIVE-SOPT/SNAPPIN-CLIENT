'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { usePlaceSearchField } from '@/hooks/usePlaceSearchField';
import {
  DURATION_HOURS,
  PEOPLE_COUNT,
  SCHEDULE_CHOICES,
  reservationCopyFormSchema,
  type ReservationCopyFormInput,
  type ReservationCopyFormOutput,
} from '../constants';
import type {
  ReservationApplicant,
  ScheduleChoiceKey,
  ScheduleSelectionValue,
} from '../types/copy';
import {
  createCopyText,
  createDefaultReservationCopyFormValue,
  hasSelectableScheduleChoice,
} from '../utils';

// 일정 picker 관련
type UseReservationCopyFormProps = {
  applicant: ReservationApplicant;
};

type SchedulePickerType = 'date' | 'time';

type ActiveSchedulePicker = {
  scheduleChoiceKey: ScheduleChoiceKey;
  schedulePickerType: SchedulePickerType;
};

type UseSchedulePickerProps = {
  handleScheduleChange: (
    scheduleChoiceKey: ScheduleChoiceKey,
    scheduleSelectionChangeField: keyof ScheduleSelectionValue,
    scheduleSelectionValue: string,
  ) => void;
};

const getFieldErrorMessage = (errorMessage: unknown) => {
  return typeof errorMessage === 'string' ? errorMessage : '';
};

// 일정 picker 바텀시트 상태 관리
const useSchedulePicker = ({ handleScheduleChange }: UseSchedulePickerProps) => {
  const [activeSchedulePicker, setActiveSchedulePicker] = useState<ActiveSchedulePicker | null>(
    null,
  );

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

  // 바텀시트 닫기
  const handleScheduleSelection = (
    scheduleSelectionChangeField: keyof ScheduleSelectionValue,
    scheduleSelectionValue: string,
  ) => {
    const activeScheduleChoiceKey = activeSchedulePicker?.scheduleChoiceKey;

    if (!activeScheduleChoiceKey) {
      handleSchedulePickerClose();
      return;
    }

    handleScheduleChange(
      activeScheduleChoiceKey,
      scheduleSelectionChangeField,
      scheduleSelectionValue,
    );

    handleSchedulePickerClose();
  };

  const handleSchedulePickerOpenChange = (nextOpenStatus: boolean) => {
    if (!nextOpenStatus) {
      handleSchedulePickerClose();
    }
  };

  return {
    viewState: {
      activeScheduleChoiceKey: activeSchedulePicker?.scheduleChoiceKey ?? null,
      isDatePickerBottomDrawerOpen: activeSchedulePicker?.schedulePickerType === 'date',
      isTimePickerBottomDrawerOpen: activeSchedulePicker?.schedulePickerType === 'time',
    },
    actions: {
      handleSchedulePickerOpen,
      handleSchedulePickerOpenChange,
      handleScheduleSelection,
    },
  };
};

// 예약 신청 양식 복사 훅
const useReservationCopyForm = ({ applicant }: UseReservationCopyFormProps) => {
  const [isCopyPending, setIsCopyPending] = useState(false);

  const defaultReservationCopyFormValue: ReservationCopyFormInput =
    createDefaultReservationCopyFormValue();

  const {
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors: formErrors },
  } = useForm<ReservationCopyFormInput, undefined, ReservationCopyFormOutput>({
    resolver: zodResolver(reservationCopyFormSchema),
    defaultValues: defaultReservationCopyFormValue,
    mode: 'onChange',
  });

  // form 값이 변경될 때마다 최신 값을 가져옴
  const watchedReservationCopyFormValue = useWatch({ control }) as ReservationCopyFormInput;
  const {
    placeId,
    placeKeyword,
    durationHours,
    peopleCount,
    schedules: scheduleSelections,
    uploadConsentStatus,
    requestContent,
  } = watchedReservationCopyFormValue;
  const isCopyDisabled = !reservationCopyFormSchema.safeParse(watchedReservationCopyFormValue)
    .success;

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

  const schedulePicker = useSchedulePicker({
    handleScheduleChange: (
      scheduleChoiceKey,
      scheduleSelectionChangeField,
      scheduleSelectionValue,
    ) => {
      setValue(
        `schedules.${scheduleChoiceKey}.${scheduleSelectionChangeField}`,
        scheduleSelectionValue,
        { shouldValidate: true },
      );
    },
  });

  // 일정 선택 바텀시트 오픈
  const handleSchedulePickerOpen = (
    scheduleChoiceKey: ScheduleChoiceKey,
    schedulePickerType: SchedulePickerType,
  ) => {
    if (!hasSelectableScheduleChoice(scheduleChoiceKey, scheduleSelections)) {
      return;
    }

    schedulePicker.actions.handleSchedulePickerOpen(scheduleChoiceKey, schedulePickerType);
  };

  // 촬영 시간 증감
  const handleDurationHoursStep = {
    decrease: () => {
      const currentDurationHours = getValues('durationHours');
      const nextDurationHours = Number(
        Math.min(
          DURATION_HOURS.MAX,
          Math.max(DURATION_HOURS.MIN, currentDurationHours - DURATION_HOURS.STEP),
        ).toFixed(1),
      );

      setValue('durationHours', nextDurationHours, { shouldValidate: true });
    },
    increase: () => {
      const currentDurationHours = getValues('durationHours');
      const nextDurationHours = Number(
        Math.min(
          DURATION_HOURS.MAX,
          Math.max(DURATION_HOURS.MIN, currentDurationHours + DURATION_HOURS.STEP),
        ).toFixed(1),
      );

      setValue('durationHours', nextDurationHours, { shouldValidate: true });
    },
  };

  // 촬영 인원 증감
  const handlePeopleCountStep = {
    decrease: () => {
      const currentPeopleCount = getValues('peopleCount');
      const nextPeopleCount = Math.min(
        PEOPLE_COUNT.MAX,
        Math.max(PEOPLE_COUNT.MIN, currentPeopleCount - PEOPLE_COUNT.STEP),
      );

      setValue('peopleCount', nextPeopleCount, { shouldValidate: true });
    },
    increase: () => {
      const currentPeopleCount = getValues('peopleCount');
      const nextPeopleCount = Math.min(
        PEOPLE_COUNT.MAX,
        Math.max(PEOPLE_COUNT.MIN, currentPeopleCount + PEOPLE_COUNT.STEP),
      );

      setValue('peopleCount', nextPeopleCount, { shouldValidate: true });
    },
  };

  // 업로드 동의/비동의
  const handleUploadConsentStatusClick = (
    nextUploadConsentStatus: Exclude<ReservationCopyFormInput['uploadConsentStatus'], ''>,
  ) => {
    const nextUploadConsentValue =
      uploadConsentStatus === nextUploadConsentStatus ? '' : nextUploadConsentStatus;

    setValue('uploadConsentStatus', nextUploadConsentValue, { shouldValidate: true });
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
    const reservationCopyText = createCopyText({
      applicant,
      reservationCopyFormValue: getValues(),
    });

    try {
      setIsCopyPending(true);
      await navigator.clipboard.writeText(reservationCopyText);
      return true;
    } catch {
      return false;
    } finally {
      setIsCopyPending(false);
    }
  };

  // schedules 에러를 한줄 메시지로
  const scheduleErrorMessage =
    SCHEDULE_CHOICES.flatMap(({ key }) => {
      const scheduleFieldError = formErrors.schedules?.[key];

      return [
        getFieldErrorMessage(scheduleFieldError?.message),
        getFieldErrorMessage(scheduleFieldError?.date?.message),
        getFieldErrorMessage(scheduleFieldError?.time?.message),
      ];
    }).find((fieldErrorMessage) => fieldErrorMessage.length > 0) ?? '';

  // 뷰에 필요한 값과 에러 메시지, 뷰 상태
  const values = {
    placeKeyword,
    durationHours,
    peopleCount,
    scheduleSelections,
    uploadConsentStatus,
    requestContent,
  };

  // 각 에러 메시지
  const errors = {
    place:
      getFieldErrorMessage(formErrors.placeId?.message) ||
      getFieldErrorMessage(formErrors.placeKeyword?.message),
    schedules: scheduleErrorMessage,
    uploadConsentStatus: getFieldErrorMessage(formErrors.uploadConsentStatus?.message),
    requestContent: getFieldErrorMessage(formErrors.requestContent?.message),
  };

  // 장소 옵션, 일정 picker 바텀시트 상태, 복사 중 상태
  const viewState = {
    placeOptions,
    ...schedulePicker.viewState,
    isCopyPending,
    isCopyDisabled,
  };

  // 뷰에서 사용할 액션
  const actions = {
    handlePlaceKeywordChange,
    handlePlaceBlur,
    handleDurationHoursStep,
    handlePeopleCountStep,
    handleUploadConsentStatusClick,
    handleSchedulePickerOpen,
    handleSchedulePickerOpenChange: schedulePicker.actions.handleSchedulePickerOpenChange,
    handleScheduleSelection: schedulePicker.actions.handleScheduleSelection,
    handleRequestContentChange,
    handleCopyReservationForm,
  };

  return {
    values,
    errors,
    viewState,
    actions,
  };
};

export type ReservationCopyFormModel = ReturnType<typeof useReservationCopyForm>;

export default useReservationCopyForm;
