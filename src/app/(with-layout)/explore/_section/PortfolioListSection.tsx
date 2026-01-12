import Image from 'next/image';
import Link from 'next/link';
import { MOCK_PORTFOLIOS } from '@/app/(with-layout)/explore/mocks/portfolio';

export default function PortfolioListSection() {
  return (
    <section className='grid shrink-0 grid-cols-3 gap-[0.2rem] px-[2rem] pt-[2rem] pb-[2.533rem]'>
      {MOCK_PORTFOLIOS.map((portfolio) => (
        <Link
          href={`/portfolio/${portfolio.id}`}
          key={portfolio.id}
          className='relative aspect-square w-full overflow-hidden'
        >
          <Image
            src={portfolio.imageUrl}
            fill
            alt='프리뷰 이미지'
            className='aspect-square w-full'
          />
        </Link>
      ))}
    </section>
  );
}
