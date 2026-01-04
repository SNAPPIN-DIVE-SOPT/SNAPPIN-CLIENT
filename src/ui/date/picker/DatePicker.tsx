'use client';

import { IconButton } from '@/ui';
import { IconKeyboardArrowLeft, IconKeyboardArrowRight } from '@/assets';
import { useMemo, useState } from 'react';
import DateCell from '../cell/DateCell';
import { CalendarCell, DatePickerVariant, DayAvailability } from '@/ui/date/picker/type/calendar';
import {
  buildPrefixCells,
  compareISO,
  daysInMonth,
  padNumber,
  startOfMonth,
  toISO,
} from '@/ui/date/picker/utils/date';
import { WEEKDAY_LABELS } from '@/ui/date/picker/constants/date';

const MAX_RESERVATION_MONTHS = 6;

type DatePickerProps = {
  variant: DatePickerVariant;

  // 오늘 날짜 (기본값: new Date())
  today?: Date;

  // 제어형 월 초기값
  viewDateMonth?: Date;
  // 제어형이 아닐 때 월 초기값
  defaultViewDateMonth?: Date;
  handleMonthChangeAction?: (nextMonth: Date) => void;
  // YYYY-MM-DD
  selectedDate?: string;
  handleDateChangeAction?: (nextDate: string) => void;

  minDate?: string;
  maxDate?: string;
  // 월별 날짜 활성화/비활성화 정보 (API 등에서 받아올 배열)
  monthAvailability?: DayAvailability[];

  // 공통 옵션
  disablePastDates?: boolean;
};

/**
 * 날짜 선택 컴포넌트
 * - reservation: 예약일 선택용 (기본값)
 * - birthday: 생일 선택용
 * - 제어형/비제어형 모두 지원
 * - 월별 날짜 활성화/비활성화 지원
 * - 예약 모드에서 최대 예약 가능 월 제한 지원
 * @param props DatePickerProps
 * @example
 * <DatePicker
 *   variant="reservation"
 *   selectedDate="2024-01-15"
 *   handleDateChange={(next) => console.log(next)}
 *   defaultViewMonth={new Date(2024, 0, 1)} // 2024년 1월
 *   minDate="2024-01-10"
 *   maxDate="2024-01-20"
 *   monthAvailability={[{ date: '2024-01-12', isDisabled: true }]}
 * />
 * @returns DatePicker 컴포넌트
 */
export default function DatePicker({
  variant = 'reservation',
  today,
  viewDateMonth: controlledViewMonth,
  defaultViewDateMonth,
  selectedDate,
  handleDateChangeAction,
  handleMonthChangeAction,
  maxDate,
  minDate,
  disablePastDates = true,
  monthAvailability,
}: DatePickerProps) {
  // 월 상태 관리 (제어형/비제어형)
  const [uncontrolledMonth, setUncontrolledMonth] = useState(() =>
    startOfMonth(defaultViewDateMonth ?? new Date()),
  );
  // 헤더에 실제로 보여질 월
  const viewMonth = controlledViewMonth ?? uncontrolledMonth;
  // 오늘 날짜 ISO (YYYY-MM-DD, 비교용)
  const todayISO = toISO(today ?? new Date());
  const headerText = `${viewMonth.getFullYear()}.${padNumber(viewMonth.getMonth() + 1)}`;

  const setMonth = (next: Date) => {
    if (!controlledViewMonth) setUncontrolledMonth(next);
    handleMonthChangeAction?.(next);
  };

  const handlePrevMonth = () =>
    setMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));

  const handleNextMonth = () =>
    setMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));

  const availabilityMap = useMemo(() => {
    if (!monthAvailability) return undefined;
    return Object.fromEntries(monthAvailability.map((d) => [d.date, d.isDisabled]));
  }, [monthAvailability]);

  const reservationBlockFromISO = useMemo(() => {
    if (variant !== 'reservation') return null;

    const now = new Date();
    const blockFrom = new Date(now.getFullYear(), now.getMonth() + MAX_RESERVATION_MONTHS, 1);
    return toISO(blockFrom); // YYYY-MM-01
  }, [variant]);

  const cells: CalendarCell[] = useMemo(() => {
    const year = viewMonth.getFullYear();
    const monthIndex = viewMonth.getMonth();
    const totalDays = daysInMonth(viewMonth);
    const startDay = new Date(year, monthIndex, 1).getDay(); // 0~6 (일~토)

    // CellGrid 앞 빈칸 채우기
    const prefixCells: CalendarCell[] = buildPrefixCells(year, monthIndex, startDay);

    // 날짜
    const dayCells: CalendarCell[] = Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;
      const iso = toISO(new Date(year, monthIndex, day));

      const isDisabled =
        variant === 'birthday'
          ? compareISO(iso, todayISO) > 0
          : (disablePastDates && compareISO(iso, todayISO) < 0) ||
            (!!minDate && compareISO(iso, minDate) < 0) ||
            (!!maxDate && compareISO(iso, maxDate) > 0) ||
            (!!reservationBlockFromISO && compareISO(iso, reservationBlockFromISO) >= 0) ||
            (availabilityMap?.[iso] ?? false);

      return { kind: 'day', key: iso, day, iso, isDisabled };
    });

    // 전체 셀 배열 반환 = 앞빈칸 + 날짜칸 + 뒷빈칸
    return [...prefixCells, ...dayCells];
  }, [
    viewMonth,
    variant,
    todayISO,
    disablePastDates,
    minDate,
    maxDate,
    reservationBlockFromISO,
    availabilityMap,
  ]);

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

      {/* 공컴 디바이더 교체 */}
      <div className='bg-black-3 h-[0.1rem]' />

      {/* 요일 */}
      <div className='flex flex-row items-center px-[1.6rem] py-[1.2rem]'>
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className='caption-12-md text-black-7 flex-1 py-[0.4rem] text-center'>
            {label}
          </span>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className='grid grid-cols-7 place-items-center gap-y-[0.8rem] p-[1.6rem]'>
        {cells.map((cell) =>
          cell.kind === 'day' ? (
            <DateCell
              key={cell.key}
              value={String(cell.day)}
              isDisabled={cell.isDisabled}
              isSelected={selectedDate === cell.iso}
              handleSelect={() => handleDateChangeAction?.(cell.iso)}
            />
          ) : (
            <div key={cell.key} className='min-w-[3.2rem] py-[0.8rem]' />
          ),
        )}
      </div>
    </div>
  );
}
