import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ComponentProps } from 'react';
import { Tabs } from '..';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

type TabItem = {
  label: string;
  value: string;
};

type TabsStoryArgs = ComponentProps<typeof Tabs> & {
  tabs: TabItem[];
  activeValue: string;
  basePath: string;
};

const TabsTemplate = ({ tabs, activeValue, basePath }: TabsStoryArgs) => {
  return (
    <Tabs>
      <Tabs.List activeValue={activeValue} tabs={tabs}>
        {tabs.map(({ label, value }) => {
          return (
            <Tabs.Item
              key={value}
              value={value}
              activeValue={activeValue}
              href={`${basePath}?tab=${value}`}
            >
              {label}
            </Tabs.Item>
          );
        })}
      </Tabs.List>
    </Tabs>
  );
};

export default meta;

type Story = StoryObj<TabsStoryArgs>;

const DEFAULT_TABS: TabItem[] = [
  { label: '포트폴리오', value: 'portfolio' },
  { label: '상품', value: 'product' },
];

const FOUR_TABS: TabItem[] = [
  { label: '예약 요청', value: 'acquire' },
  { label: '예약 조율중', value: 'contact' },
  { label: '예약 확정', value: 'complement' },
  { label: '촬영 완료', value: 'done' },
];

export const Default: Story = {
  args: {
    tabs: DEFAULT_TABS,
    activeValue: DEFAULT_TABS[0].value,
    basePath: '/explore',
  },
  render: (args) => <TabsTemplate {...args} />,
};

export const FourTabs: Story = {
  args: {
    tabs: FOUR_TABS,
    activeValue: FOUR_TABS[0].value,
    basePath: '/reservations',
  },
  render: (args) => <TabsTemplate {...args} />,
};
