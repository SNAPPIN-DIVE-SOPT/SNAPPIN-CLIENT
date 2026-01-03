'use client';

import { useCallback, useEffect, useState } from 'react';

export function useNavVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const compute = useCallback((scrollTop: number) => {
    setIsVisible(scrollTop > 0);
  }, []);

  useEffect(() => {
    const el = document.getElementById('app-scroll');
    if (!el) return;

    const onScroll = () => compute(el.scrollTop);

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [compute]);

  const handleShowHeader = () => {
    setIsVisible(true);
  };

  return { isVisible, handleShowHeader };
}
