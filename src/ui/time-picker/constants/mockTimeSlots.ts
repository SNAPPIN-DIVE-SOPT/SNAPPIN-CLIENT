import type { TimeSlotSection } from '../TimePicker';

//TODO: api 연동 후 삭제

export const MOCK_TIME_SLOTS: TimeSlotSection[] = [
  {
    label: '오전',
    slots: [
      { time: '06:00', disabled: true },
      { time: '06:30', disabled: true },
      { time: '07:00', disabled: false },
      { time: '07:30', disabled: false },
      { time: '08:00', disabled: true },
      { time: '08:30', disabled: false },
      { time: '09:00', disabled: false },
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
      { time: '13:30', disabled: true },
      { time: '14:00', disabled: false },
      { time: '14:30', disabled: false },
      { time: '15:00', disabled: false },
      { time: '15:30', disabled: false },
      { time: '16:00', disabled: false },
      { time: '16:30', disabled: false },
      { time: '17:00', disabled: true },
      { time: '17:30', disabled: false },
    ],
  },
];
