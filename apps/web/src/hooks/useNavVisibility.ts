'use client';

import { useCallback, useEffect, useState } from 'react';

export function useNavVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const compute = useCallback((scrollTop: number) => {
    const nextVisible = scrollTop > 8;
    setIsVisible(nextVisible);
  }, []);

  useEffect(() => {
    const el = document.getElementById('app-scroll');
    if (!el) return;

    let rafId = 0;
    const scheduleCompute = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        compute(el.scrollTop);
      });
    };

    scheduleCompute();
    el.addEventListener('scroll', scheduleCompute, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('scroll', scheduleCompute);
    };
  }, [compute]);

  return { isVisible };
}
