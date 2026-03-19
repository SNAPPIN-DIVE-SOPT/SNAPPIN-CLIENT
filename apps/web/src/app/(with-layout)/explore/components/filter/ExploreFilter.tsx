'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterChip, IconButton } from '@snappin/design-system';
import { IconFilter, IconSettingsBackupRestore } from '@snappin/design-system/assets';
import { ExploreFilterPanel } from '../index';
import { GetMoodFilterResponse } from '@/swagger-api';
import { useMoodFilters } from '../../api';
import { ROUTES } from '@/constants/routes/routes';
import {
  EXPLORE_DETAIL_BACK_HANDLED,
  EXPLORE_FROM_DETAIL_BACK,
  EXPLORE_NO_AUTO_APPLY,
} from '../../constants/storage-key';

const parseMoodIds = (params: URLSearchParams): number[] => {
  const rawMoodIds = params.get('moodIds');
  if (!rawMoodIds) return [];
  return rawMoodIds
    .split(',')
    .map(Number)
    .filter((num) => !Number.isNaN(num));
};

const lockAutoApply = () => {
  sessionStorage.setItem(EXPLORE_NO_AUTO_APPLY, '1');
};

export default function ExploreFilter() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useMoodFilters();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const moodIds = useMemo(() => parseMoodIds(searchParams), [searchParams]);

  const userResetRef = useRef(false);
  const autoAppliedRef = useRef(false);

  const curatedIds = useMemo(() => {
    return (data?.moods ?? [])
      .filter((m) => m.isCurated)
      .map((m) => m.id)
      .filter((id): id is number => typeof id === 'number');
  }, [data?.moods]);

  const replaceMoodIds = useCallback(
    (nextIds: number[]) => {
      const params = new URLSearchParams(searchParamsString);

      if (nextIds.length === 0) params.delete('moodIds');
      else params.set('moodIds', nextIds.join(','));

      const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(next);
    },
    [pathname, router, searchParamsString],
  );

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

  useEffect(() => {
    const isReturningFromDetail = sessionStorage.getItem(EXPLORE_FROM_DETAIL_BACK) === '1';

    if (isReturningFromDetail) {
      // 상세에서 뒤로 복귀한 경우엔 현재 필터 상태(0개 포함)를 유지해야 한다.
      sessionStorage.setItem(EXPLORE_NO_AUTO_APPLY, '1');
      sessionStorage.removeItem(EXPLORE_FROM_DETAIL_BACK);
      // React Strict Mode 개발 환경에서 mount effect가 2회 실행될 때
      // 다음 effect pass에서 잠금이 지워지지 않도록 1회성 가드를 남긴다.
      sessionStorage.setItem(EXPLORE_DETAIL_BACK_HANDLED, '1');
      return;
    }

    const justHandledDetailBack = sessionStorage.getItem(EXPLORE_DETAIL_BACK_HANDLED) === '1';
    if (justHandledDetailBack) {
      sessionStorage.removeItem(EXPLORE_DETAIL_BACK_HANDLED);
      return;
    }

    // 일반 진입: 이전 잠금은 stale로 보고 해제
    sessionStorage.removeItem(EXPLORE_NO_AUTO_APPLY);
  }, []);

  useEffect(() => {
    if (pathname !== ROUTES.EXPLORE()) return;

    if (sessionStorage.getItem(EXPLORE_NO_AUTO_APPLY) === '1') return;

    if (moodIds.length > 0) return;
    if (userResetRef.current) return;
    if (autoAppliedRef.current) return;
    if (curatedIds.length === 0) return;

    autoAppliedRef.current = true;
    replaceMoodIds(curatedIds);
  }, [pathname, moodIds, curatedIds, replaceMoodIds]);

  const handleReset = () => {
    userResetRef.current = true;
    // 유저가 비운 의도면 이후 자동적용 금지
    lockAutoApply();
    replaceMoodIds([]);
  };

  const handleRemoveMood = (removeId: number) => {
    const nextIds = moodIds.filter((id) => id !== removeId);
    if (nextIds.length === 0) {
      userResetRef.current = true;
      // 마지막 삭제도 “빈 상태 의도”로 본다
      lockAutoApply();
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

        {!isLoading && (
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
        )}
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
            handlePanelCloseAction={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}
