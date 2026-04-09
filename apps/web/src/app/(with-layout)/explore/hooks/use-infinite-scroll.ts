import { useEffect, useRef } from 'react';

type Params = {
  enabled: boolean;
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

export const useInfiniteScroll = ({
  enabled,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  root = null,
  rootMargin = '200px',
  threshold = 0,
}: Params) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;

    if (!enabled) return;
    if (!el) return;
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (!hasNextPage) return;
        if (isFetchingNextPage) return;

        onLoadMore();
      },
      { root, rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, onLoadMore, hasNextPage, isFetchingNextPage, root, rootMargin, threshold]);

  return { sentinelRef };
};
