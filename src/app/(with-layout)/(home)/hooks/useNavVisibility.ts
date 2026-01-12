'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type UseNavVisibilityMode = 'over-threshold' | 'direction';

type UseNavVisibilityOptions = {
  mode?: UseNavVisibilityMode;
  initialVisible?: boolean;
  thresholdPx?: number;
  directionThresholdPx?: number;
};

export function useNavVisibility({
  mode = 'over-threshold',
  initialVisible = false,
  thresholdPx = 8,
  directionThresholdPx = 8,
}: UseNavVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const isVisibleRef = useRef(initialVisible);
  const previousScrollTopRef = useRef(0);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const compute = useCallback(
    (scrollTop: number) => {
      if (mode === 'over-threshold') {
        setIsVisible(scrollTop > thresholdPx);
        return;
      }

      const previousScrollTop = previousScrollTopRef.current;
      const delta = scrollTop - previousScrollTop;
      const hasScrolledDown = delta > directionThresholdPx;
      const hasScrolledUp = delta < -directionThresholdPx;

      const nextIsVisible =
        scrollTop <= 0
          ? true
          : hasScrolledDown
            ? false
            : hasScrolledUp
              ? true
              : isVisibleRef.current;

      previousScrollTopRef.current = scrollTop;

      if (nextIsVisible !== isVisibleRef.current) {
        setIsVisible(nextIsVisible);
      }
    },
    [mode, thresholdPx, directionThresholdPx],
  );

  useEffect(() => {
    const el = document.getElementById('app-scroll');
    if (!el) {
      return;
    }

    previousScrollTopRef.current = el.scrollTop;

    const onScroll = () => compute(el.scrollTop);

    requestAnimationFrame(onScroll);
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
    };
  }, [compute]);

  return { isVisible };
}
