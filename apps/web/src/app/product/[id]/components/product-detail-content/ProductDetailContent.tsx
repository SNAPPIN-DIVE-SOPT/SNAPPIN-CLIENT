'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Tabs } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { PortfolioListSkeleton } from '@/ui';
import {
  PhotographerSection,
  PortfolioListSection,
  ProductDetailSection,
  ProductMainSection,
  ReviewListSection,
} from '../../_section';
import Footer from '../footer/Footer';
import { useGetProductDetail } from '../../api';
import { PRODUCT_TAB, PRODUCT_TABS } from '../../constants/tab';
import { ReviewListSectionSkeleton } from '../../_section/ReviewListSection';

type ProductDetailContentProps = {
  productId: number;
  tab: string;
};

export default function ProductDetailContent({ productId, tab }: ProductDetailContentProps) {
  const selectedTab = PRODUCT_TABS.some(({ value }) => value === tab)
    ? tab
    : PRODUCT_TAB.PRODUCT_DETAIL;

  const { data } = useGetProductDetail(productId);

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = useMemo(
    () => `${ROUTES.PRODUCT(productId).replace(/^\//, '')}:scroll`,
    [productId],
  );
  useScrollRestoreOnParent(anchorRef, scrollKey, [data]);

  return (
    <>
      <div ref={anchorRef} />
      <ProductMainSection
        id={data?.id ?? 0}
        images={data?.images ?? []}
        title={data?.title ?? ''}
        isLiked={data?.isLiked ?? false}
        averageRate={data?.averageRate ?? 0}
        reviewCount={data?.reviewCount ?? 0}
        price={data?.price ?? 0}
        photographer={data?.photographerInfo?.name ?? ''}
      />
      <PhotographerSection photographerInfo={data?.photographerInfo} />
      <Tabs>
        <Tabs.List activeValue={selectedTab} tabs={PRODUCT_TABS}>
          {PRODUCT_TABS.map(({ value, label }) => (
            <Tabs.Item
              key={value}
              value={value}
              activeValue={selectedTab}
              href={ROUTES.PRODUCT(Number(productId), { tab: value })}
            >
              {label}
              {value === PRODUCT_TAB.REVIEW && ` (${data?.reviewCount})`}
            </Tabs.Item>
          ))}
        </Tabs.List>
        <div>
          {selectedTab === PRODUCT_TAB.PRODUCT_DETAIL && (
            <ProductDetailSection productInfo={data?.productInfo} />
          )}
          {selectedTab === PRODUCT_TAB.PORTFOLIO && (
            <div className='bg-black-1 mb-[8rem] p-[1rem]'>
              <Suspense fallback={<PortfolioListSkeleton />}>
                <PortfolioListSection productId={productId} />
              </Suspense>
            </div>
          )}
          {selectedTab === PRODUCT_TAB.REVIEW && (
            <Suspense fallback={<ReviewListSectionSkeleton />}>
              <ReviewListSection productId={productId} averageRate={data?.averageRate ?? 0} />
            </Suspense>
          )}
        </div>
      </Tabs>
      <Footer productId={productId} amount={data?.price ?? 0} />
    </>
  );
}
