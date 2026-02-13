'use client';

import dynamic from 'next/dynamic';
import { Suspense, useMemo } from 'react';
import { ButtonSearchBar, PortfolioListSkeleton, ProductListSkeleton, SectionTabs } from '@/ui';
import { parseInitialDraft } from '@/app/(with-layout)/explore/utils/query';
import { ExploreFilter } from '@/app/(with-layout)/explore/components';
import { SNAP_CATEGORY } from '@/constants/categories/snap-category';
import { EXPLORE_TAB, EXPLORE_TAB_MAP } from '@/app/(with-layout)/explore/constants/tab';
import { useQueryParams } from '@/hooks/useSearchQuery';
import { ALLOWED_KEYS } from '@/app/(with-layout)/explore/constants/query';
import { openSearchSheet } from '@/utils/openSearchSheet';

const PortfolioListSection = dynamic(
  () => import('@/app/(with-layout)/explore/_section/PortfolioListSection'),
);

const ProductListSection = dynamic(
  () => import('@/app/(with-layout)/explore/_section/ProductListSection'),
);

const isExploreTab = (value: string | null | undefined) => {
  return value === EXPLORE_TAB.PORTFOLIO || value === EXPLORE_TAB.PRODUCT;
};

const formatDateDot = (raw: string | null | undefined) => {
  if (!raw) return null;
  return raw.replaceAll('-', '/');
};

const formatPeople = (count: number | null | undefined) => {
  if (!count || count <= 0) return null;
  return `${count}인`;
};

export default function PageClient() {
  const { read, patch, navigate, searchParams, pathname } = useQueryParams(ALLOWED_KEYS);
  const { snapCategory, placeName, date, peopleCount } = useMemo(
    () => parseInitialDraft(searchParams),
    [searchParams],
  );
  const snapCategoryLabel = SNAP_CATEGORY[snapCategory as keyof typeof SNAP_CATEGORY] ?? null;

  const normalizedPlaceName = placeName?.trim() ? placeName.trim() : null;
  const formattedDate = formatDateDot(date);
  const formattedPeople = formatPeople(peopleCount);

  const isAllEmpty =
    !snapCategoryLabel && !normalizedPlaceName && !formattedDate && !formattedPeople;

  const headline = isAllEmpty
    ? '어떤 스냅 작가를 찾고 있나요?'
    : `${snapCategoryLabel ?? '전체 스냅'}, ${normalizedPlaceName ?? '전체 장소'}`;

  const supportingText = isAllEmpty
    ? '날짜, 스냅 종류, 지역 기반으로 정교한 검색'
    : `${formattedDate ?? '전체 날짜'}, ${formattedPeople ?? '전체 인원'}`;

  const currentTab = useMemo(() => {
    const raw = read.get('tab'); // string | null
    return isExploreTab(raw) ? raw : EXPLORE_TAB.PORTFOLIO;
  }, [read]);

  const handleTabChange = (nextTab: string) => {
    if (!isExploreTab(nextTab)) return;
    if (nextTab === currentTab) return;

    const nextParams = patch({ tab: nextTab });
    navigate(nextParams, { basePath: pathname, mode: 'replace' });
  };

  const handleSheetOpen = () => {
    const placeName = read.get('placeName') ?? '';
    const key = `search-sheet:${placeName}:${searchParams.toString()}`;
    openSearchSheet(key);
  };

  return (
    <SectionTabs
      value={currentTab}
      handleValueChange={handleTabChange}
      className='bg-black-1 flex min-h-0 flex-col'
    >
      {/* 탐색 페이지 상단 고정 영역 헤더 */}
      <header className='border-black-3 bg-black-1 sticky top-0 z-100 shrink-0 border-b-[0.1rem]'>
        {/* 검색 버튼 */}
        <div className='px-[2rem] py-[1.6rem]'>
          <ButtonSearchBar
            headline={headline}
            supportingText={supportingText}
            supportingTextClassName='text-black-7'
            onClick={handleSheetOpen}
          />
        </div>

        {/* 탐색 탭 */}
        <SectionTabs.List>
          <SectionTabs.Tab value={EXPLORE_TAB.PORTFOLIO}>
            {EXPLORE_TAB_MAP[EXPLORE_TAB.PORTFOLIO]}
          </SectionTabs.Tab>
          <SectionTabs.Tab value={EXPLORE_TAB.PRODUCT}>
            {EXPLORE_TAB_MAP[EXPLORE_TAB.PRODUCT]}
          </SectionTabs.Tab>
        </SectionTabs.List>

        {/* 필터 */}
        <ExploreFilter />
      </header>

      {/* 탐색 페이지 탭 메인 콘텐츠 영역 */}
      <main className='scrollbar-hide min-h-0 flex-1 overflow-hidden'>
        <SectionTabs.Contents
          value={EXPLORE_TAB.PORTFOLIO}
          className='min-h-0 flex-1 overflow-y-auto'
        >
          {currentTab === EXPLORE_TAB.PORTFOLIO && (
            <Suspense fallback={<PortfolioListSkeleton length={15} className='p-[1rem]' />}>
              <PortfolioListSection />
            </Suspense>
          )}
        </SectionTabs.Contents>

        <SectionTabs.Contents
          value={EXPLORE_TAB.PRODUCT}
          className='min-h-0 flex-1 overflow-y-auto'
        >
          {currentTab === EXPLORE_TAB.PRODUCT && (
            <Suspense
              fallback={
                <div className='bg-black-1 border-b-[0.1rem]'>
                  <ProductListSkeleton length={5} thickness='small' />
                </div>
              }
            >
              <ProductListSection />
            </Suspense>
          )}
        </SectionTabs.Contents>
      </main>
    </SectionTabs>
  );
}
