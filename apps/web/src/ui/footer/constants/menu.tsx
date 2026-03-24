import {
  IconHome,
  IconExplore,
  IconReservation,
  IconProfile,
  IconHeart,
  IconMessage,
  IconProduct,
  IconHomeFill,
  IconHeartFill,
  IconExploreFill,
  IconReservationFill,
  IconProductFill,
  IconProfileFill,
  IconMessageFill,
  IconMoodtest,
} from '@snappin/design-system/assets';
import { PHOTOGRAPHERS_ROUTES, ROUTES } from '@/constants/routes/routes';
import { USER_TYPE, UserType } from '@snappin/shared/types';

export type MenuItem = {
  href: string | null;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  label: string;
  isCenterRaised?: boolean;
};

const USER_MENU: MenuItem[] = [
  { href: ROUTES.HOME, activeIcon: <IconHomeFill />, inactiveIcon: <IconHome />, label: '홈' },
  {
    href: ROUTES.LIKE,
    activeIcon: <IconHeartFill />,
    inactiveIcon: <IconHeart />,
    label: '좋아요',
  },
  {
    href: ROUTES.AI_CURATION,
    activeIcon: <IconMoodtest width={48} height={48} />,
    inactiveIcon: <IconMoodtest width={48} height={48} />,
    label: '무드 테스트',
    isCenterRaised: true,
  },
  {
    href: ROUTES.EXPLORE(),
    activeIcon: <IconExploreFill />,
    inactiveIcon: <IconExplore />,
    label: '탐색',
  },
  {
    href: ROUTES.PROFILE,
    activeIcon: <IconProfileFill />,
    inactiveIcon: <IconProfile />,
    label: '프로필',
  },
];

const PHOTOGRAPHER_MENU: MenuItem[] = [
  { href: ROUTES.HOME, activeIcon: <IconHomeFill />, inactiveIcon: <IconHome />, label: '홈' },
  {
    href: null,
    activeIcon: <IconProductFill />,
    inactiveIcon: <IconProduct />,
    label: '상품 관리',
  },
  {
    href: PHOTOGRAPHERS_ROUTES.RESERVATIONS(),
    activeIcon: <IconReservationFill />,
    inactiveIcon: <IconReservation />,
    label: '예약 관리',
  },
  { href: null, activeIcon: <IconMessageFill />, inactiveIcon: <IconMessage />, label: '메시지함' },
  {
    href: PHOTOGRAPHERS_ROUTES.PROFILE,
    activeIcon: <IconProfileFill />,
    inactiveIcon: <IconProfile />,
    label: '프로필',
  },
];

export const getMenuItems = (isLogIn: boolean | null, role: UserType | null) => {
  if (isLogIn && role && role === USER_TYPE.PHOTOGRAPHER) return PHOTOGRAPHER_MENU;
  return USER_MENU;
};
