'use client';

import { useMemo } from 'react';
import { cn } from '@/utils/cn';

type SectionTabItem = {
  label: string;
  value: string;
};

type SectionTabsNewProps = {
  tabs: SectionTabItem[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function SectionTabsNew({
  tabs,
  activeValue,
  onChange,
  className,
}: SectionTabsNewProps) {
  const activeIndex = useMemo(
    () => tabs.findIndex(({ value }) => value === activeValue),
    [tabs, activeValue],
  );

  return (
    <div
      className={cn(
        'border-b-black-4 bg-black-1 relative flex h-[4.5rem] w-full border-b',
        className,
      )}
    >
      {tabs.map(({ label, value }) => {
        const isActive = value === activeValue;

        return (
          <button
            key={value}
            type='button'
            onClick={() => onChange(value)}
            className={cn(
              'caption-14-bd flex-1 text-center transition-colors',
              isActive ? 'text-black-10' : 'text-black-5',
            )}
          >
            {label}
          </button>
        );
      })}

      <div
        className='bg-black-10 pointer-events-none absolute bottom-0 left-0 h-[0.2rem] transition-transform duration-200 ease-out'
        style={{
          width: `${100 / tabs.length}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
    </div>
  );
}
