import { LikeTab } from '@/app/(with-layout)/like/constants/tab';

type PortfolioEmptyProps = {
  tab?: LikeTab;
};

const EMPTY_MAP = {
  PORTFOLIO: {
    heading: '좋아요를 누른 포트폴리오가 없어요',
    description: "'탐색'에서 다양한 포트폴리오를 확인해보세요",
  },
  PRODUCT: {
    heading: '좋아요를 누른 상품이 없어요',
    description: "'탐색'에서 다양한 상품을 확인해보세요",
  },
};

export default function LikeEmpty({ tab }: PortfolioEmptyProps) {
  const { heading, description } = EMPTY_MAP[tab ?? 'PORTFOLIO'];

  return (
    <section className='bg-black-1 flex min-h-[calc(100dvh-7.2rem-5rem-4.5rem)] flex-col items-center justify-center gap-[0.4rem]'>
      <h3 className='font-18-bd text-black-9'>{heading}</h3>
      <span className='caption-14-md text-black-6'>{description}</span>
    </section>
  );
}
