'use client';

import { useCallback, useEffect, useState } from 'react';

export function useNavVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const compute = useCallback((scrollTop: number) => {
    setIsVisible(scrollTop > 8);
  }, []);

  useEffect(() => {
    const el = document.getElementById('app-scroll');
    if (!el) return;

    const onScroll = () => compute(el.scrollTop);

    requestAnimationFrame(onScroll);
    el.addEventListener('scroll', onScroll, { passive: true });

    return () => el.removeEventListener('scroll', onScroll);
  }, [compute]);

  return { isVisible };
}
