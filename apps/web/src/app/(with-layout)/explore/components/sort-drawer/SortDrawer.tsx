'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BottomDrawer, DrawerDescription, DrawerTitle } from '@snappin/design-system';
import { IconCheck } from '@snappin/design-system/assets';
import { EXPLORE_TAB_MAP, ExploreTab } from '@/app/(with-layout)/explore/constants/tab';
import { resolveExploreSort } from '@/app/(with-layout)/explore/utils/query';
import {
  EXPLORE_SORT_LABEL,
  EXPLORE_SORT_OPTIONS,
  ExploreSort,
} from '@/app/(with-layout)/explore/constants/sort';

type SortDrawerProps = {
  isOpen: boolean;
  handleOpenChangeAction: () => void;
  currentTab: ExploreTab;
};

const SortOption = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type='button'
      role='menuitemradio'
      aria-label={label}
      aria-checked={isSelected}
      onClick={onClick}
      className='text-black-9 font-16-md relative h-[6.1rem] w-full py-[2rem] text-center'
    >
      <span className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap'>
        {isSelected && (
          <IconCheck
            aria-hidden='true'
            className='text-black-10 absolute top-1/2 right-[calc(100%+2.4rem)] h-[1.1rem] w-[1.5rem] -translate-y-1/2'
          />
        )}
        {label}
      </span>
    </button>
  );
};

export default function SortDrawer({
  isOpen,
  handleOpenChangeAction,
  currentTab,
}: SortDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = resolveExploreSort(searchParams.get('sort'));

  const handleSelectSort = (sort: ExploreSort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl);
    handleOpenChangeAction();
  };

  return (
    <BottomDrawer isOpen={isOpen} handleOpenChange={handleOpenChangeAction}>
      <DrawerTitle className='sr-only'>정렬 옵션 선택</DrawerTitle>
      <DrawerDescription className='sr-only'>
        정렬 옵션을 선택하는 드로어입니다. 원하는 정렬을 선택하면 바로 적용됩니다.
      </DrawerDescription>
      <BottomDrawer.Section className='flex h-[29rem] flex-col gap-[0.6rem]'>
        <BottomDrawer.Title className='py-[2rem] text-center'>{`${EXPLORE_TAB_MAP[currentTab]} 정렬`}</BottomDrawer.Title>
        {EXPLORE_SORT_OPTIONS.map((option) => (
          <SortOption
            key={option}
            label={EXPLORE_SORT_LABEL[option]}
            isSelected={currentSort === option}
            onClick={() => handleSelectSort(option)}
          />
        ))}
      </BottomDrawer.Section>
    </BottomDrawer>
  );
}
