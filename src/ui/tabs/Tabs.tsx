import { HTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

type TabProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

type TabsListProps = HTMLAttributes<HTMLDivElement> & {
  activeValue: string;
  tabs: { value: string }[];
  children: ReactNode;
};

type TabItemProps = {
  value: string;
  activeValue: string;
  href: string;
  children: ReactNode;
  className?: string;
};

function Tab({ className, children, ...props }: TabProps) {
  return (
    <div className={cn('bg-black-1 w-full', className)} {...props}>
      {children}
    </div>
  );
}

function TabsList({ activeValue, tabs, className, children, ...props }: TabsListProps) {
  const selectedTabIndex = tabs.findIndex((tab) => tab.value === activeValue);
  const activeIndex = selectedTabIndex >= 0 ? selectedTabIndex : 0;
  const tabCount = tabs.length;

  return (
    <div
      role='tablist'
      className={cn('border-black-4 relative flex h-[4.5rem] w-full border-b px-[2rem]', className)}
      {...props}
    >
      {children}
      {tabCount > 0 && (
        <div
          className='bg-black-10 pointer-events-none absolute bottom-0 h-[0.2rem] transition-transform duration-200 ease-out'
          style={{
            left: '2rem',
            width: `calc((100% - 4rem) / ${tabCount})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      )}
    </div>
  );
}

function TabItem({ value, activeValue, href, children, className }: TabItemProps) {
  const isActive = value === activeValue;

  return (
    <Link
      role='tab'
      aria-selected={isActive}
      href={href}
      scroll={false}
      className={cn(
        'caption-14-bd flex flex-1 items-center justify-center transition-colors',
        isActive ? 'text-black-10' : 'text-black-5',
        className,
      )}
    >
      {children}
    </Link>
  );
}

const Tabs = Object.assign(Tab, { List: TabsList, Item: TabItem });

export default Tabs;
