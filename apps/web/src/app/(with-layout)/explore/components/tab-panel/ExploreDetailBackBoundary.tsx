'use client';

import { ReactNode } from 'react';
import { EXPLORE_FROM_DETAIL_BACK } from '../../constants/storage-key';

type ExploreDetailBackBoundaryProps = {
  children: ReactNode;
  className?: string;
};

export default function ExploreDetailBackBoundary({
  children,
  className,
}: ExploreDetailBackBoundaryProps) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof Element)) return;
    const anchor = e.target.closest('a[href]');
    const href = anchor?.getAttribute('href');

    if (!href) return;
    if (!href.startsWith('/portfolio/') && !href.startsWith('/product/')) return;

    sessionStorage.setItem(EXPLORE_FROM_DETAIL_BACK, '1');
  };

  return (
    <main className={className} onClickCapture={(e) => handleClick(e)}>
      {children}
    </main>
  );
}
