import type { TimeSlotSection } from '../TimePicker';

//TODO: api 연동 후 삭제

export const MOCK_TIME_SLOTS: TimeSlotSection[] = [
  {
    label: '오전',
    slots: [
      { time: '06:00', isAvailable: true },
      { time: '06:30', isAvailable: true },
      { time: '07:00', isAvailable: false },
      { time: '07:30', isAvailable: false },
      { time: '08:00', isAvailable: true },
      { time: '08:30', isAvailable: false },
      { time: '09:00', isAvailable: false },
      { time: '09:30', isAvailable: false },
      { time: '10:00', isAvailable: false },
      { time: '10:30', isAvailable: false },
      { time: '11:00', isAvailable: false },
      { time: '11:30', isAvailable: false },
    ],
  },
  {
    label: '오후',
    slots: [
      { time: '12:00', isAvailable: false },
      { time: '12:30', isAvailable: false },
      { time: '13:00', isAvailable: false },
      { time: '13:30', isAvailable: true },
      { time: '14:00', isAvailable: false },
      { time: '14:30', isAvailable: false },
      { time: '15:00', isAvailable: false },
      { time: '15:30', isAvailable: false },
      { time: '16:00', isAvailable: false },
      { time: '16:30', isAvailable: false },
      { time: '17:00', isAvailable: true },
      { time: '17:30', isAvailable: false },
    ],
  },
];
