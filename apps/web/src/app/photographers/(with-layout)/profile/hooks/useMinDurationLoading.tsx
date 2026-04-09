import { useCallback, useEffect, useRef, useState } from 'react';

type SwitchControl = {
  startTime: number | null;
  timeoutId: ReturnType<typeof setTimeout> | null;
};

export const useMinDurationLoading = (minDuration: number) => {
  const [isSwitching, setIsSwitching] = useState(false);
  const ctrlRef = useRef<SwitchControl>({ startTime: null, timeoutId: null });

  const start = useCallback(() => {
    const ctrl = ctrlRef.current;
    ctrl.startTime = Date.now();
    setIsSwitching(true);
  }, []);

  const end = useCallback(() => {
    const ctrl = ctrlRef.current;

    const elapsed = Date.now() - (ctrl.startTime ?? Date.now());
    const remaining = Math.max(minDuration - elapsed, 0);

    if (ctrl.timeoutId) clearTimeout(ctrl.timeoutId);

    ctrl.timeoutId = setTimeout(() => {
      setIsSwitching(false);
      ctrl.startTime = null;
      ctrl.timeoutId = null;
    }, remaining);
  }, [minDuration]);

  useEffect(() => {
    const ctrl = ctrlRef.current;

    return () => {
      const { timeoutId } = ctrl;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return { isSwitching, start, end };
};
