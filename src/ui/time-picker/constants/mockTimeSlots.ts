import { TimeSlotSection } from '../types/timeSlot';

export const MOCK_TIME_SLOTS: TimeSlotSection[] = [
  {
    label: '오전',
    slots: [
      { time: '09:00', disabled: true },
      { time: '09:30', disabled: false },
      { time: '10:00', disabled: false },
      { time: '10:30', disabled: false },
      { time: '11:00', disabled: false },
      { time: '11:30', disabled: false },
    ],
  },
  {
    label: '오후',
    slots: [
      { time: '12:00', disabled: false },
      { time: '12:30', disabled: false },
      { time: '13:00', disabled: false },
      { time: '13:30', disabled: false },
      { time: '14:00', disabled: false },
      { time: '14:30', disabled: true },
    ],
  },
];
