import Image from 'next/image';
import Link from 'next/link';
import { MOCK_PORTFOLIOS } from '@/app/(with-layout)/explore/mocks/portfolio';

export default function PortfolioListSection() {
  const isPortfolioListEmpty = MOCK_PORTFOLIOS.length === 0;

  if (isPortfolioListEmpty)
    return (
      <section className='flex min-h-[calc(100vh-29.9rem)] items-center justify-center'>
        <span className='caption-14-rg text-black-6 text-center'>
          아직 작가님이
          <br />
          포트폴리오를 등록하지 않았어요
        </span>
      </section>
    );

  return (
    <section className='grid shrink-0 grid-cols-3 gap-[0.2rem] px-[2rem] pt-[2rem] pb-[2.533rem]'>
      {!isPortfolioListEmpty &&
        MOCK_PORTFOLIOS.map((portfolio) => (
          <Link
            href={`/portfolio/${portfolio.id}`}
            key={portfolio.id}
            className='relative aspect-square'
          >
            <Image
              src={portfolio.imageUrl}
              fill
              alt={`portfolio ${portfolio.id}`}
              sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
              className='object-cover'
            />
          </Link>
        ))}
    </section>
  );
}
