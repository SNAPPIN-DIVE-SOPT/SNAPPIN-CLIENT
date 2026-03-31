import OptionSection from '@/app/(with-layout)/explore/_section/OptionSection';
import { ExploreTab } from '@/app/(with-layout)/explore/constants/tab';
import ExploreSearchButton from '@/app/(with-layout)/explore/components/header/ExploreSearchButton';

type ExploreHeaderProps = {
  currentTab: ExploreTab;
  headline: string;
  supportingText: string;
  searchSheetKey: string;
  portfolioTabHref: string;
  productTabHref: string;
};

export default function ExploreHeader({
  currentTab,
  headline,
  supportingText,
  searchSheetKey,
  portfolioTabHref,
  productTabHref,
}: ExploreHeaderProps) {
  return (
    <header className='bg-black-1'>
      <div className='px-[2rem] py-[1.6rem]'>
        <ExploreSearchButton
          headline={headline}
          supportingText={supportingText}
          searchSheetKey={searchSheetKey}
          supportingTextClassName='text-black-7'
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
