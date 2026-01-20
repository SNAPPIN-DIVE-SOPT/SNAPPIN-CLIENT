'use client';

import { useMemo } from 'react';
import { overlay } from 'overlay-kit';
import { ButtonSearchBar, SectionTabs } from '@/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { parseInitialDraft, pickAllowedParams } from '@/app/(with-layout)/explore/utils/query';
import { ExploreFilter, SearchSheet } from '@/app/(with-layout)/explore/components';
import { PortfolioListSection, ProductListSection } from '@/app/(with-layout)/explore/_section';
import { SNAP_CATEGORY } from '@/constants/categories/snap-category';
import { EXPLORE_TAB, EXPLORE_TAB_MAP } from '@/app/(with-layout)/explore/constants/tab';

const isExploreTab = (value: string | null | undefined) => {
  return value === EXPLORE_TAB.PORTFOLIO || value === EXPLORE_TAB.PRODUCT;
};

const joinOrFallback = (items: Array<string | null | undefined>, fallback: string) => {
  const filtered = items.map((v) => v?.trim()).filter(Boolean) as string[];
  return filtered.length > 0 ? filtered.join(', ') : fallback;
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
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const { snapCategory, placeId, date, peopleCount } = parseInitialDraft(sp);
  const snapCategoryLabel = SNAP_CATEGORY[snapCategory as keyof typeof SNAP_CATEGORY] ?? null;
  const placeLabel = placeId ?? null;

  const headline = joinOrFallback([snapCategoryLabel, placeLabel], '어떤 스냅 작가를 찾고 있나요?');

  const supportingText = joinOrFallback(
    [formatDateDot(date), formatPeople(peopleCount)],
    '날짜, 스냅 종류, 지역 기반으로 정교한 검색',
  );

  const currentTab = useMemo(() => {
    const raw = sp.get('tab'); // string | null
    return isExploreTab(raw) ? raw : EXPLORE_TAB.PORTFOLIO;
  }, [sp]);

  const handleTabChange = (nextTab: string) => {
    if (!isExploreTab(nextTab)) return;

    const base = pickAllowedParams(new URLSearchParams(sp.toString()));
    base.set('tab', nextTab);

    router.push(`${pathname}?${base.toString()}`, { scroll: false });
  };

  const handleSheetOpen = () => {
    overlay.open(({ isOpen, close }) => <SearchSheet open={isOpen} onOpenChange={close} />);
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
      <main className='scrollbar-hide min-h-0 overflow-y-hidden'>
        <SectionTabs.Contents value={EXPLORE_TAB.PORTFOLIO} className='min-h-full'>
          {/* 포트폴리오 목록 */}
          <PortfolioListSection />
        </SectionTabs.Contents>

        <SectionTabs.Contents value={EXPLORE_TAB.PRODUCT} className='min-h-full'>
          {/* 상품 목록 */}
          <ProductListSection />
        </SectionTabs.Contents>
      </main>
    </SectionTabs>
  );
}
