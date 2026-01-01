import type { SECTION_TAB } from './sectionTabTheme';

export type SectionTabsProps = {
  tabs: readonly SECTION_TAB[];
  selectedTab: SECTION_TAB;
  onChangeTab: (tab: SECTION_TAB) => void;
  getLabel: (tab: SECTION_TAB) => string;
};
