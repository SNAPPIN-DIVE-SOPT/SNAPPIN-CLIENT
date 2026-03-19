import { ProductCardSkeleton, Divider } from '@snappin/design-system';
import { Section } from './SectionLayout';

export default function SectionSkeleton() {
  return (
    <div>
      <Section title='예약 요청 상품'>
        <div className='flex flex-col gap-[1.7rem]'>
          <ProductCardSkeleton className='px-0 py-0' />
          <div className='bg-black-3 h-[2.7rem] w-full rounded-[0.6rem]' />
        </div>
      </Section>
      <Divider thickness='large' color='bg-black-3' />

      <Section title='예약 상세'>
        <Section.Card>
          <div className='mt-[0.2rem] -mb-[0.5rem] flex flex-col gap-[0.6rem]'>
            <div className='bg-black-3 h-[2.0rem] w-[5.8rem]' />
            <div className='bg-black-3 h-[1.3rem] w-[10.2rem]' />
          </div>
          <Divider className='-mb-[0.5rem]' />
          <Section.Body>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className='bg-black-3 h-[1.4rem] w-[15rem]' />
            ))}
          </Section.Body>
        </Section.Card>
      </Section>
      <Divider thickness='large' color='bg-black-3' />
      <Section title='결제 상세' className='gap-[1.5rem]'>
        <Section.Card>
          <div className='bg-black-3 h-[1.4rem] w-full' />
          <Divider thickness='small' color='bg-black-3' />
          <div className='bg-black-3 h-[2.8rem] w-full' />
        </Section.Card>
      </Section>
    </div>
  );
}
