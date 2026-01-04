import { DayAvailability } from '@/ui/date/picker/type/calendar';

export const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const JANUARY_AVAILABILITY_MOCK: DayAvailability[] = [
  { date: '2026-01-01', isDisabled: false },
  { date: '2026-01-02', isDisabled: false },
  { date: '2026-01-03', isDisabled: false },
  { date: '2026-01-04', isDisabled: false },

  { date: '2026-01-05', isDisabled: true }, // 예약 불가
  { date: '2026-01-06', isDisabled: false },
  { date: '2026-01-07', isDisabled: false },
  { date: '2026-01-08', isDisabled: false },
  { date: '2026-01-09', isDisabled: false },
  { date: '2026-01-10', isDisabled: false },
  { date: '2026-01-11', isDisabled: false },

  { date: '2026-01-12', isDisabled: true }, // 예약 불가
  { date: '2026-01-13', isDisabled: false },
  { date: '2026-01-14', isDisabled: false },
  { date: '2026-01-15', isDisabled: false },
  { date: '2026-01-16', isDisabled: false },
  { date: '2026-01-17', isDisabled: false },
  { date: '2026-01-18', isDisabled: false },
  { date: '2026-01-19', isDisabled: false },

  { date: '2026-01-20', isDisabled: true }, // 예약 불가
  { date: '2026-01-21', isDisabled: false },
  { date: '2026-01-22', isDisabled: false },
  { date: '2026-01-23', isDisabled: false },
  { date: '2026-01-24', isDisabled: false },
  { date: '2026-01-25', isDisabled: false },
  { date: '2026-01-26', isDisabled: false },
  { date: '2026-01-27', isDisabled: false },
  { date: '2026-01-28', isDisabled: false },
  { date: '2026-01-29', isDisabled: false },
  { date: '2026-01-30', isDisabled: false },
  { date: '2026-01-31', isDisabled: false },
];
