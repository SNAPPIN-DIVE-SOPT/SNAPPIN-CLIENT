import { Tabs } from '@snappin/design-system';
import { ProfileRowSkeleton } from '@/ui';
import { PRODUCT_TAB, PRODUCT_TABS } from '../../constants/tab';

type ProductDetailSkeletonProps = {
  selectedTab: string;
};

export default function ProductDetailSkeleton({ selectedTab }: ProductDetailSkeletonProps) {
  return (
    <div>
      <div className='bg-black-3 aspect-[3/4] w-full' />
      <div className='flex w-full flex-col gap-[0.8rem] px-[2rem] py-[1.6rem] pb-[2.7rem]'>
        <div>
          <div className='flex h-[3rem] items-center justify-between'>
            <div className='bg-black-3 h-[2.2rem] w-[19rem] rounded-[0.2rem]' />
            <div className='bg-black-3 h-[2.4rem] w-[2.4rem] rounded-[0.2rem]' />
          </div>
          <div className='flex flex-col items-start gap-[0.4rem]'>
            <div className='bg-black-3 h-[2.2rem] w-[9.6rem] rounded-[0.2rem]' />
            <div className='bg-black-3 h-[2rem] w-[12rem] rounded-[0.2rem]' />
          </div>
        </div>
        <div className='bg-black-3 h-[1.4rem] w-[10.9rem] rounded-[0.2rem]' />
      </div>
      <ProfileRowSkeleton />
      <Tabs>
        <Tabs.List activeValue={selectedTab} tabs={PRODUCT_TABS} className='pointer-events-none'>
          {PRODUCT_TABS.map(({ value, label }) => (
            <Tabs.Item key={value} value={value} activeValue={selectedTab} href='#'>
              {label}
              {value === PRODUCT_TAB.REVIEW && ' (0)'}
            </Tabs.Item>
          ))}
        </Tabs.List>
        <div>
          {selectedTab === PRODUCT_TAB.PRODUCT_DETAIL && (
            <div className='flex items-center justify-center py-[4rem]'>
              <div className='border-black-4 border-t-black-1 h-[2.4rem] w-[2.4rem] animate-spin rounded-full border-[3px]' />
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
