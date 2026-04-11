'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { EXPLORE_FROM_DETAIL_BACK, EXPLORE_OPTION_VISIBLE } from '../constants/storage-key';

const subscribeToStorageSnapshot = () => {
  return () => {};
};

const getRestoredVisibilitySnapshot = () => {
  const isReturningFromDetail = sessionStorage.getItem(EXPLORE_FROM_DETAIL_BACK) === '1';

  if (!isReturningFromDetail) {
    return true;
  }

  return sessionStorage.getItem(EXPLORE_OPTION_VISIBLE) !== '0';
};

export function useExploreOptionVisibility(targetId: string) {
  const [scrollVisible, setScrollVisible] = useState<boolean | null>(null);
  const isHydrated = useSyncExternalStore(subscribeToStorageSnapshot, () => true, () => false);
  const restoredVisibility = useSyncExternalStore(
    subscribeToStorageSnapshot,
    getRestoredVisibilitySnapshot,
    () => true,
  );
  const isVisible = scrollVisible ?? restoredVisibility;

  useEffect(() => {
    if (!isHydrated) return;

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
          setScrollVisible(true);
        } else if (delta > 4) {
          setScrollVisible(false);
        } else if (delta < -4) {
          setScrollVisible(true);
        }

        prevScrollTop = nextScrollTop;
      });
    };

    el.addEventListener('scroll', scheduleCompute, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('scroll', scheduleCompute);
    };
  }, [isHydrated, targetId]);

  useEffect(() => {
    if (!isHydrated) return;

    sessionStorage.setItem(EXPLORE_OPTION_VISIBLE, isVisible ? '1' : '0');
  }, [isHydrated, isVisible]);

  return { isVisible };
}
