import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import SectionTabs from './SectionTabs';

const meta: Meta<typeof SectionTabs> = {
  title: 'UI/SectionTabs',
  component: SectionTabs,
  parameters: {
    docs: {
      description: {
        component: '페이지별로 다른 섹션 구성을 가질 수 있는 공용 탭 컴포넌트입니다.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SectionTabs>;

type SectionTabItem = {
  id: string;
  label: string;
  count?: number;
};

function SectionTabsTemplate({
  tabs,
  listClassName,
  tabClassName = 'flex-1',
}: {
  tabs: SectionTabItem[];
  listClassName?: string;
  tabClassName?: string;
}) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.id ?? '');

  return tabs.length === 0 ? null : (
    <SectionTabs value={selectedTab} onValueChange={setSelectedTab}>
      <SectionTabs.List className={listClassName}>
        {tabs.map((tab) => (
          <SectionTabs.Tab key={tab.id} value={tab.id} className={tabClassName}>
            {tab.count !== undefined ? (
              ({ isSelected }) => (
                <span className='inline-flex items-center gap-1'>
                  {tab.label}{' '}
                  <span className={isSelected ? 'text-black-10' : 'text-black-5'}>
                    ({tab.count})
                  </span>
                </span>
              )
            ) : (
              tab.label
            )}
          </SectionTabs.Tab>
        ))}
      </SectionTabs.List>
    </SectionTabs>
  );
}

const defaultTabs: SectionTabItem[] = [
  { id: 'portfolio', label: '포트폴리오' },
  { id: 'product', label: '상품' },
  { id: 'review', label: '리뷰', count: 12 },
];

export const Default: Story = {
  render: () => <SectionTabsTemplate tabs={defaultTabs} />,
};

export const FixedWidthTabs: Story = {
  render: () => <SectionTabsTemplate tabs={defaultTabs} tabClassName='flex-none w-28' />,
};
