'use client';

import { useEffect, useState } from 'react';

export function useSelectedMoodCode(initialMoodId: number) {
  const [selectedMoodCodeId, setSelectedMoodCodeId] = useState<number>(initialMoodId);

  useEffect(() => {
    setSelectedMoodCodeId(initialMoodId);
  }, [initialMoodId]);

  const toggleMoodCode = (value: number) => {
    setSelectedMoodCodeId((prevSelectedMoodCodeId) => {
      if (prevSelectedMoodCodeId === value) return prevSelectedMoodCodeId;
      return value;
    });
  };

  return {
    toggleMoodCode,
    selectedMoodCodeId,
  };
}
