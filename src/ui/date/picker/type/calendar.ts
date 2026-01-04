export type CalendarCell =
  | { kind: 'empty'; key: string }
  | {
      kind: 'day';
      key: string;
      day: number;
      iso: string;
      isDisabled: boolean;
    };

export type DayAvailability = {
  date: string;
  isDisabled: boolean;
};

export type DatePickerVariant = 'reservation' | 'birthday';
