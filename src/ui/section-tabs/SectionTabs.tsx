'use client';

import * as React from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';
import {
  SectionTabsContext,
  useSectionTabsContext,
  type SectionTabsIndicatorStyle,
} from './contexts/sectionTabsContext';
import { useSectionTabsQuerySync } from './hooks/useSectionTabsQuerySync';

const PX_PER_REM = 10;
const NOOP = () => {};
const getSectionTabsId = (baseId: string, value: string, suffix: string) => {
  const normalizedValue = value.replace(/\s+/g, '-');
  return `${baseId}-${suffix}-${normalizedValue}`;
};

type SectionTabsProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  handleValueChange?: (value: string) => void;
  queryKey?: string;
};

type SectionTabsTabChildren = ReactNode | ((props: { isSelected: boolean }) => ReactNode);

type SectionTabsTabProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> & {
  value: string;
  children: SectionTabsTabChildren;
};

type SectionTabsListProps = HTMLAttributes<HTMLDivElement>;

type SectionTabContentsProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

type SectionTabsComponent = typeof SectionTabsRoot & {
  List: typeof SectionTabsList;
  Tab: typeof SectionTabsTab;
  Contents: typeof SectionTabContents;
};

const SectionTabsRoot = ({
  value,
  handleValueChange,
  queryKey,
  className,
  children,
  ...props
}: SectionTabsProps) => {
  const [indicatorStyle, setIndicatorStyle] = React.useState<SectionTabsIndicatorStyle | null>(
    null,
  );
  const selectedValue = value;
  const baseId = React.useId();

  useSectionTabsQuerySync({
    queryKey,
    value: selectedValue,
    handleValueChange,
  });

  const contextValue = React.useMemo(
    () => ({
      value: selectedValue,
      handleValueChange: handleValueChange ?? NOOP,
      indicatorStyle,
      setIndicatorStyle,
      baseId,
    }),
    [handleValueChange, indicatorStyle, selectedValue, baseId],
  );

  return (
    <SectionTabsContext.Provider value={contextValue}>
      <div className={className} {...props}>
        {children}
      </div>
    </SectionTabsContext.Provider>
  );
};

const SectionTabsList = ({
  className,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SectionTabsListProps) => {
  const { indicatorStyle } = useSectionTabsContext('SectionTabs.List');

  return (
    <div
      className={cn(
        'border-black-4 relative flex h-[4.5rem] w-full gap-[0.4rem] border-b px-[0.8rem]',
        className,
      )}
      role='tablist'
      aria-orientation='horizontal'
      aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? 'Section tabs')}
      aria-labelledby={ariaLabelledBy}
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
};

const SectionTabContents = ({ value, className, children, ...props }: SectionTabContentsProps) => {
  const { value: selectedValue, baseId } = useSectionTabsContext('SectionTabs.Contents');
  const isSelected = value === selectedValue;
  const tabId = getSectionTabsId(baseId, value, 'tab');
  const panelId = getSectionTabsId(baseId, value, 'panel');

  return (
    <div
      id={panelId}
      role='tabpanel'
      aria-labelledby={tabId}
      aria-hidden={!isSelected}
      tabIndex={isSelected ? 0 : -1}
      hidden={!isSelected}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const SectionTabsTab = ({
  value,
  className,
  children,
  type = 'button',
  ...props
}: SectionTabsTabProps) => {
  const {
    value: selectedValue,
    handleValueChange,
    setIndicatorStyle,
    baseId,
  } = useSectionTabsContext('SectionTabs.Tab');
  const isSelected = value === selectedValue;
  const tabRef = React.useRef<HTMLButtonElement>(null);
  const tabId = getSectionTabsId(baseId, value, 'tab');
  const panelId = getSectionTabsId(baseId, value, 'panel');

  const handleIndicatorUpdate = React.useCallback(() => {
    const element = tabRef.current;
    if (!element) {
      return;
    }

    setIndicatorStyle({
      leftRem: element.offsetLeft / PX_PER_REM,
      widthRem: element.offsetWidth / PX_PER_REM,
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

  const handleTabClick = () => {
    handleValueChange(value);
  };

  const content = typeof children === 'function' ? children({ isSelected }) : children;

  return (
    <button
      type={type}
      data-selected={isSelected}
      id={tabId}
      role='tab'
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      className={cn(
        'caption-14-bd relative flex flex-1 items-center justify-center bg-transparent transition-colors',
        isSelected ? 'text-black-10' : 'text-black-5',
        className,
      )}
      ref={tabRef}
      onClick={handleTabClick}
      {...props}
    >
      {content}
    </button>
  );
};

const SectionTabs: SectionTabsComponent = Object.assign(SectionTabsRoot, {
  List: SectionTabsList,
  Tab: SectionTabsTab,
  Contents: SectionTabContents,
});

export default SectionTabs;
