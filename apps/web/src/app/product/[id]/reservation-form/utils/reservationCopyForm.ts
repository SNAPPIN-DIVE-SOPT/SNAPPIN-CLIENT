import {
  DURATION_HOURS,
  PEOPLE_COUNT,
  SCHEDULE_CHOICE_KEY,
  type ScheduleChoiceKey,
} from '@/app/product/[id]/reservation-form/constants/reservationCopyForm';
import type {
  ReservationCopyFormValue,
  ScheduleSelections,
  ScheduleSelectionValue,
} from '@/app/product/[id]/reservation-form/types/copy';

/**
 * 날짜와 시간이 모두 선택되었는지 확인합니다.
 * @param scheduleSelection 하나의 지망에 대한 날짜/시간 선택 값
 * @returns 날짜와 시간이 모두 채워졌으면 true
 * @example hasCompletedSchedule({ date: '2024-01-15', time: '14:00' }); // true
 */
export const hasCompletedSchedule = (scheduleSelection: ScheduleSelectionValue) => {
  return scheduleSelection.date.length > 0 && scheduleSelection.time.length > 0;
};

/**
 * 이전 지망들이 전부 완료되어 있어야 현재 지망을 선택할 수 있는지 확인합니다.
 * @param scheduleChoiceKey 선택하려는 지망 키
 * @param scheduleSelections 전체 지망별 날짜/시간 선택 값
 * @returns 현재 지망을 선택 가능하면 true (1지망은 항상 true)
 * @example hasSelectableScheduleChoice('SECOND', scheduleSelections);
 */
export const hasSelectableScheduleChoice = (
  scheduleChoiceKey: ScheduleChoiceKey,
  scheduleSelections: ScheduleSelections,
) => {
  const scheduleChoiceIndex = SCHEDULE_CHOICE_KEY.findIndex((key) => {
    return key === scheduleChoiceKey;
  });

  if (scheduleChoiceIndex <= 0) {
    return true;
  }

  return SCHEDULE_CHOICE_KEY.slice(0, scheduleChoiceIndex).every((key) => {
    return hasCompletedSchedule(scheduleSelections[key]);
  });
};

const createInitialScheduleSelections = (): ScheduleSelections => {
  return Object.fromEntries(
    SCHEDULE_CHOICE_KEY.map((key) => {
      return [key, { date: '', time: '' }];
    }),
  ) as ScheduleSelections;
};

type CreateDefaultReservationCopyFormValueProps = {
  minDurationHours?: number;
  minPeopleCount?: number;
};

/**
 * 예약 복사 폼의 초기값을 생성합니다.
 * @param props 초기값에 쓸 최소 촬영 시간/인원 (선택, 기본값은 상수 참고)
 * @param props.minDurationHours 초기 촬영 시간 (기본값: DURATION_HOURS.DEFAULT_MIN)
 * @param props.minPeopleCount 초기 촬영 인원 (기본값: PEOPLE_COUNT.DEFAULT_MIN)
 * @returns 예약 복사 폼 초기값
 * @example const initialValue = createDefaultReservationCopyFormValue();
 */
export const createDefaultReservationCopyFormValue = ({
  minDurationHours = DURATION_HOURS.DEFAULT_MIN,
  minPeopleCount = PEOPLE_COUNT.DEFAULT_MIN,
}: CreateDefaultReservationCopyFormValueProps = {}): ReservationCopyFormValue => {
  return {
    placeId: '',
    placeKeyword: '',
    durationHours: minDurationHours,
    peopleCount: minPeopleCount,
    schedules: createInitialScheduleSelections(),
    uploadConsentStatus: undefined,
    requestContent: '',
  };
};

/**
 * 촬영 시간을 표시용 라벨로 변환합니다.
 * @param durationHours 촬영 시간 (시간 단위, 소수점 가능)
 * @returns 표시용 라벨
 * @example createDurationLabel(1.5); // '1.5시간'
 */
export const createDurationLabel = (durationHours: number) => {
  return `${Number.isInteger(durationHours) ? durationHours : durationHours.toFixed(1)}시간`;
};

/**
 * 지망 날짜를 표시용 라벨로 변환합니다.
 * @param scheduleDate YYYY-MM-DD 형식의 날짜 문자열, 미선택 시 빈 문자열
 * @returns 표시용 라벨
 * @example createScheduleDateLabel('2024-01-15'); // '2024.01.15.'
 */
export const createScheduleDateLabel = (scheduleDate: string) => {
  return scheduleDate.length > 0 ? `${scheduleDate.replaceAll('-', '.')}.` : '날짜 선택';
};

/**
 * 지망 시간을 표시용 라벨로 변환합니다.
 * @param scheduleTime HH:mm 형식의 시간 문자열, 미선택 시 빈 문자열
 * @returns 표시용 라벨
 * @example createScheduleTimeLabel('14:30'); // '오후 02:30'
 */
export const createScheduleTimeLabel = (scheduleTime: string) => {
  const [hourValueString = '0', minuteValueString = '00'] = scheduleTime.split(':');
  const hourValue = Number(hourValueString);
  const isMorning = hourValue < 12;
  const hourValueForDisplay = hourValue % 12 === 0 ? 12 : hourValue % 12;

  return scheduleTime.length > 0
    ? `${isMorning ? '오전' : '오후'} ${String(hourValueForDisplay).padStart(2, '0')}:${minuteValueString}`
    : '시간 선택';
};
