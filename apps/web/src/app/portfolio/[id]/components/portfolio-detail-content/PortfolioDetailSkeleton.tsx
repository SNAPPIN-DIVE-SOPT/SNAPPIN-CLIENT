import { Divider } from '@snappin/design-system';
import { IconArrowForward } from '@snappin/design-system/assets';

export default function PortfolioDetailSkeleton() {
  return (
    <section>
      <div className='bg-black-3 aspect-[3/4] w-full' />
      <div className='flex flex-col gap-[0.8rem] px-[2rem] py-[1.6rem]'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-[0.6rem]'>
            <div className='bg-black-3 h-[1.9rem] w-[16rem] rounded-[0.2rem]' />
            <div className='bg-black-3 h-[2.1rem] w-[10rem] rounded-[0.2rem]' />
          </div>
          <div className='bg-black-3 h-[2rem] w-[4.6rem] rounded-[0.2rem]' />
        </div>
        <div className='bg-black-3 h-[1.8rem] w-[13rem] rounded-[0.2rem]' />
      </div>
      <div className='px-[2rem] pb-[2rem]'>
        <div className='border-black-4 rounded-[0.6rem] border-1 px-[2rem] pt-[2.2rem] pb-[2.1rem]'>
          <div className='flex items-center gap-[2rem]'>
            <div className='bg-black-3 relative h-[6.4rem] w-[6.4rem] shrink-0 rounded-full' />
            <div className='flex flex-1 shrink flex-col gap-[0.8rem]'>
              <div className='flex flex-col gap-[0.4rem]'>
                <div className='bg-black-3 h-[1.7rem] w-[3.7rem] rounded-[0.2rem]' />
                <div className='bg-black-3 h-[1.2rem] w-[9rem] rounded-[0.2rem]' />
              </div>
              <div className='flex flex-col gap-[0.4rem]'>
                <div className='bg-black-3 h-[1.2rem] w-[15.8rem] rounded-[0.2rem]' />
                <div className='bg-black-3 h-[1.2rem] w-[3.7rem] rounded-[0.2rem]' />
              </div>
            </div>
            <IconArrowForward className='text-black-6 w-[1.4rem]' />
          </div>
        </div>
      </div>
      <Divider thickness='large' color='bg-black-3' />
      <div className='bg-black-1 flex flex-col gap-[1.6rem] px-[1.8rem] py-[1.4rem]'>
        <div className='bg-black-3 w-[14rem] h-[1.9rem] rounded-[0.2rem]' />
        <div className='bg-black-1 flex flex-col items-start justify-center gap-[1rem] self-stretch'>
          <div className='flex gap-[1rem] w-full'>
            <div className='bg-black-3 relative w-[9rem] h-[9rem] rounded-[0.4rem]' />
            <div className='flex flex-col gap-[0.8rem] min-w-0'>
              <div className='flex flex-col gap-[0.4rem] text-black-10'>
                <div className='bg-black-3 relative w-[14rem] h-[1.3rem] rounded-[0.4rem]' />
                <div className='bg-black-3 relative w-[8rem] h-[2.1rem] rounded-[0.4rem]' />
              </div>
              <div className='flex flex-col gap-[0.8rem]'>
                <div className='bg-black-3 relative w-[12rem] h-[1.9rem] rounded-[0.4rem]' />
                <div className='bg-black-3 relative w-[10rem] h-[1.4rem] rounded-[0.4rem]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
