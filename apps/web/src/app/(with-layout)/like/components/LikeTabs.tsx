import { Tabs } from '@snappin/design-system';
import { LIKE_TAB, LIKE_TAB_MAP, type LikeTab } from '../constants/tab';
import { ROUTES } from '@/constants/routes/routes';

const LIKE_TABS: { value: LikeTab; label: string }[] = [
  { value: LIKE_TAB.PORTFOLIO, label: LIKE_TAB_MAP[LIKE_TAB.PORTFOLIO] },
  { value: LIKE_TAB.PRODUCT, label: LIKE_TAB_MAP[LIKE_TAB.PRODUCT] },
];

type LikeTabsProps = {
  currentTab: LikeTab;
};

export default function LikeTabs({ currentTab }: LikeTabsProps) {
  return (
    <Tabs.List activeValue={currentTab} tabs={LIKE_TABS}>
      {LIKE_TABS.map(({ value, label }) => (
        <Tabs.Item
          key={value}
          value={value}
          activeValue={currentTab}
          href={`${ROUTES.LIKE}?tab=${value}`}
        >
          {label}
        </Tabs.Item>
      ))}
    </Tabs.List>
  );
}
