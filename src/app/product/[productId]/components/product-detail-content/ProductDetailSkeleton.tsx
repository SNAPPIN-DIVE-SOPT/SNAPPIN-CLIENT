import { Tabs } from '@/ui';
import { IconArrowForward } from '@/assets';
import { PRODUCT_TAB, PRODUCT_TABS } from '../../constants/tab';

type ProductDetailSkeletonProps = {
  selectedTab: string;
}

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
            <div className='bg-black-3 h-[1.4rem] w-[9.9rem] rounded-[0.2rem]' />
            <div className='bg-black-3 h-[1.4rem] w-[4.3rem] rounded-[0.2rem]' />
          </div>
        </div>
        <div className='bg-black-3 h-[2.6rem] w-[10.9rem] rounded-[0.2rem]' />
      </div>
      <div className='px-[2rem] pb-[2rem]'>
        <div className='border-black-4 rounded-[0.6rem] border-1 p-[2rem] pt-[2.2rem] pb-[2.1rem]'>
          <div className='flex items-center gap-[1.2rem]'>
            <div className='bg-black-3 relative h-[6.4rem] w-[6.4rem] rounded-full shrink-0' />
            <div className='flex flex-1 flex-col gap-[0.8rem] shrink-1'>
              <div className='flex flex-col gap-[0.4rem]'>
                <div className='bg-black-3 h-[1.7rem] w-[3.7rem] rounded-[0.2rem]' />
                <div className='bg-black-3 h-[1.2rem] w-[9rem] rounded-[0.2rem]' />
              </div>
              <div className='flex flex-col gap-[0.4rem]'>
                <div className='bg-black-3 h-[1.2rem] w-[15.8rem] rounded-[0.2rem]' />
                <div className='bg-black-3 h-[1.2rem] w-[3.7rem] rounded-[0.2rem]' />
              </div>
            </div>
            <IconArrowForward className='text-black-6' />
          </div>
        </div>
      </div>
      <Tabs>
        <Tabs.List activeValue={selectedTab} tabs={PRODUCT_TABS}>
          {PRODUCT_TABS.map(({ value, label }) => (
            <Tabs.Item
              key={value}
              value={value}
              activeValue={selectedTab}
              href="#" 
            >
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
};
