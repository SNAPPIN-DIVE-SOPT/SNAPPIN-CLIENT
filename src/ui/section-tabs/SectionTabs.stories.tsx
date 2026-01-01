import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import SectionTabs from './SectionTabs';
import { SECTION_TAB, SECTION_TAB_PRESET, getSectionTabLabel } from './types/sectionTabTheme';

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

function SectionTabsTemplate({
  tabs,
  reviewCount,
}: {
  tabs: readonly SECTION_TAB[];
  reviewCount?: number;
}) {
  const [selectedTab, setSelectedTab] = useState<SECTION_TAB>(tabs[0]);

  return (
    <SectionTabs
      tabs={tabs}
      selectedTab={selectedTab}
      onChangeTab={setSelectedTab}
      getLabel={(tab) => getSectionTabLabel(tab, { reviewCount })}
    />
  );
}

export const ClientTab: Story = {
  render: () => <SectionTabsTemplate tabs={SECTION_TAB_PRESET.CLIENT_TAB} />,
};

export const DetailTabWithReviewCount: Story = {
  render: () => <SectionTabsTemplate tabs={SECTION_TAB_PRESET.DETAIL_TAB} reviewCount={12} />,
};

export const AuthorReservation: Story = {
  render: () => <SectionTabsTemplate tabs={SECTION_TAB_PRESET.AUTHOR_RESERVATION} />,
};
