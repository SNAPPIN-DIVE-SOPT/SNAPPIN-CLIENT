'use client';

import * as React from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';
import { SectionTabsContext, useSectionTabsContext } from './contexts/sectionTabsContext';

type SectionTabsProps = HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
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
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: SectionTabsProps) {
  const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue ?? null);
  const selectedValue = value ?? internalValue;

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      setInternalValue(nextValue);
      onValueChange?.(nextValue);
    },
    [onValueChange],
  );

  const contextValue = React.useMemo(
    () => ({
      value: selectedValue,
      onValueChange: handleValueChange,
    }),
    [handleValueChange, selectedValue],
  );

  return (
    <SectionTabsContext.Provider value={contextValue}>
      <div className={className} {...props}>
        {children}
      </div>
    </SectionTabsContext.Provider>
  );
}

function SectionTabsList({ className, ...props }: SectionTabsListProps) {
  return (
    <div
      className={cn('border-black-4 flex h-[4.5rem] w-full gap-4 border-b px-8', className)}
      {...props}
    />
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
  const { value: selectedValue, onValueChange } = useSectionTabsContext('SectionTabs.Tab');
  const isSelected = value === selectedValue;

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
      onClick={handleClick}
      {...props}
    >
      {content}
      {isSelected ? (
        <span className='bg-black-10 absolute bottom-0 left-0 h-[0.2rem] w-full' />
      ) : null}
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
export { SectionTabsList, SectionTabsTab };
