import {
  BottomDrawer,
  DatePicker,
  DrawerDescription,
  DrawerTitle,
} from '@snappin/design-system';
import { TimePicker } from '@/ui/time-picker';
import { type ReservationCopyFormModel } from '../../hooks';
import RESERVATION_TIME_PICKER_MOCK from '../../mock/reservationTimePicker.mock';

type SchedulePickerDrawersProps = {
  reservationCopyFormModel: Pick<
    ReservationCopyFormModel,
    | 'isDatePickerBottomDrawerOpen'
    | 'isTimePickerBottomDrawerOpen'
    | 'handleSchedulePickerOpenChange'
    | 'activeScheduleChoiceKey'
    | 'scheduleSelections'
    | 'handleScheduleSelection'
  >;
};

export default function SchedulePickerDrawers({
  reservationCopyFormModel,
}: SchedulePickerDrawersProps) {
  const {
    isDatePickerBottomDrawerOpen,
    isTimePickerBottomDrawerOpen,
    handleSchedulePickerOpenChange,
    activeScheduleChoiceKey,
    scheduleSelections,
    handleScheduleSelection,
  } = reservationCopyFormModel;

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
            sections={RESERVATION_TIME_PICKER_MOCK}
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
