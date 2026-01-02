'use client';

import { cn } from '@/utils/cn';
import type { SectionTabsProps } from './types/sectionLabel';

export default function SectionTabs<T extends string>({
  tabs,
  selectedTab,
  onChangeTab,
  getLabel,
}: SectionTabsProps<T>) {
  return (
    <div className='border-black-4 flex h-18 w-full gap-4 border-b px-8'>
      {tabs.map((tab) => {
        const isSelected = tab === selectedTab;

        return (
          <button
            key={tab}
            type='button'
            onClick={() => onChangeTab(tab)}
            className='relative flex flex-1 items-center justify-center bg-transparent'
          >
            <span
              className={cn(
                'caption-14-bd transition-colors',
                isSelected ? 'text-black-10' : 'text-black-5',
              )}
            >
              {getLabel(tab)}
            </span>

            {isSelected ? (
              <span className='bg-black-10 absolute bottom-0 left-0 h-[0.2rem] w-full' />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
