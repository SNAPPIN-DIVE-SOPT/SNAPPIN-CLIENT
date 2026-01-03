'use client';

import * as React from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';
import {
  SectionTabsContext,
  useSectionTabsContext,
  type SectionTabsIndicatorStyle,
} from './contexts/sectionTabsContext';

type SectionTabsProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  onValueChange?: (value: string) => void;
};

type SectionTabsTabChildren = ReactNode | ((props: { isSelected: boolean }) => ReactNode);

type SectionTabsTabProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  value: string;
  children: SectionTabsTabChildren;
};

type SectionTabsListProps = HTMLAttributes<HTMLDivElement>;

function SectionTabsRoot({
  value,
  onValueChange,
  className,
  children,
  ...props
}: SectionTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = React.useState<SectionTabsIndicatorStyle | null>(null);
  const selectedValue = value;

  React.useEffect(() => {
    if (selectedValue === null) {
      setIndicatorStyle(null);
    }
  }, [selectedValue]);

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      onValueChange?.(nextValue);
    },
    [onValueChange],
  );

  const contextValue = React.useMemo(
    () => ({
      value: selectedValue,
      onValueChange: handleValueChange,
      indicatorStyle,
      setIndicatorStyle,
    }),
    [handleValueChange, indicatorStyle, selectedValue],
  );

  return (
    <SectionTabsContext.Provider value={contextValue}>
      <div className={className} {...props}>
        {children}
      </div>
    </SectionTabsContext.Provider>
  );
}

function SectionTabsList({ className, children, ...props }: SectionTabsListProps) {
  const { indicatorStyle } = useSectionTabsContext('SectionTabs.List');

  return (
    <div
      className={cn(
        'border-black-4 relative flex h-[4.5rem] w-full gap-4 border-b px-8',
        className,
      )}
      {...props}
    >
      {children}
      {indicatorStyle ? (
        <span
          className='bg-black-10 pointer-events-none absolute bottom-0 left-0 h-[0.2rem] transition-[transform,width] duration-200 ease-out'
          style={{
            width: `${indicatorStyle.widthRem}rem`,
            transform: `translateX(${indicatorStyle.leftRem}rem)`,
          }}
        />
      ) : null}
    </div>
  );
}

function SectionTabsTab({
  value,
  className,
  children,
  onClick,
  type = 'button',
  ...props
}: SectionTabsTabProps) {
  const { value: selectedValue, onValueChange, setIndicatorStyle } =
    useSectionTabsContext('SectionTabs.Tab');
  const isSelected = value === selectedValue;
  const tabRef = React.useRef<HTMLButtonElement>(null);

  const handleIndicatorUpdate = React.useCallback(() => {
    const element = tabRef.current;
    if (!element) {
      return;
    }

    setIndicatorStyle({
      leftRem: element.offsetLeft / 10,
      widthRem: element.offsetWidth / 10,
    });
  }, [setIndicatorStyle]);

  React.useLayoutEffect(() => {
    if (isSelected) {
      handleIndicatorUpdate();
    }
  }, [handleIndicatorUpdate, isSelected, children, className]);

  React.useEffect(() => {
    if (!isSelected) {
      return;
    }

    const handleResize = () => {
      handleIndicatorUpdate();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleIndicatorUpdate, isSelected]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      onValueChange(value);
    }
  };

  const content = typeof children === 'function' ? children({ isSelected }) : children;

  return (
    <button
      type={type}
      data-selected={isSelected}
      className={cn(
        'caption-14-bd relative flex flex-1 items-center justify-center bg-transparent transition-colors',
        isSelected ? 'text-black-10' : 'text-black-5',
        className,
      )}
      ref={tabRef}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
}

type SectionTabsComponent = typeof SectionTabsRoot & {
  List: typeof SectionTabsList;
  Tab: typeof SectionTabsTab;
};

const SectionTabs = SectionTabsRoot as SectionTabsComponent;
SectionTabs.List = SectionTabsList;
SectionTabs.Tab = SectionTabsTab;

export default SectionTabs;
