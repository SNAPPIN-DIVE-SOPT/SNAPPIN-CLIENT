import type { ProductAvailableTimeSectionResponse } from '@/swagger-api';

const createTimeValueFromMinutes = (timeMinutes: number) => {
  const hourValue = Math.floor(timeMinutes / 60);
  const minuteValue = timeMinutes % 60;
  return `${String(hourValue).padStart(2, '0')}:${String(minuteValue).padStart(2, '0')}`;
};

const RESERVATION_TIME_SLOT_MINUTES = Array.from({ length: 21 }, (_, slotIndex) => {
  return 9 * 60 + slotIndex * 30;
});

const RESERVATION_TIME_PICKER_MOCK: ProductAvailableTimeSectionResponse[] = [
  {
    label: 'am',
    slots: RESERVATION_TIME_SLOT_MINUTES.filter((timeMinutes) => timeMinutes < 12 * 60).map(
      (timeMinutes) => ({
        time: createTimeValueFromMinutes(timeMinutes),
        isAvailable: true,
      }),
    ),
  },
  {
    label: 'pm',
    slots: RESERVATION_TIME_SLOT_MINUTES.filter((timeMinutes) => timeMinutes >= 12 * 60).map(
      (timeMinutes) => ({
        time: createTimeValueFromMinutes(timeMinutes),
        isAvailable: true,
      }),
    ),
  },
];

export default RESERVATION_TIME_PICKER_MOCK;
