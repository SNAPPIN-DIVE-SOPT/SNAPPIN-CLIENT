'use client';

import { useState } from 'react';
import { type UseFormSetValue, type UseFormTrigger } from 'react-hook-form';
import type {
  ReservationCopyFormInput,
  ScheduleChoiceKey,
} from '@/app/product/[id]/reservation-form/constants';
import type { ScheduleSelectionValue } from '@/app/product/[id]/reservation-form/types/copy';
import { hasSelectableScheduleChoice } from '@/app/product/[id]/reservation-form/utils';

type SchedulePickerType = 'date' | 'time';

type ActiveSchedulePicker = {
  scheduleChoiceKey: ScheduleChoiceKey;
  schedulePickerType: SchedulePickerType;
};

type UseReservationSchedulePickerProps = {
  formData: ReservationCopyFormInput;
  setValue: UseFormSetValue<ReservationCopyFormInput>;
  trigger: UseFormTrigger<ReservationCopyFormInput>;
};

// 예약 신청 양식의 촬영 일정 선택 훅
export default function useReservationSchedulePicker({
  formData,
  setValue,
  trigger,
}: UseReservationSchedulePickerProps) {
  const [activeSchedulePicker, setActiveSchedulePicker] = useState<ActiveSchedulePicker | null>(
    null,
  );

  const handleSchedulePickerOpen = (
    scheduleChoiceKey: ScheduleChoiceKey,
    schedulePickerType: SchedulePickerType,
  ) => {
    if (!hasSelectableScheduleChoice(scheduleChoiceKey, formData.schedules)) {
      return;
    }

    setActiveSchedulePicker({
      scheduleChoiceKey,
      schedulePickerType,
    });
  };

  const handleSchedulePickerClose = () => {
    setActiveSchedulePicker(null);
  };

  const handleScheduleSelection = async (
    scheduleSelectionChangeField: keyof ScheduleSelectionValue,
    scheduleSelectionValue: string,
  ) => {
    const activeScheduleChoiceKey = activeSchedulePicker?.scheduleChoiceKey;

    if (!activeScheduleChoiceKey) {
      handleSchedulePickerClose();
      return;
    }

    setValue(
      `schedules.${activeScheduleChoiceKey}.${scheduleSelectionChangeField}`,
      scheduleSelectionValue,
      { shouldValidate: true },
    );
    await trigger('schedules');

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
}
