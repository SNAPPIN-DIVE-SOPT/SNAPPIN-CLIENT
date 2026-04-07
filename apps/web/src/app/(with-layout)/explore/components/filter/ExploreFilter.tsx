'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FilterChip } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';
import { useMoodFilters } from '@/app/(with-layout)/explore/api';
import {
  EXPLORE_DETAIL_BACK_HANDLED,
  EXPLORE_FROM_DETAIL_BACK,
  EXPLORE_NO_AUTO_APPLY,
} from '@/app/(with-layout)/explore/constants/storage-key';

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
  const { data, isLoading } = useMoodFilters();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const moodIds = useMemo(() => parseMoodIds(searchParams), [searchParams]);

  const userResetRef = useRef(false);
  const autoAppliedRef = useRef(false);

  //TODO: API type 바뀜 이슈로 build error 발생, 임시로 주석처리
  const curatedIds = useMemo(() => {
    return (
      (data?.moods ?? [])
        // .filter((m) => m.isCurated)
        .map((m) => m.id)
        .filter((id): id is number => typeof id === 'number')
    );
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

  /*  const selectedMoods = useMemo(() => {
    return moodIds
      .map((id) => moodById.get(id))
      .filter((m): m is GetMoodFilterResponse => Boolean(m));
  }, [moodIds, moodById]);*/

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

  const removeMood = (removeId: number) => {
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

  const handleClickFilterChip = (id: number) => {
    if (moodIds.includes(id)) {
      removeMood(id);
    } else {
      replaceMoodIds([...moodIds, id]);
    }
  };

  return (
    <div className='flex h-[5.5rem] items-center'>
      {!isLoading && (
        <div className='scrollbar-hide flex w-full gap-[0.4rem] overflow-x-auto px-[2rem]'>
          {data?.moods?.map((mood) => (
            <FilterChip
              key={mood.id ?? `mood-${mood.name}`}
              label={mood.name ?? ''}
              isSelected={moodIds.includes(mood.id ?? 0)}
              onClick={() => handleClickFilterChip(mood.id ?? 0)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
