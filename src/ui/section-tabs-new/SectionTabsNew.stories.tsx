import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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

type SectionTabsNewStoryProps = {
  tabs: { label: string; value: string }[];
  activeValue?: string;
  basePath: string;
};

const SectionTabsNewTemplate = ({ tabs, activeValue, basePath }: SectionTabsNewStoryProps) => (
  <SectionTabsNew
    tabs={tabs}
    activeValue={activeValue ?? tabs[0]?.value ?? ''}
    basePath={basePath}
  />
);

const DEFAULT_TABS = [
  { label: '예약 현황', value: 'detail' },
  { label: '촬영 완료', value: 'done' },
];

export const Default: Story = {
  args: {
    tabs: DEFAULT_TABS,
    activeValue: DEFAULT_TABS[0].value,
    basePath: '/bookings',
  },
  render: (args) => <SectionTabsNewTemplate {...args} />,
};

const WIDE_TABS = [
  { label: '예약 현황', value: 'overview' },
  { label: '예약 현황', value: 'overview1' },
  { label: '예약 현황', value: 'overview2' },
  { label: '예약 현황', value: 'overview3' },
];

export const FourTabs: Story = {
  args: {
    tabs: WIDE_TABS,
    activeValue: WIDE_TABS[0].value,
    basePath: '/bookings',
  },
  render: (args) => <SectionTabsNewTemplate {...args} />,
};
