import { SNAP_CATEGORY, SnapCategoryLabel } from '@/constants/categories/snap-category';
import {
  IconMenuAiMood,
  IconMenuDaily,
  IconMenuGraduate,
  IconMenuJeju,
  IconMenuLove,
  IconMenuMusic,
  IconMenuSchool,
} from '@/assets';

export const MENU_LABEL = {
  AI_MOOD: 'AI 무드<br />큐레이션',
  SCHOOL: '우리학교<br />스냅명소',
  JEJU: '제주스냅',
} as const;

type MenuLabelKey = keyof typeof MENU_LABEL;
type MenuLabel = typeof MENU_LABEL[MenuLabelKey] | SnapCategoryLabel;
type MenuItem = { label: MenuLabel; icon: React.ReactNode; href: string };

export const MENU: MenuItem[] = [
  { label: MENU_LABEL.AI_MOOD, icon: <IconMenuAiMood />, href: '/ai-curation' },
  { label: MENU_LABEL.SCHOOL, icon: <IconMenuSchool />, href: 'https://www.instagram.com/snapping.mag' },
  { label: SNAP_CATEGORY.GRADUATION, icon: <IconMenuGraduate />, href: '/explore' },
  { label: SNAP_CATEGORY.WEDDING, icon: <IconMenuLove />, href: '/explore' },
  { label: MENU_LABEL.JEJU, icon: <IconMenuJeju />, href: '/explore' },
  { label: SNAP_CATEGORY.RECITAL, icon: <IconMenuMusic />, href: '/explore' },
  { label: SNAP_CATEGORY.COUPLE, icon: <IconMenuLove />, href: '/explore' },
  { label: SNAP_CATEGORY.DAILY, icon: <IconMenuDaily />, href: '/explore' },
];