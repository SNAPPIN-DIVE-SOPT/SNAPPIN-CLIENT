import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import SectionTabs from './SectionTabs';
import { SECTION_TAB, SECTION_TAB_PRESET, getSectionTabLabel } from './types/sectionTabTheme';

const meta: Meta<typeof SectionTabs> = {
  title: 'UI/SectionTabs',
  component: SectionTabs,
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
  parameters: {
    docs: {
      description: {
        story:
          '클라이언트 홈에서 사용하는 기본 섹션 탭입니다.\n' +
          '포트폴리오 / 상품 탭으로 구성되며, 최소 탭 개수(2개) 사용 예시입니다.',
      },
    },
  },
};

export const DetailTabWithReviewCount: Story = {
  render: () => <SectionTabsTemplate tabs={SECTION_TAB_PRESET.DETAIL_TAB} reviewCount={12} />,
  parameters: {
    docs: {
      description: {
        story:
          '상품 상세 페이지에서 사용하는 섹션 탭입니다.\n' +
          '리뷰 탭에는 리뷰 개수가 동적으로 표시되며,\n' +
          '`getLabel` 함수를 통해 외부 데이터가 라벨에 반영되는 예시입니다.',
      },
    },
  },
};

export const AuthorReservation: Story = {
  render: () => <SectionTabsTemplate tabs={SECTION_TAB_PRESET.AUTHOR_RESERVATION} />,
  parameters: {
    docs: {
      description: {
        story:
          '작가 예약 관리 페이지(와프 참고)에서 사용하는 섹션 탭입니다.\n' +
          '4개 이상의 탭을 사용하는 대표적인 예시입니다.',
      },
    },
  },
};
