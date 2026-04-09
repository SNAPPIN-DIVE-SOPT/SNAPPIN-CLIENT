import { useCallback, useEffect, useRef } from 'react';

type SectionTabsQuerySyncOptions = {
  queryKey?: string;
  value: string;
  handleValueChange?: (value: string) => void;
};

export const useSectionTabsQuerySync = ({
  queryKey,
  value,
  handleValueChange,
}: SectionTabsQuerySyncOptions) => {
  const skipQuerySyncRef = useRef(false);

  const getQueryValue = useCallback(() => {
    if (!queryKey || typeof window === 'undefined') {
      return null;
    }

    const params = new URLSearchParams(window.location.search);
    return params.get(queryKey);
  }, [queryKey]);

  const updateQueryValue = useCallback(
    (nextValue: string) => {
      if (!queryKey || typeof window === 'undefined') {
        return;
      }

      const url = new URL(window.location.href);
      url.searchParams.set(queryKey, nextValue);
      window.history.pushState(null, '', url);
    },
    [queryKey],
  );

  useEffect(() => {
    if (!queryKey || !handleValueChange) {
      return;
    }

    const queryValue = getQueryValue();
    if (!queryValue || queryValue === value) {
      return;
    }

    skipQuerySyncRef.current = true;
    handleValueChange(queryValue);
  }, [queryKey, getQueryValue, handleValueChange, value]);

  useEffect(() => {
    if (!queryKey) {
      return;
    }

    const queryValue = getQueryValue();
    if (queryValue === value) {
      return;
    }

    if (skipQuerySyncRef.current) {
      skipQuerySyncRef.current = false;
      return;
    }

    updateQueryValue(value);
  }, [queryKey, value, getQueryValue, updateQueryValue]);

  useEffect(() => {
    if (!queryKey || !handleValueChange) {
      return;
    }

    const handlePopState = () => {
      const queryValue = getQueryValue();
      if (!queryValue || queryValue === value) {
        return;
      }

      skipQuerySyncRef.current = true;
      handleValueChange(queryValue);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [queryKey, getQueryValue, handleValueChange, value]);
};
