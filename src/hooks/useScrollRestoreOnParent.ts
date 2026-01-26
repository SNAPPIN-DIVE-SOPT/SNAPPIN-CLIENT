'use client';

import { RefObject, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

type Options = {
  restoreScheduleMs?: number[]; // default: [0, 50, 150, 300, 600]
  freezeSaveAfterRestoreMs?: number; // default: 400
  restoreOnce?: boolean; // default: true
  resetOnKeyChange?: boolean; // default: false
  saveThrottleFrame?: boolean; // default: true
  saveThrottleMs?: number; // default: 200
  saveOnPageHide?: boolean; // default: true
  enabled?: boolean; // default: true
};

// SPA에서 "목록 → 상세 → 뒤로가기" 시 원래 위치로 돌아가야 한다.
// 이 훅은 스크롤 부모를 찾아 위치를 저장하고, 데이터 렌더 후 복구를 재시도해
// 비동기 로딩/무한 스크롤 환경에서도 사용자가 보던 지점이 유지되도록 한다.
// 스크롤 가능한 부모를 찾기 위한 "overflow-y" 조건.
const isScrollableOverflow = (overflowY: string) =>
  overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';

// 높이 차이가 있어야 실제로 스크롤이 의미가 있다.
const isActuallyScrollable = (el: HTMLElement) => el.scrollHeight - el.clientHeight > 1;

// anchor 기준으로 가장 가까운 스크롤 컨테이너를 찾는다.
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
    restoreOnce = true,
    resetOnKeyChange = false,
    saveThrottleFrame = true,
    saveThrottleMs = 200,
    saveOnPageHide = true,
  } = options;

  // 키가 바뀌면 다른 "뷰 상태"로 보고 분기 처리한다.
  const key = useMemo(() => storageKey, [storageKey]);
  const freezeUntilRef = useRef(0);
  const restoredRef = useRef(false);
  const prevKeyRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (!enabled) return;
    if (!resetOnKeyChange) {
      prevKeyRef.current = key;
      return;
    }

    const anchor = anchorRef.current;
    if (!anchor) return;

    const scrollEl = getScrollParentOrNull(anchor);
    if (!scrollEl) return;

    const prev = prevKeyRef.current;
    if (prev && prev !== key) {
      // 같은 화면이라도 쿼리/탭이 바뀌면 이전 스크롤을 끌고 오지 않게 초기화.
      sessionStorage.removeItem(prev);
      sessionStorage.removeItem(key);
      scrollEl.scrollTop = 0;
      restoredRef.current = false;
    }

    prevKeyRef.current = key;
  }, [anchorRef, enabled, key, resetOnKeyChange]);

  useEffect(() => {
    if (!enabled) return;

    const anchor = anchorRef.current;
    if (!anchor) return;

    const scrollEl = getScrollParentOrNull(anchor);
    if (!scrollEl) return;

    let raf = 0;
    let timeoutId: number | null = null;

    const save = () => {
      if (Date.now() < freezeUntilRef.current) return;

      sessionStorage.setItem(key, String(scrollEl.scrollTop));
    };

    const onScroll = () => {
      // 과도한 저장으로 성능이 깨지는 것을 막기 위해 일정 간격으로만 기록.
      if (saveThrottleMs > 0) {
        if (timeoutId) window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(save, saveThrottleMs);
        return;
      }
      // 프레임 단위 저장으로 스크롤 이벤트 폭주를 줄인다.
      if (!saveThrottleFrame) return save();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(save);
    };

    scrollEl.addEventListener('scroll', onScroll, { passive: true });
    if (saveOnPageHide) {
      // 탭 이동/백그라운드 진입 시점에도 마지막 위치를 남긴다.
      window.addEventListener('pagehide', save);
      document.addEventListener('visibilitychange', save);
    }

    return () => {
      cancelAnimationFrame(raf);
      if (timeoutId) window.clearTimeout(timeoutId);
      scrollEl.removeEventListener('scroll', onScroll);
      if (saveOnPageHide) {
        window.removeEventListener('pagehide', save);
        document.removeEventListener('visibilitychange', save);
      }
    };
  }, [anchorRef, enabled, key, saveThrottleFrame, saveThrottleMs, saveOnPageHide]);

  useLayoutEffect(() => {
    if (!enabled) return;

    const anchor = anchorRef.current;
    if (!anchor) return;

    const scrollEl = getScrollParentOrNull(anchor);
    if (!scrollEl) return;

    // 복구는 최초 1회만 수행(옵션). 이후엔 사용자 스크롤을 존중.
    if (restoreOnce && restoredRef.current) return;

    const raw = sessionStorage.getItem(key);
    if (!raw) return;

    const top = Number(raw);
    if (Number.isNaN(top)) return;

    // 복구 직후 저장이 다시 덮어쓰지 않도록 잠깐 저장을 멈춘다.
    freezeUntilRef.current = Date.now() + freezeSaveAfterRestoreMs;

    const timers: number[] = [];
    const apply = () => {
      scrollEl.scrollTop = top;
    };
    const finalizeRestore = () => {
      // 실제로 복구가 성공했을 때만 "복구 완료"로 간주해
      // 데이터가 늦게 붙는 경우에도 다시 시도할 수 있게 한다.
      if (!restoreOnce) return;
      if (top === 0) {
        restoredRef.current = true;
        return;
      }
      const maxTop = scrollEl.scrollHeight - scrollEl.clientHeight;
      const reached = Math.abs(scrollEl.scrollTop - top) <= 1;
      if (maxTop >= top - 1 && reached) restoredRef.current = true;
    };

    // 렌더 타이밍이 여러 번 바뀌는 상황을 고려해 단계적으로 재시도.
    for (const ms of restoreScheduleMs) {
      timers.push(window.setTimeout(apply, ms));
    }
    if (restoreScheduleMs.length > 0) {
      const last = Math.max(...restoreScheduleMs);
      timers.push(window.setTimeout(finalizeRestore, last + 50));
    } else {
      timers.push(window.setTimeout(finalizeRestore, 0));
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key, freezeSaveAfterRestoreMs, restoreOnce, ...restoreDeps]);
};
