import { Divider } from '@/ui/divider';
import { formatPrice } from '@/utils/formatPrice';
import { Section } from '@/components/layout/reservation/SectionLayout';

type ReceiptProps = {
  basePrice: number;
  extraPrices?: { name?: string; amount?: number }[];
  totalPrice: number;
};

export default function Receipt({ basePrice, extraPrices, totalPrice }: ReceiptProps) {
  return (
    <Section title='결제 상세'>
      <Section.Card className='gap-[1.5rem] py-[1.7rem]'>
        <Section.Row
          label='기본 촬영 비용'
          value={`${formatPrice(basePrice)}원`}
          className='justify-between'
          valueClassName='caption-14-bd'
        />
        {extraPrices?.map(({ name, amount }, index) => (
          <Section.Row
            key={`${name ?? 'extra'}-${index}`}
            label={name ?? `추가 비용 ${index + 1}`}
            value={`${formatPrice(amount ?? 0)}원`}
            className='justify-between'
            valueClassName='caption-14-bd'
          />
        ))}
        <Divider thickness='small' color='bg-black-3' />
        <Section.Footer
          label='최종 결제 금액'
          value={
            <div className='flex items-center gap-[0.2rem]'>
              <span className='title-23-eb'>{formatPrice(totalPrice)}</span>
              <span className='caption-14-md'>원</span>
            </div>
          }
        />
      </Section.Card>
    </Section>
  );
}
