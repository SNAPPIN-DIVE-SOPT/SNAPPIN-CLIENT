'use client';

import { Divider, IconButton } from '@/ui';
import { IconKeyboardArrowLeft, IconKeyboardArrowRight } from '@/assets';
import { useMemo, useState } from 'react';
import DateCell from '../cell/DateCell';
import { CalendarCell, DayAvailability } from '@/ui/date/picker/types/calendar';
import {
  addMonths,
  buildPrefixCells,
  compareISO,
  daysInMonth,
  startOfMonth,
  toISO,
} from '@/ui/date/picker/utils/date';
import { WEEKDAY_LABELS } from '@/ui/date/picker/constants/date';
import { padNumber } from '@/utils/padNumber';

const MAX_RESERVATION_MONTHS = 6;

type DatePickerProps = {
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
  closedDates?: string[];
  // 공통 옵션
  disablePastDates?: boolean;
};

/**
 * 날짜 선택 컴포넌트
 * - 제어형/비제어형 모두 지원
 * - 월별 날짜 활성화/비활성화 지원
 * - 최대 예약 가능 월 제한 지원
 * @param props DatePickerProps
 * @example
 * <DatePicker
 *   selectedDate="2024-01-15"
 *   handleDateChange={(next) => console.log(next)}
 *   defaultViewDateMonth={new Date(2024, 0, 1)} // 2024년 1월
 *   minDate="2024-01-10"
 *   maxDate="2024-01-20"
 *   monthAvailability={[{ date: '2024-01-12', isDisabled: true }]}
 * />
 * @returns DatePicker 컴포넌트
 */
export default function DatePicker({
  today,
  viewDateMonth: controlledViewMonth,
  defaultViewDateMonth,
  selectedDate,
  handleDateChangeAction,
  handleMonthChangeAction,
  maxDate,
  minDate,
  disablePastDates = true,
  closedDates,
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

  const handlePrevMonth = () => {
    if (
      viewMonth.getMonth() === (today ?? new Date()).getMonth() &&
      viewMonth.getFullYear() === (today ?? new Date()).getFullYear()
    ) {
      return;
    }
    setMonth(addMonths(viewMonth, -1));
  };
  const handleNextMonth = () => {
    if (
      viewMonth.getFullYear() === (today ?? new Date()).getFullYear() &&
      viewMonth.getMonth() === (today ?? new Date()).getMonth() + MAX_RESERVATION_MONTHS - 1
    ) {
      return;
    }
    setMonth(addMonths(viewMonth, 1));
  };

  const closedDateSet = useMemo(() => {
    return new Set(closedDates ?? []);
  }, [closedDates]);

  const reservationBlockFromISO = useMemo(() => {
    const now = today ?? new Date();
    const blockFrom = new Date(now.getFullYear(), now.getMonth() + MAX_RESERVATION_MONTHS, 1);
    return toISO(blockFrom);
  }, [today]);

  const cells: CalendarCell[] = useMemo(() => {
    const year = viewMonth.getFullYear();
    const monthIndex = viewMonth.getMonth();
    const totalDays = daysInMonth(viewMonth);
    // 0~6 (일~토)
    const startDay = new Date(year, monthIndex, 1).getDay();

    // CellGrid 앞 빈칸 채우기
    const prefixCells: CalendarCell[] = buildPrefixCells(year, monthIndex, startDay);

    // 날짜
    const dayCells: CalendarCell[] = Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;
      const iso = toISO(new Date(year, monthIndex, day));

      const isDisabled =
        (disablePastDates && compareISO(iso, todayISO) < 0) ||
        (!!minDate && compareISO(iso, minDate) < 0) ||
        (!!maxDate && compareISO(iso, maxDate) > 0) ||
        (!!reservationBlockFromISO && compareISO(iso, reservationBlockFromISO) >= 0) ||
        closedDateSet.has(iso);

      return { kind: 'day', key: iso, day, iso, isDisabled };
    });

    // 전체 셀 배열 반환 = 앞빈칸 + 날짜칸
    return [...prefixCells, ...dayCells];
  }, [
    viewMonth,
    disablePastDates,
    todayISO,
    minDate,
    maxDate,
    reservationBlockFromISO,
    closedDateSet,
  ]);

  const cellRows = useMemo(() => {
    const rows: CalendarCell[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }
    return rows;
  }, [cells]);

  const year = viewMonth.getFullYear();
  const monthNum = viewMonth.getMonth() + 1;

  return (
    <div className='flex flex-col'>
      {/* 이전, 다음 월 이동 */}
      <header className='flex flex-row items-center justify-between px-[1.6rem] py-[1.4rem]'>
        <IconButton className='text-black-7' onClick={handlePrevMonth} aria-label='이전 달'>
          <IconKeyboardArrowLeft />
        </IconButton>
        <span className='text-black-10 font-16-bd'>{headerText}</span>
        <IconButton className='text-black-7' onClick={handleNextMonth} aria-label='다음 달'>
          <IconKeyboardArrowRight />
        </IconButton>
      </header>

      <Divider color='bg-black-3' thickness='small' />

      {/* 그리드 달력*/}
      <div role='grid' aria-label={`${year}년 ${monthNum}월 달력`} className='flex flex-col'>
        {/* 달력 헤더 (요일) */}
        <div role='row' className='grid grid-cols-7 px-[1.6rem] py-[1rem]'>
          {WEEKDAY_LABELS.map((label) => (
            <span
              key={label}
              role='columnheader'
              className='caption-12-md text-black-7 py-[0.4rem] text-center'
            >
              {label}
            </span>
          ))}
        </div>
        {/* 달력 각 셀 */}
        <div className='flex flex-col gap-y-[0.8rem] px-[1.6rem]'>
          {cellRows.map((row, rowIndex) => (
            <div key={rowIndex} role='row' className='grid grid-cols-7 place-items-center'>
              {row.map((cell) =>
                cell.kind === 'day' ? (
                  <DateCell
                    key={cell.key}
                    value={String(cell.day)}
                    iso={cell.iso}
                    isDisabled={cell.isDisabled}
                    isSelected={selectedDate === cell.iso}
                    isToday={cell.iso === todayISO}
                    handleSelect={() => handleDateChangeAction?.(cell.iso)}
                  />
                ) : (
                  <div key={cell.key} aria-disabled='true' className='min-w-[3.2rem] py-[0.8rem]' />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
