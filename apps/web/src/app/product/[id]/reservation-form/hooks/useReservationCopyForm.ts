'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import {
  DURATION_HOURS,
  PEOPLE_COUNT,
  SCHEDULE_CHOICES,
  reservationCopyFormSchema,
  type ReservationCopyFormInput,
  type ReservationCopyFormOutput,
} from '@/app/product/[id]/reservation-form/constants';
import useReservationCopyAction from '@/app/product/[id]/reservation-form/hooks/useReservationCopyAction';
import useReservationPlaceField from '@/app/product/[id]/reservation-form/hooks/useReservationPlaceField';
import useReservationSchedulePicker from '@/app/product/[id]/reservation-form/hooks/useReservationSchedulePicker';
import type { ReservationApplicant } from '@/app/product/[id]/reservation-form/types/copy';
import { createDefaultReservationCopyFormValue } from '@/app/product/[id]/reservation-form/utils';

type UseReservationCopyFormProps = {
  applicant: ReservationApplicant;
};

const getFieldErrorMessage = (errorMessage: unknown) => {
  return typeof errorMessage === 'string' ? errorMessage : '';
};

// 예약 신청 양식 폼 훅
const useReservationCopyForm = ({ applicant }: UseReservationCopyFormProps) => {
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
  const values = useWatch({ control }) as ReservationCopyFormInput;
  const isCopyDisabled = !reservationCopyFormSchema.safeParse(values).success;

  const { placeOptions, handlePlaceKeywordChange, handlePlaceBlur } = useReservationPlaceField({
    values,
    setValue,
  });

  const schedulePicker = useReservationSchedulePicker({
    values,
    setValue,
  });

  const { isCopyPending, handleCopyReservationForm } = useReservationCopyAction({
    applicant,
    getValues,
    trigger,
  });

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
      values.uploadConsentStatus === nextUploadConsentStatus ? '' : nextUploadConsentStatus;

    setValue('uploadConsentStatus', nextUploadConsentValue, { shouldValidate: true });
  };

  // 요청사항 입력값 반영
  const handleRequestContentChange = (nextRequestContent: string) => {
    setValue('requestContent', nextRequestContent, { shouldValidate: true });
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
    handleSchedulePickerOpen: schedulePicker.actions.handleSchedulePickerOpen,
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
