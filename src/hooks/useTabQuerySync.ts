'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useTabQuerySync(queryKey: string, fallback: string, shouldScroll = true) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeValue = useMemo(
    () => searchParams.get(queryKey) ?? fallback,
    [queryKey, fallback, searchParams],
  );

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(queryKey, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: shouldScroll });
  };

  return { activeValue, handleChange };
}
