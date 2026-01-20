'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterChip, IconButton } from '@/ui';
import { IconFilter, IconSettingsBackupRestore } from '@/assets';
import { ExploreFilterPanel } from '@/app/(with-layout)/explore/components';
import { useMoodFilters } from '@/app/(with-layout)/explore/api';
import { GetMoodFilterResponse } from '@/swagger-api/data-contracts';

const CURATED_APPLIED_KEY = 'explore_curated_applied_v1';

const parseMoodIds = (params: URLSearchParams): number[] => {
  const rawMoodIds = params.get('moodIds');
  if (!rawMoodIds) return [];
  return rawMoodIds
    .split(',')
    .map(Number)
    .filter((num) => !Number.isNaN(num));
};

export default function ExploreFilter() {
  const { data } = useMoodFilters();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const moodIds = useMemo(() => parseMoodIds(searchParams), [searchParams]);

  const moodById = useMemo(() => {
    const map = new Map<number, GetMoodFilterResponse>();
    data.moods?.forEach((m) =>
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
    return moodIds.map((id) => moodById.get(id)).filter((m): m is GetMoodFilterResponse => Boolean(m));
  }, [moodIds, moodById]);

  const handleRemoveMood = (removeId: number) => {
    const nextIds = moodIds.filter((id) => id !== removeId);

    const params = new URLSearchParams(searchParams.toString());

    if (nextIds.length === 0) {
      params.delete('moodIds');
    } else {
      params.set('moodIds', nextIds.join(','));
    }

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('moodIds');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  useEffect(() => {
    // 이미 moodIds가 존재하면 최초 진입 이후 필터 적용, 임의 필터 추가 적용한 상태
    if (moodIds.length > 0) return;

    // 최초 진입 이후 큐레이션된 필터가 적용된 상태 인지 확인
    const alreadyApplied = sessionStorage.getItem(CURATED_APPLIED_KEY) === 'true';
    if (alreadyApplied) return;

    // 큐레이션된 무드 필터 아이디들 추출
    const curatedIds = data.moods?.filter((mood) => mood.isCurated).map((mood) => mood.id);

    // curated가 비어 있으면 플래그만 세우고 종료
    sessionStorage.setItem(CURATED_APPLIED_KEY, 'true');
    if (curatedIds?.length === 0) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('moodIds', curatedIds?.join(',') ?? '');

    router.replace(`${pathname}?${params.toString()}`);
  }, [moodIds, data, pathname, router, searchParams]);

  useEffect(() => {
    return () => {
      // Explore 페이지를 벗어날 때(언마운트) → 다음 진입 시 다시 curated 적용되게
      sessionStorage.removeItem(CURATED_APPLIED_KEY);
    };
  }, []);

  return (
    <>
      <div className='relative flex flex-row items-center justify-between gap-[0.3rem] px-[0.4rem] py-[0.6rem]'>
        {/* 필터 초기화 버튼 */}
        <IconButton
          className='h-[4.4rem] w-[4.4rem] px-[1.05rem] py-[1rem]'
          onClick={handleReset}
          aria-label='무드 필터 초기화'
        >
          <IconSettingsBackupRestore />
        </IconButton>

        {/* 필터 칩 목록 */}
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
            moodList={data.moods}
            selectedMoodIds={moodIds}
            handlePanelClose={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}
