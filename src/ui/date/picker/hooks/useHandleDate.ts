import { useState } from 'react';
import { addMonths, fromISO, startOfMonth } from '@/ui/date/picker/utils/date';

export const useHandleDate = (value?: string) => {
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    if (value) return startOfMonth(fromISO(value));
    return startOfMonth(new Date());
  });

  const handlePrevMonth = () => setViewMonth((prev) => addMonths(prev, -1));
  const handleNextMonth = () => setViewMonth((prev) => addMonths(prev, 1));

  return { viewMonth, handlePrevMonth, handleNextMonth };
};
