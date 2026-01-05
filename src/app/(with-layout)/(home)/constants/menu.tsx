import {
  IconMenuAiMood,
  IconMenuDaily,
  IconMenuGraduate,
  IconMenuJeju,
  IconMenuLove,
  IconMenuMusic,
  IconMenuSchool,
} from '@/assets';

type Menu = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

export const MENU: Menu[] = [
  {
    label: 'AI 무드<br />큐레이션',
    icon: <IconMenuAiMood />,
    href: '/',
  },
  {
    label: '우리학교<br />스냅명소',
    icon: <IconMenuSchool />,
    href: '/',
  },
  {
    label: '졸업스냅',
    icon: <IconMenuGraduate />,
    href: '/',
  },
  {
    label: '결혼스냅',
    icon: <IconMenuLove />,
    href: '/',
  },
  {
    label: '제주스냅',
    icon: <IconMenuJeju />,
    href: '/',
  },
  {
    label: '연주스냅',
    icon: <IconMenuMusic />,
    href: '/',
  },
  {
    label: '커플스냅',
    icon: <IconMenuLove />,
    href: '/',
  },
  {
    label: '일상스냅',
    icon: <IconMenuDaily />,
    href: '/',
  },
];
