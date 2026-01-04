import { IconButton } from '@/ui';
import { IconKeyboardArrowLeft, IconKeyboardArrowRight } from '@/assets';
import { useMemo } from 'react';
import DateCell from '../DateCell';
import { CalendarCell, DatePickerVariant, DayAvailability } from '@/ui/date/picker/type/calendar';
import { compareISO, daysInMonth, pad2, toISO } from '@/ui/date/picker/utils/date';
import { useHandleDate } from '@/ui/date/picker/hooks/useHandleDate';
import { WEEKDAY_LABELS } from '@/ui/date/picker/constants/date';

const MAX_RESERVATION_MONTHS = 6;

type DatePickerProps = {
  variant: DatePickerVariant;

  selectedDate?: string; // YYYY-MM-DD
  handleChange?: (nextDate: string) => void;

  // reservation에서만 의미 있음 (birthday에서는 무시)
  minDate?: string;
  maxDate?: string;
  monthAvailability?: DayAvailability[];

  // 공통 옵션
  disablePastDates?: boolean;
};

export default function DatePicker({
  variant = 'reservation',
  selectedDate,
  handleChange,
  maxDate,
  minDate,
  disablePastDates = true,
  monthAvailability,
}: DatePickerProps) {
  const { viewMonth, handlePrevMonth, handleNextMonth } = useHandleDate(selectedDate);
  const todayISO = toISO(new Date());
  const headerText = `${viewMonth.getFullYear()}.${pad2(viewMonth.getMonth() + 1)}`;

  const availabilityMap = useMemo(() => {
    if (!monthAvailability) return undefined;
    return Object.fromEntries(monthAvailability.map((d) => [d.date, d.isDisabled])) as Record<
      string,
      boolean
    >;
  }, [monthAvailability]);

  const reservationBlockFromISO = useMemo(() => {
    if (variant !== 'reservation') return null;

    const now = new Date();
    const blockFrom = new Date(now.getFullYear(), now.getMonth() + MAX_RESERVATION_MONTHS, 1);
    return toISO(blockFrom); // YYYY-MM-01
  }, [variant]);

  const cells: CalendarCell[] = useMemo(() => {
    const y = viewMonth.getFullYear();
    const mIndex = viewMonth.getMonth();
    const totalDays = daysInMonth(viewMonth);
    const startDay = new Date(y, mIndex, 1).getDay(); // 0~6 (일~토)

    const list: CalendarCell[] = [];

    // 앞 빈칸
    for (let i = 0; i < startDay; i++) {
      list.push({ kind: 'empty', key: `e-pre-${y}-${mIndex}-${i}` });
    }

    // 날짜
    for (let day = 1; day <= totalDays; day++) {
      const iso = toISO(new Date(y, mIndex, day));

      // ✅ variant별 비활성화 규칙
      const isDisabled =
        variant === 'birthday'
          ? compareISO(iso, todayISO) > 0
          : (disablePastDates && compareISO(iso, todayISO) < 0) ||
            (!!minDate && compareISO(iso, minDate) < 0) ||
            (!!maxDate && compareISO(iso, maxDate) > 0) ||
            (!!reservationBlockFromISO && compareISO(iso, reservationBlockFromISO) >= 0) ||
            (availabilityMap?.[iso] ?? false);

      const isSelected = !!selectedDate && iso === selectedDate;

      list.push({
        kind: 'day',
        key: iso,
        day,
        iso,
        isDisabled,
        isSelected,
      });
    }

    // 뒤 빈칸: 7의 배수 맞추기
    const remainder = list.length % 7;
    if (remainder !== 0) {
      const fill = 7 - remainder;
      for (let i = 0; i < fill; i++) {
        list.push({ kind: 'empty', key: `e-post-${y}-${mIndex}-${i}` });
      }
    }

    return list;
  }, [
    viewMonth,
    variant,
    todayISO,
    disablePastDates,
    minDate,
    maxDate,
    reservationBlockFromISO,
    availabilityMap,
    selectedDate,
  ]);

  const handleSelectDate = (iso: string) => handleChange?.(iso);

  return (
    <div className='flex flex-col px-[2rem]'>
      {/* 이전, 다음 월 이동 */}
      <header className='flex flex-row items-center justify-between px-[1.6rem] py-[1.4rem]'>
        <IconButton className='text-black-7' onClick={handlePrevMonth}>
          <IconKeyboardArrowLeft />
        </IconButton>
        <span className='text-black-10 font-16-bd'>{headerText}</span>
        <IconButton className='text-black-7' onClick={handleNextMonth}>
          <IconKeyboardArrowRight />
        </IconButton>
      </header>

      {/* 디바이더 */}
      <div className='bg-black-3 mx-[1.6rem] h-[0.1rem]' />

      {/* 요일 */}
      <div className='flex flex-row items-center px-[1.6rem] py-[1.2rem]'>
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className='caption-12-md text-black-7 flex-1 py-[0.4rem] text-center'>
            {label}
          </span>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className='px-[1.6rem] pb-[1.6rem]'>
        <div className='justify-items-center" grid grid-cols-7 gap-y-[0.8rem]'>
          {cells.map((cell) =>
            cell.kind === 'day' ? (
              <div className={'flex justify-center'} key={cell.key}>
                <DateCell
                  key={cell.key}
                  value={String(cell.day)}
                  isDisabled={cell.isDisabled}
                  isSelected={cell.isSelected}
                  handleSelect={() => handleSelectDate(cell.iso)}
                />
              </div>
            ) : (
              <div key={cell.key} className='min-w-[3.2rem] py-[0.8rem]' />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
