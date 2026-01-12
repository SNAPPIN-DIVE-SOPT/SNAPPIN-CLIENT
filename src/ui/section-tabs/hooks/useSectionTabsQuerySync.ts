import { useEffect, useRef } from 'react';

type SectionTabsQuerySyncOptions = {
  queryKey?: string;
  historyStateKey?: string;
  value: string;
  handleValueChange?: (value: string) => void;
};

export const useSectionTabsQuerySync = ({
  queryKey,
  historyStateKey,
  value,
  handleValueChange,
}: SectionTabsQuerySyncOptions) => {
  const hasMountedRef = useRef(false);
  const latestValueRef = useRef(value);
  const latestHandleValueChangeRef = useRef(handleValueChange);
  const resolvedHistoryStateKey = queryKey ? undefined : historyStateKey;

  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  useEffect(() => {
    latestHandleValueChangeRef.current = handleValueChange;
  }, [handleValueChange]);

  useEffect(() => {
    if (!queryKey || typeof window === 'undefined') {
      return;
    }

    const resolvedHandleValueChange = latestHandleValueChangeRef.current;
    if (!resolvedHandleValueChange) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const queryValue = params.get(queryKey);

    if (!queryValue || queryValue === latestValueRef.current) {
      return;
    }

    resolvedHandleValueChange(queryValue);
  }, [queryKey]);

  useEffect(() => {
    if (!queryKey || typeof window === 'undefined') {
      return;
    }

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const queryValue = params.get(queryKey);
    if (queryValue === value) {
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set(queryKey, value);
    window.history.replaceState(null, '', url);
  }, [queryKey, value]);

  useEffect(() => {
    if (!queryKey || typeof window === 'undefined') {
      return;
    }

    const handlePopState = () => {
      const resolvedHandleValueChange = latestHandleValueChangeRef.current;
      if (!resolvedHandleValueChange) {
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const queryValue = params.get(queryKey);

      if (!queryValue || queryValue === latestValueRef.current) {
        return;
      }

      resolvedHandleValueChange(queryValue);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [queryKey]);

  useEffect(() => {
    if (!resolvedHistoryStateKey || typeof window === 'undefined') {
      return;
    }

    const resolvedHandleValueChange = latestHandleValueChangeRef.current;
    if (!resolvedHandleValueChange) {
      return;
    }

    const historyState = window.history.state;
    const historyStateValue =
      typeof historyState === 'object' && historyState !== null
        ? (historyState as Record<string, unknown>)[resolvedHistoryStateKey]
        : undefined;
    const nextValue = typeof historyStateValue === 'string' ? historyStateValue : null;

    if (!nextValue || nextValue === latestValueRef.current) {
      return;
    }

    resolvedHandleValueChange(nextValue);
  }, [resolvedHistoryStateKey]);

  useEffect(() => {
    if (!resolvedHistoryStateKey || typeof window === 'undefined') {
      return;
    }

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const historyState = window.history.state;
    const previousState =
      typeof historyState === 'object' && historyState !== null
        ? (historyState as Record<string, unknown>)
        : {};
    const previousValue = previousState[resolvedHistoryStateKey];

    if (previousValue === value) {
      return;
    }

    window.history.replaceState(
      {
        ...previousState,
        [resolvedHistoryStateKey]: value,
      },
      '',
    );
  }, [resolvedHistoryStateKey, value]);

  useEffect(() => {
    if (!resolvedHistoryStateKey || typeof window === 'undefined') {
      return;
    }

    const handlePopState = (event: PopStateEvent) => {
      const resolvedHandleValueChange = latestHandleValueChangeRef.current;
      if (!resolvedHandleValueChange) {
        return;
      }

      const historyState = event.state;
      const historyStateValue =
        typeof historyState === 'object' && historyState !== null
          ? (historyState as Record<string, unknown>)[resolvedHistoryStateKey]
          : undefined;
      const nextValue = typeof historyStateValue === 'string' ? historyStateValue : null;

      if (!nextValue || nextValue === latestValueRef.current) {
        return;
      }

      resolvedHandleValueChange(nextValue);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [resolvedHistoryStateKey]);
};
