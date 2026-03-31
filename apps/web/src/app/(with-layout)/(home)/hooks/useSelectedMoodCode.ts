'use client';

import { useState } from 'react';
import { MOOD_CODE, MoodCode } from '@snappin/shared/types';

const isMoodCode = (value: string): value is MoodCode => {
  return MOOD_CODE.includes(value as MoodCode);
};

export function useSelectedMoodCode(initialMoodCodes: MoodCode[] = []) {
  const [selectedMoodCodes, setSelectedMoodCodes] = useState<MoodCode[]>(initialMoodCodes);

  const toggleMoodCode = (value: string) => {
    if (!isMoodCode(value)) return;

    setSelectedMoodCodes((prev) =>
      prev.includes(value) ? prev.filter((moodCode) => moodCode !== value) : [...prev, value],
    );
  };

  const isSelectedMoodCode = (moodCode: MoodCode) => {
    return selectedMoodCodes.includes(moodCode);
  };

  const resetSelectedMoodCodes = () => {
    setSelectedMoodCodes([]);
  };

  return {
    selectedMoodCodes,
    toggleMoodCode,
    isSelectedMoodCode,
    resetSelectedMoodCodes,
    setSelectedMoodCodes,
  };
}
