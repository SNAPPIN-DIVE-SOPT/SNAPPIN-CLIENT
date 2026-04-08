'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { STEP_QUESTIONS, type STEP } from '@/app/(auth)/ai-curation/[step]/constants/steps';

type SelectedImage = Record<STEP, number | null>;

type AiCurationState = {
  selectedByStep: SelectedImage;
};

type AiCurationActions = {
  selectImageId: (step: STEP, id: number) => void;
  toggleImageId: (step: STEP, id: number) => void;
};

type AiCurationContextValue = AiCurationState & AiCurationActions;

type AiCurationProviderProps = {
  children: React.ReactNode;
};

const AiCurationContext = createContext<AiCurationContextValue | null>(null);

const EMPTY_SELECTED_BY_STEP: SelectedImage = Object.fromEntries(
  STEP_QUESTIONS.map(({ step }) => [step, null]),
) as SelectedImage;

export function AiCurationProvider({ children }: AiCurationProviderProps) {
  const [selectedByStep, setSelectedByStep] = useState<SelectedImage>(EMPTY_SELECTED_BY_STEP);

  const selectImageId = useCallback((step: STEP, id: number) => {
    setSelectedByStep((prev) => ({
      ...prev,
      [step]: id,
    }));
  }, []);

  const toggleImageId = useCallback((step: STEP, id: number) => {
    setSelectedByStep((prev) => ({
      ...prev,
      [step]: prev[step] === id ? null : id,
    }));
  }, []);

  const value = useMemo(
    () => ({
      selectedByStep,
      selectImageId,
      toggleImageId,
    }),
    [selectedByStep, selectImageId, toggleImageId],
  );

  return <AiCurationContext.Provider value={value}>{children}</AiCurationContext.Provider>;
}

export function useAiCuration() {
  const ctx = useContext(AiCurationContext);
  if (!ctx) throw new Error('useAiCuration는 AiCurationProvider 내에서 사용해야 합니다.');
  return ctx;
}
