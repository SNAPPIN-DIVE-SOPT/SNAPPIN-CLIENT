import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import SectionTabsNew from './SectionTabsNew';

const meta: Meta<typeof SectionTabsNew> = {
  title: 'UI/SectionTabsNew',
  component: SectionTabsNew,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '섹션 탭 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionTabsNew>;

type SectionTabsNewTemplateProps = {
  tabs: { label: string; value: string }[];
};

const SectionTabsNewTemplate = ({ tabs }: SectionTabsNewTemplateProps) => {
  const [activeValue, setActiveValue] = useState(tabs[0]?.value ?? '');

  return <SectionTabsNew tabs={tabs} activeValue={activeValue} onChange={setActiveValue} />;
};

const DEFAULT_TABS = [
  { label: '예약 현황', value: 'detail' },
  { label: '촬영 완료', value: 'done' },
];

export const Default: Story = {
  render: () => <SectionTabsNewTemplate tabs={DEFAULT_TABS} />,
};

const WIDE_TABS = [
  { label: '예약 현황', value: 'overview' },
  { label: '예약 현황', value: 'overview1' },
  { label: '예약 현황', value: 'overview2' },
  { label: '예약 현황', value: 'overview3' },
];

export const ThreeTabs: Story = {
  render: () => <SectionTabsNewTemplate tabs={WIDE_TABS} />,
};
