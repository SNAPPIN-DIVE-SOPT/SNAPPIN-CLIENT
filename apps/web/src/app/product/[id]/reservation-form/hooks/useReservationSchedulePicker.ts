'use client';

import { useState } from 'react';
import { type UseFormSetValue } from 'react-hook-form';
import type { ReservationCopyFormInput } from '@/app/product/[id]/reservation-form/constants';
import type {
  ScheduleChoiceKey,
  ScheduleSelectionValue,
} from '@/app/product/[id]/reservation-form/types/copy';
import { hasSelectableScheduleChoice } from '@/app/product/[id]/reservation-form/utils';

type SchedulePickerType = 'date' | 'time';

type ActiveSchedulePicker = {
  scheduleChoiceKey: ScheduleChoiceKey;
  schedulePickerType: SchedulePickerType;
};

type UseReservationSchedulePickerProps = {
  values: ReservationCopyFormInput;
  setValue: UseFormSetValue<ReservationCopyFormInput>;
};

// 예약 신청 양식의 촬영 일정 선택 훅
const useReservationSchedulePicker = ({ values, setValue }: UseReservationSchedulePickerProps) => {
  const [activeSchedulePicker, setActiveSchedulePicker] = useState<ActiveSchedulePicker | null>(
    null,
  );

  const handleSchedulePickerOpen = (
    scheduleChoiceKey: ScheduleChoiceKey,
    schedulePickerType: SchedulePickerType,
  ) => {
    if (!hasSelectableScheduleChoice(scheduleChoiceKey, values.schedules)) {
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

  const handleScheduleSelection = (
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

export default useReservationSchedulePicker;
