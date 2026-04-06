'use client';

import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { usePlaceSearchField } from '@/hooks/usePlaceSearchField';
import createReservationCopyFormSchema from './useReservationCopySchema';
import createReservationCopyText from './useReservationCopyText';
import {
  DURATION_STEP_HOURS,
  MINIMUM_PEOPLE_COUNT,
  PEOPLE_COUNT_STEP,
  REQUEST_CONTENT_MAX_LENGTH,
  SCHEDULE_CHOICE_KEYS,
  createInitialScheduleSelections,
  type ReservationApplicant,
  type ReservationCopyFormInput,
  type ScheduleChoiceKey,
  type SchedulePickerType,
  type ScheduleSelectionValue,
  type UploadConsentStatus,
} from './reservationCopyFormShared';

// 일정 picker 관련
type UseReservationCopyFormProps = {
  applicant: ReservationApplicant;
  minimumDurationHours?: number;
  maxPeople?: number;
};

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
const useReservationCopyForm = ({
  applicant,
  minimumDurationHours = 1,
  maxPeople = 15,
}: UseReservationCopyFormProps) => {
  const maximumDurationHours = minimumDurationHours + 1;
  const minimumPeopleCount = MINIMUM_PEOPLE_COUNT;
  const initialScheduleSelections = createInitialScheduleSelections();
  const [isCopyPending, setIsCopyPending] = useState(false);

  const defaultReservationCopyFormValue: ReservationCopyFormInput = {
    placeId: '',
    placeKeyword: '',
    durationHours: minimumDurationHours,
    peopleCount: minimumPeopleCount,
    schedules: initialScheduleSelections,
    uploadConsentStatus: '',
    requestContent: '',
  };

  const reservationCopyFormSchema = useMemo(
    () =>
      createReservationCopyFormSchema({
        minimumDurationHours,
        maximumDurationHours,
        minPeople: minimumPeopleCount,
        maxPeople,
      }),
    [minimumDurationHours, maximumDurationHours, minimumPeopleCount, maxPeople],
  );

  const {
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors: formErrors },
  } = useForm<ReservationCopyFormInput>({
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

  // 촬영 시간 증감
  const handleDurationHoursStep = {
    decrease: () => {
      const currentDurationHours = getValues('durationHours');
      const nextDurationHours = Number(
        Math.min(
          maximumDurationHours,
          Math.max(minimumDurationHours, currentDurationHours - DURATION_STEP_HOURS),
        ).toFixed(1),
      );

      setValue('durationHours', nextDurationHours, { shouldValidate: true });
    },
    increase: () => {
      const currentDurationHours = getValues('durationHours');
      const nextDurationHours = Number(
        Math.min(
          maximumDurationHours,
          Math.max(minimumDurationHours, currentDurationHours + DURATION_STEP_HOURS),
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
        maxPeople,
        Math.max(minimumPeopleCount, currentPeopleCount - PEOPLE_COUNT_STEP),
      );

      setValue('peopleCount', nextPeopleCount, { shouldValidate: true });
    },
    increase: () => {
      const currentPeopleCount = getValues('peopleCount');
      const nextPeopleCount = Math.min(
        maxPeople,
        Math.max(minimumPeopleCount, currentPeopleCount + PEOPLE_COUNT_STEP),
      );

      setValue('peopleCount', nextPeopleCount, { shouldValidate: true });
    },
  };

  // 업로드 동의/비동의
  const handleUploadConsentStatusClick = (
    nextUploadConsentStatus: Exclude<UploadConsentStatus, ''>,
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
    const reservationCopyText = createReservationCopyText({
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
    SCHEDULE_CHOICE_KEYS.flatMap((scheduleChoiceKey) => {
      const scheduleFieldError = formErrors.schedules?.[scheduleChoiceKey];

      return [
        getFieldErrorMessage(scheduleFieldError?.message),
        getFieldErrorMessage(scheduleFieldError?.date?.message),
        getFieldErrorMessage(scheduleFieldError?.time?.message),
      ];
    }).find((fieldErrorMessage) => fieldErrorMessage.length > 0) ?? '';

  // 뷰에 필요한 값과 에러 메시지, 뷰 상태, 폼 입력값 제한 조건
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
  };

  // 폼 입력값 제한 조건
  const limits = {
    minimumDurationHours,
    maximumDurationHours,
    minimumPeopleCount,
    maxPeople,
    requestContentMaxLength: REQUEST_CONTENT_MAX_LENGTH,
  };

  // 뷰에서 사용할 액션
  const actions = {
    handlePlaceKeywordChange,
    handlePlaceBlur,
    handleDurationHoursStep,
    handlePeopleCountStep,
    handleUploadConsentStatusClick,
    ...schedulePicker.actions,
    handleRequestContentChange,
    handleCopyReservationForm,
  };

  return {
    values,
    errors,
    viewState,
    limits,
    actions,
  };
};

export type ReservationCopyFormModel = ReturnType<typeof useReservationCopyForm>;

export default useReservationCopyForm;
