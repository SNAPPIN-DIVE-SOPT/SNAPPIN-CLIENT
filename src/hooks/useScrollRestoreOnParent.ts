'use client';

import { RefObject, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

type Options = {
  restoreScheduleMs?: number[]; // default: [0, 50, 150, 300, 600]
  freezeSaveAfterRestoreMs?: number; // default: 400
  saveThrottleFrame?: boolean; // default: true
  enabled?: boolean; // default: true
};

const isScrollableOverflow = (overflowY: string) =>
  overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';

const isActuallyScrollable = (el: HTMLElement) => el.scrollHeight - el.clientHeight > 1;

const getScrollParentOrNull = (el: HTMLElement | null) => {
  let cur: HTMLElement | null = el;

  while (cur) {
    const { overflowY } = window.getComputedStyle(cur);
    if (isScrollableOverflow(overflowY) && isActuallyScrollable(cur)) return cur;
    cur = cur.parentElement;
  }
  return null;
};

export const useScrollRestoreOnParent = (
  anchorRef: RefObject<HTMLElement | null>,
  storageKey: string,
  restoreDeps: unknown[] = [],
  options: Options = {},
) => {
  const {
    enabled = true,
    restoreScheduleMs = [0, 50, 150, 300, 600],
    freezeSaveAfterRestoreMs = 400,
    saveThrottleFrame = true,
  } = options;

  const key = useMemo(() => storageKey, [storageKey]);
  const freezeUntilRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const anchor = anchorRef.current;
    if (!anchor) return;

    const scrollEl = getScrollParentOrNull(anchor);
    if (!scrollEl) return;

    let raf = 0;

    const save = () => {
      if (Date.now() < freezeUntilRef.current) return;

      const prev = sessionStorage.getItem(key);
      if (scrollEl.scrollTop === 0 && prev && Number(prev) > 0) return;

      sessionStorage.setItem(key, String(scrollEl.scrollTop));
    };

    const onScroll = () => {
      if (!saveThrottleFrame) return save();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(save);
    };

    scrollEl.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      scrollEl.removeEventListener('scroll', onScroll);
    };
  }, [anchorRef, enabled, key, saveThrottleFrame]);

  useLayoutEffect(() => {
    if (!enabled) return;

    const anchor = anchorRef.current;
    if (!anchor) return;

    const scrollEl = getScrollParentOrNull(anchor);
    if (!scrollEl) return;

    const raw = sessionStorage.getItem(key);
    if (!raw) return;

    const top = Number(raw);
    if (Number.isNaN(top)) return;

    freezeUntilRef.current = Date.now() + freezeSaveAfterRestoreMs;

    const timers: number[] = [];
    const apply = () => {
      scrollEl.scrollTop = top;
    };

    for (const ms of restoreScheduleMs) {
      timers.push(window.setTimeout(apply, ms));
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key, freezeSaveAfterRestoreMs, ...restoreDeps]);
};
