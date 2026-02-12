'use client';

import { useMemo, useRef, useState, useLayoutEffect, useEffect } from 'react';
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

  // indicator 위치와 길이 계산
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  const updateIndicator = () => {
    const el = tabRefs.current[activeIndex];
    if (!el) return;

    setIndicatorStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [activeIndex]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex]);

  return (
    <div
      className={cn(
        'border-b-black-4 bg-black-1 relative flex h-[4.5rem] w-full gap-[0.4rem] border-b px-[2rem]',
        className,
      )}
    >
      {tabs.map(({ label, value }, index) => {
        const isActive = value === activeValue;

        return (
          <button
            key={value}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
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

      {/* indicator */}
      <div
        className='bg-black-10 transition-[left, width] pointer-events-none absolute bottom-0 h-[0.2rem] duration-200 ease-out'
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
    </div>
  );
}
