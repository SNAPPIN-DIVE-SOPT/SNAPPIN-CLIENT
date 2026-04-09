'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterChip } from '@snappin/design-system';
import { GetMoodFilterResponse } from '@/swagger-api';
import { useGetMoodIdList } from '@/queries/mood';

const parseMoodIds = (params: URLSearchParams): number[] => {
  const rawMoodIds = params.get('moodIds');
  if (!rawMoodIds) return [];

  return rawMoodIds
    .split(',')
    .map(Number)
    .filter((moodId) => !Number.isNaN(moodId));
};

export default function ExploreFilter() {
  const { data = [], isLoading } = useGetMoodIdList();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const moodIds = useMemo(() => parseMoodIds(searchParams), [searchParams]);
  const moods = useMemo(
    () =>
      data.filter((mood): mood is GetMoodFilterResponse & { id: number } => typeof mood.id === 'number'),
    [data],
  );

  const replaceMoodIds = useCallback(
    (nextIds: number[]) => {
      const params = new URLSearchParams(searchParamsString);

      if (nextIds.length === 0) {
        params.delete('moodIds');
      } else {
        params.set('moodIds', nextIds.join(','));
      }

      const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(next);
    },
    [pathname, router, searchParamsString],
  );

  const handleClickFilterChip = (id: number) => {
    const nextMoodIds = moodIds.includes(id)
      ? moodIds.filter((moodId) => moodId !== id)
      : [...moodIds, id];

    replaceMoodIds(nextMoodIds);
  };

  return (
    <div className='flex h-[5.5rem] items-center'>
      {!isLoading && (
        <div className='scrollbar-hide flex w-full gap-[0.4rem] overflow-x-auto px-[2rem]'>
          {moods.map((mood) => (
            <FilterChip
              key={mood.id}
              label={mood.name ?? ''}
              isSelected={moodIds.includes(mood.id)}
              onClick={() => handleClickFilterChip(mood.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
