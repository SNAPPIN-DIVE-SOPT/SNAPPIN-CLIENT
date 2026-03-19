import LikePageContent from './components/LikePageContent';
import Header from './component/header/Header';
import LikeTabs from './components/LikeTabs';
import { LIKE_TAB, type LikeTab } from './constants/tab';

const isLikeTab = (value: string | undefined): value is LikeTab =>
  value === LIKE_TAB.PORTFOLIO || value === LIKE_TAB.PRODUCT;

type LikePageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function Like({ searchParams }: LikePageProps) {
  const { tab } = await searchParams;
  const currentTab = isLikeTab(tab) ? tab : LIKE_TAB.PORTFOLIO;

  return (
    <div className='h-full min-h-0'>
      <div className='bg-black-1 sticky top-0 z-10 shrink-0'>
        <Header />
        <LikeTabs currentTab={currentTab} />
      </div>
      <LikePageContent currentTab={currentTab} />
    </div>
  );
}
