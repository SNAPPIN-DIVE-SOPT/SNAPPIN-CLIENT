'use client';

import { useEffect, useState } from 'react';

export function useSelectedMoodCode(initialMoodId: number) {
  const [selectedMoodCodeId, setSelectedMoodCodeId] = useState<number | undefined>(initialMoodId);

  useEffect(() => {
    setSelectedMoodCodeId(initialMoodId);
  }, [initialMoodId]);

  const toggleMoodCode = (value: number | undefined) => {
    if (value === undefined) {
      setSelectedMoodCodeId(undefined);
      return;
    }

    setSelectedMoodCodeId((prevSelectedMoodCodeId) => {
      if (prevSelectedMoodCodeId === value) {
        return undefined;
      }
      return value;
    });
  };

  return {
    toggleMoodCode,
    selectedMoodCodeId,
  };
}
