'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterChip, IconButton } from '@/ui';
import { IconFilter, IconSettingsBackupRestore } from '@/assets';
import { ExploreFilterPanel } from '@/app/(with-layout)/explore/components';
import { GetMoodFilterResponse } from '@/swagger-api/data-contracts';
import { useMoodFilters } from '@/app/(with-layout)/explore/api';

const EXPLORE_NO_AUTO_APPLY = 'explore_no_auto_apply_v1';

const parseMoodIds = (params: URLSearchParams): number[] => {
  const rawMoodIds = params.get('moodIds');
  if (!rawMoodIds) return [];
  return rawMoodIds
    .split(',')
    .map(Number)
    .filter((num) => !Number.isNaN(num));
};

export default function ExploreFilter() {
  const [open, setOpen] = useState(false);
  const { data } = useMoodFilters();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const moodIds = useMemo(() => parseMoodIds(searchParams), [searchParams]);

  const userResetRef = useRef(false);
  const autoAppliedRef = useRef(false);

  const curatedIds = useMemo(() => {
    return (data?.moods ?? [])
      .filter((m) => m.isCurated)
      .map((m) => m.id)
      .filter((id): id is number => typeof id === 'number');
  }, [data?.moods]);

  const replaceMoodIds = (nextIds: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextIds.length === 0) params.delete('moodIds');
    else params.set('moodIds', nextIds.join(','));

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  const moodById = useMemo(() => {
    const map = new Map<number, GetMoodFilterResponse>();
    data?.moods?.forEach((m) =>
      map.set(m.id!, {
        name: m.name ?? '',
        id: m.id ?? 0,
        category: m.category ?? '스타일',
        isCurated: m.isCurated ?? false,
      }),
    );
    return map;
  }, [data]);

  const selectedMoods = useMemo(() => {
    return moodIds
      .map((id) => moodById.get(id))
      .filter((m): m is GetMoodFilterResponse => Boolean(m));
  }, [moodIds, moodById]);

  const lockAutoApply = () => localStorage.setItem(EXPLORE_NO_AUTO_APPLY, '1');

  useEffect(() => {
    if (pathname !== '/explore') return;

    // ✅ 잠금 상태면 자동 적용 금지
    if (localStorage.getItem(EXPLORE_NO_AUTO_APPLY) === '1') return;

    if (moodIds.length > 0) return;
    if (userResetRef.current) return;
    if (autoAppliedRef.current) return;
    if (curatedIds.length === 0) return;

    autoAppliedRef.current = true;
    replaceMoodIds(curatedIds);
  }, [pathname, moodIds, curatedIds, router, searchParams]);

  const handleReset = () => {
    userResetRef.current = true;
    lockAutoApply(); // 유저가 비운 의도면 이후 자동적용 금지
    replaceMoodIds([]);
  };

  const handleRemoveMood = (removeId: number) => {
    const nextIds = moodIds.filter((id) => id !== removeId);
    if (nextIds.length === 0) {
      userResetRef.current = true;
      lockAutoApply(); // 마지막 삭제도 “빈 상태 의도”로 본다
      replaceMoodIds([]);
      return;
    }
    replaceMoodIds(nextIds);
  };

  return (
    <>
      <div className='relative flex flex-row items-center justify-between gap-[0.3rem] px-[0.4rem] py-[0.6rem]'>
        <IconButton
          className='h-[4.4rem] w-[4.4rem] px-[1.05rem] py-[1rem]'
          onClick={handleReset}
          aria-label='무드 필터 초기화'
        >
          <IconSettingsBackupRestore />
        </IconButton>

        <div className='scrollbar-hide flex flex-1 flex-row gap-[0.4rem] overflow-x-auto'>
          {selectedMoods.length === 0 ? (
            <span className='caption-14-rg text-black-6'>무드필터를 이용해서 검색해 보세요</span>
          ) : (
            selectedMoods.map((mood) => (
              <FilterChip
                key={mood.id}
                label={mood.name ?? ''}
                onRemove={() => handleRemoveMood(mood.id ?? 0)}
                isSelected
              />
            ))
          )}
        </div>

        <IconButton
          className='border-black-3 before:bg-black-4 relative h-[4.4rem] w-[4.4rem] p-[1rem] before:absolute before:top-1/2 before:left-[-0.05rem] before:h-[3.1rem] before:w-[0.1rem] before:-translate-y-1/2 before:content-[""]'
          aria-expanded={open}
          aria-label='무드 필터 패널 열기'
          onClick={() => setOpen(!open)}
        >
          <IconFilter />
        </IconButton>
      </div>

      {open && (
        <div className='bg-black-1 absolute top-full right-0 left-0 z-100'>
          <ExploreFilterPanel
            key={moodIds.join(',')}
            moodList={data?.moods}
            selectedMoodIds={moodIds}
            handlePanelClose={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}
