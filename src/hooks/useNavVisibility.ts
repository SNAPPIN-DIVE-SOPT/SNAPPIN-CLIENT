'use client';

import { createContext, useCallback, useEffect, useRef, useState } from 'react';

export const NavVisibleContext = createContext(false);

export function useNavVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  const forcedTopVisibleRef = useRef(false);

  const compute = useCallback((scrollTop: number) => {
    if (scrollTop > 0) forcedTopVisibleRef.current = false;

    const next = scrollTop > 0 || forcedTopVisibleRef.current;
    setIsVisible((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    const el = document.getElementById('app-scroll');
    if (!el) return;

    const onScroll = () => compute(el.scrollTop);

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [compute]);

  const handleShowHeader = useCallback(() => {
    forcedTopVisibleRef.current = true;
    setIsVisible(true);
  }, []);

  return { isVisible, handleShowHeader };
}
