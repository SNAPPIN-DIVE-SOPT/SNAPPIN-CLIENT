'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { ROUTES } from '@/constants/routes/routes';
import PortfolioList from '@/ui/frame/portfolio/PortfolioList';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { useGetPortfolioList } from '@/app/photographer/[id]/api';

type PortfolioListSectionProps = {
  id: number;
  isLogIn: boolean;
};

export default function PortfolioListSection({ id, isLogIn }: PortfolioListSectionProps) {
  const { data, fetchNextPage, hasNextPage, dataUpdatedAt } = useGetPortfolioList(id, isLogIn);
  const { ref, inView } = useInView();

  const portfolioList = useMemo(() => {
    return (data?.pages.flatMap((page) => page.data?.portfolios ?? []) ?? [])
      .map(({ imageUrl, likeCount, ...rest }) => ({
        ...rest,
        likesCount: likeCount,
        image: { src: imageUrl, alt: '' }
      }));
  }, [data?.pages]);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = useMemo(() => {
    return ROUTES.PHOTOGRAPHER(id, { tab: 'PORTFOLIO' })
      .replace(/^\//, '')
      .replace('?', ':scroll?');
  }, [id]);
  useScrollRestoreOnParent(anchorRef, scrollKey, [portfolioList.length, dataUpdatedAt], {
    enabled: !!data,
    resetOnKeyChange: true,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (portfolioList.length === 0) {
    return (
      <section>
        <div className='flex min-h-[calc(100dvh-9.5rem-7.2rem)] items-center justify-center'>
          <span className='caption-14-rg text-black-6 text-center'>
            아직 작가님이
            <br />
            포트폴리오를 등록하지 않았어요
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className='mt-[17.1rem]'>
      <div ref={anchorRef} />
      <PortfolioList portfolios={portfolioList} />
      <div ref={ref} className='h-[0.1rem]' />
    </section>
  );
}
