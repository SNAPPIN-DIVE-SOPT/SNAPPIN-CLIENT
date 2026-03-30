'use client';

import { useSearchParams } from 'next/navigation';
import { overlay } from 'overlay-kit';
import SortDrawer from '@/app/(with-layout)/explore/components/sort-drawer/SortDrawer';
import { EXPLORE_SORT_LABEL } from '../../constants/sort';
import { resolveExploreSort } from '../../utils/query';
import { IconSortArrowDown } from '@snappin/design-system/assets';
import { ExploreTab } from '@/app/(with-layout)/explore/constants/tab';

type ExploreResultToolbarProps = {
  currentTab: ExploreTab;
};

export default function ExploreResultToolbar({ currentTab }: ExploreResultToolbarProps) {
  const count = 100;
  const searchParams = useSearchParams();
  const currentSort = resolveExploreSort(searchParams.get('sort'));

  return (
    <div className='flex flex-row items-center justify-between px-[2rem] py-[1.25rem]'>
      <span className='caption-12-md text-black-7'>{`검색 결과 ${count}개`}</span>
      <button
        type='button'
        aria-label='정렬 버튼'
        className='bg-black-1 border-black-4 flex w-[6.1rem] flex-row items-center gap-[0.4rem] rounded-[0.4rem] border-[0.1rem] px-[1rem] py-[0.6rem]'
        onClick={() =>
          overlay.open(({ isOpen, close }) => (
            <SortDrawer isOpen={isOpen} handleOpenChangeAction={close} currentTab={currentTab} />
          ))
        }
      >
        <span className='caption-10-md text-black-8'>{EXPLORE_SORT_LABEL[currentSort]}</span>
        <IconSortArrowDown className='text-black-8' />
      </button>
    </div>
  );
}
