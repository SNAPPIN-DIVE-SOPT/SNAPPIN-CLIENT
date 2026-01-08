import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactNode } from 'react';
import { useState } from 'react';

import SectionTabs from './SectionTabs';

const meta: Meta<typeof SectionTabs> = {
  title: 'UI/SectionTabs',
  component: SectionTabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '페이지별로 다른 섹션 구성을 가질 수 있는 공용 탭 컴포넌트입니다. queryKey를 지정하면 URL 쿼리와 탭 상태가 동기화됩니다.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SectionTabs>;

type SectionTabItem = {
  id: string;
  label: ReactNode;
  content: ReactNode;
};

type SectionTabsTemplateProps = {
  tabs: SectionTabItem[];
  listClassName?: string;
  tabClassName?: string;
  queryKey?: string;
};

const SectionTabsTemplate = ({
  tabs,
  listClassName,
  tabClassName = 'flex-1',
  queryKey,
}: SectionTabsTemplateProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.id ?? '');

  return tabs.length === 0 ? null : (
    <SectionTabs value={selectedTab} handleValueChange={setSelectedTab} queryKey={queryKey}>
      <SectionTabs.List className={listClassName}>
        {tabs.map((tab) => (
          <SectionTabs.Tab key={tab.id} value={tab.id} className={tabClassName}>
            {tab.label}
          </SectionTabs.Tab>
        ))}
      </SectionTabs.List>
      {tabs.map((tab) => (
        <SectionTabs.Contents
          key={`${tab.id}-panel`}
          value={tab.id}
          className='bg-black-1 mt-[1.6rem] rounded-[0.8rem] p-[1.2rem]'
        >
          {tab.content}
        </SectionTabs.Contents>
      ))}
    </SectionTabs>
  );
};

const defaultTabs: SectionTabItem[] = [
  { id: 'portfolio', label: '포트폴리오', content: '포트폴리오 콘텐츠' },
  { id: 'product', label: '상품', content: '상품 콘텐츠' },
  {
    id: 'review',
    label: (
      <span className='inline-flex items-center gap-1'>
        리뷰
        <span className='text-black-5'>(12)</span>
      </span>
    ),
    content: '리뷰 콘텐츠',
  },
];

export const Default: Story = {
  render: () => <SectionTabsTemplate tabs={defaultTabs} />,
};

export const FixedWidthTabs: Story = {
  render: () => <SectionTabsTemplate tabs={defaultTabs} tabClassName='flex-none w-28' />,
};

export const QuerySync: Story = {
  render: () => <SectionTabsTemplate tabs={defaultTabs} queryKey='sectionTab' />,
};
