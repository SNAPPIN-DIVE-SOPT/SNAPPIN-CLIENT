'use client';

import { useEffect, useState } from 'react';
import { EXPLORE_FROM_DETAIL_BACK, EXPLORE_OPTION_VISIBLE } from '../constants/storage-key';

const getInitialVisibility = () => {
  if (typeof window === 'undefined') return true;

  const isReturningFromDetail = sessionStorage.getItem(EXPLORE_FROM_DETAIL_BACK) === '1';
  if (!isReturningFromDetail) return true;

  return sessionStorage.getItem(EXPLORE_OPTION_VISIBLE) !== '0';
};

export function useExploreOptionVisibility(targetId: string) {
  const [isVisible, setIsVisible] = useState(getInitialVisibility);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let rafId = 0;
    let prevScrollTop = el.scrollTop;

    const scheduleCompute = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const nextScrollTop = el.scrollTop;
        const delta = nextScrollTop - prevScrollTop;

        if (nextScrollTop <= 8) {
          setIsVisible(true);
        } else if (delta > 4) {
          setIsVisible(false);
        } else if (delta < -4) {
          setIsVisible(true);
        }

        prevScrollTop = nextScrollTop;
      });
    };

    el.addEventListener('scroll', scheduleCompute, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('scroll', scheduleCompute);
    };
  }, [targetId]);

  useEffect(() => {
    sessionStorage.setItem(EXPLORE_OPTION_VISIBLE, isVisible ? '1' : '0');
  }, [isVisible]);

  return { isVisible };
}
