'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type SelectedImage = Record<number, number | null>;

type AiCurationState = {
  selectedByStep: SelectedImage;
};

type AiCurationActions = {
  selectImageId: (step: number, id: number) => void;
  toggleImageId: (step: number, id: number) => void;
};

export type AiCurationProviderProps = {
  children: React.ReactNode;
};

const AiCurationContext = createContext<(AiCurationState & AiCurationActions) | null>(null);

export function AiCurationProvider({ children }: AiCurationProviderProps) {
  const [selectedByStep, setSelectedByStep] = useState<SelectedImage>({});

  const selectImageId = useCallback((step: number, id: number) => {
    setSelectedByStep((prev) => ({
      ...prev,
      [step]: id,
    }));
  }, []);

  const toggleImageId = useCallback((step: number, id: number) => {
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
