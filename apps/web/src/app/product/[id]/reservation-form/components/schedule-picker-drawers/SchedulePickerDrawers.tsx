import { BottomDrawer, DatePicker, DrawerDescription, DrawerTitle } from '@snappin/design-system';
import { PRIMARY_SCHEDULE_CHOICE_KEY, SCHEDULE_CHOICES } from '@/app/product/[id]/reservation-form/constants';
import { type ReservationCopyFormModel } from '@/app/product/[id]/reservation-form/hooks';
import RESERVATION_TIME_PICKER_MOCK from '@/app/product/[id]/reservation-form/mock/reservationTimePicker.mock';
import { hasCompletedSchedule } from '@/app/product/[id]/reservation-form/utils';
import { TimePicker } from '@/ui/time-picker';

type SchedulePickerDrawersProps = {
  reservationCopyFormModel: Pick<ReservationCopyFormModel, 'values' | 'viewState' | 'actions'>;
};

export default function SchedulePickerDrawers({
  reservationCopyFormModel,
}: SchedulePickerDrawersProps) {
  const {
    values: { schedules: scheduleSelections },
    viewState: {
      isDatePickerBottomDrawerOpen,
      isTimePickerBottomDrawerOpen,
      activeScheduleChoiceKey,
    },
    actions: { handleSchedulePickerOpenChange, handleScheduleSelection },
  } = reservationCopyFormModel;
  const activeScheduleSelection =
    activeScheduleChoiceKey && scheduleSelections[activeScheduleChoiceKey];
  const isAdditionalScheduleChoiceActive =
    activeScheduleChoiceKey !== null && activeScheduleChoiceKey !== PRIMARY_SCHEDULE_CHOICE_KEY;
  const activeScheduleChoiceIndex = activeScheduleChoiceKey
    ? SCHEDULE_CHOICES.findIndex(({ key }) => {
        return key === activeScheduleChoiceKey;
      })
    : -1;

  // 앞선 지망들 중복
  const previousScheduleSelections =
    activeScheduleChoiceIndex > 0
      ? SCHEDULE_CHOICES.slice(0, activeScheduleChoiceIndex)
          .map(({ key }) => {
            return scheduleSelections[key];
          })
          .filter(hasCompletedSchedule)
      : [];

  // 동일 날짜 비활성화
  const shouldBlockPreviousDates =
    isAdditionalScheduleChoiceActive && Boolean(activeScheduleSelection?.time);
  const blockedDates = shouldBlockPreviousDates
    ? previousScheduleSelections
        .filter((scheduleSelection) => {
          return scheduleSelection.time === activeScheduleSelection?.time;
        })
        .map((scheduleSelection) => {
          return scheduleSelection.date;
        })
    : [];

  // 동일 시간 비활성화
  const shouldBlockPreviousTimes =
    isAdditionalScheduleChoiceActive && Boolean(activeScheduleSelection?.date);
  const blockedTimes = shouldBlockPreviousTimes
    ? previousScheduleSelections
        .filter((scheduleSelection) => {
          return scheduleSelection.date === activeScheduleSelection?.date;
        })
        .map((scheduleSelection) => {
          return scheduleSelection.time;
        })
    : [];

  const reservationTimePickerSections = RESERVATION_TIME_PICKER_MOCK.map((section) => {
    return {
      ...section,
      slots: (section.slots ?? []).map((slot) => {
        return {
          ...slot,
          isAvailable: slot.isAvailable && !blockedTimes.includes(slot.time ?? ''),
        };
      }),
    };
  });

  return (
    <>
      {/* 촬영 날짜 바텀 시트 */}
      <BottomDrawer
        isOpen={isDatePickerBottomDrawerOpen}
        handleOpenChange={handleSchedulePickerOpenChange}
        className='max-h-[92dvh]!'
      >
        <DrawerTitle className='sr-only'>희망 날짜 선택</DrawerTitle>
        <DrawerDescription className='sr-only'>
          희망 촬영 날짜를 선택하는 바텀 드로어입니다.
        </DrawerDescription>
        <BottomDrawer.Section className='pb-[2rem]'>
          <BottomDrawer.Row className='px-[2rem]'>
            <BottomDrawer.Title className='py-[2rem]'>희망 날짜를 선택해 주세요</BottomDrawer.Title>
            <DatePicker
              selectedDate={
                activeScheduleChoiceKey
                  ? (scheduleSelections[activeScheduleChoiceKey]?.date ?? '')
                  : ''
              }
              closedDates={blockedDates}
              handleDateChangeAction={(scheduleDate) =>
                handleScheduleSelection('date', scheduleDate)
              }
            />
          </BottomDrawer.Row>
        </BottomDrawer.Section>
      </BottomDrawer>

      {/* 촬영 시간 바텀 시트 */}
      <BottomDrawer
        isOpen={isTimePickerBottomDrawerOpen}
        handleOpenChange={handleSchedulePickerOpenChange}
        className='max-h-[92dvh]!'
      >
        <DrawerTitle className='sr-only'>희망 시간 선택</DrawerTitle>
        <DrawerDescription className='sr-only'>
          희망 촬영 시간을 선택하는 바텀 드로어입니다.
        </DrawerDescription>
        <BottomDrawer.Section className='px-[2rem] pb-[2rem]'>
          <BottomDrawer.Title className='py-[2rem]'>
            촬영 시작 시간을 선택해 주세요
          </BottomDrawer.Title>
          <TimePicker
            sections={reservationTimePickerSections}
            value={
              activeScheduleChoiceKey
                ? (scheduleSelections[activeScheduleChoiceKey]?.time ?? '')
                : ''
            }
            handleChange={(scheduleTime) => handleScheduleSelection('time', scheduleTime)}
          />
        </BottomDrawer.Section>
      </BottomDrawer>
    </>
  );
}
