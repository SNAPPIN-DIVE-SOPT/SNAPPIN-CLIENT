import OptionSection from '@/app/(with-layout)/explore/_section/OptionSection';
import { ExploreTab } from '@/app/(with-layout)/explore/constants/tab';
import ExploreSearchButton from '@/app/(with-layout)/explore/components/header/ExploreSearchButton';

type ExploreHeaderProps = {
  currentTab: ExploreTab;
  headline: string;
  isPlaceholder: boolean;
  searchSheetKey: string;
  portfolioTabHref: string;
  productTabHref: string;
};

export default function ExploreHeader({
  currentTab,
  headline,
  isPlaceholder,
  searchSheetKey,
  portfolioTabHref,
  productTabHref,
}: ExploreHeaderProps) {
  return (
    <header className='bg-black-1'>
      <div className='px-[2rem] py-[1.6rem]'>
        <ExploreSearchButton
          headline={headline}
          isPlaceholder={isPlaceholder}
          searchSheetKey={searchSheetKey}
        />
      </div>
      <OptionSection
        currentTab={currentTab}
        portfolioTabHref={portfolioTabHref}
        productTabHref={productTabHref}
      />
    </header>
  );
}
