
import { ExtraPriceResponse } from '@/swagger-api';
import { Section } from '@/components/layout/reservation/SectionLayout';
import { Divider } from '@snappin/design-system';
import { formatPrice } from '@snappin/shared/lib';

type ReceiptProps = {
  basePrice: number;
  extraPrice: ExtraPriceResponse[];
  totalPrice: number;
};

export default function Receipt({ basePrice, extraPrice, totalPrice }: ReceiptProps) {
  return (
    <Section title='결제 상세'>
      <Section.Card className='gap-[1.5rem] py-[1.7rem]'>
        <Section.Body>
          <Section.Row
            label='기본 촬영 비용'
            value={`${formatPrice(basePrice)}원`}
            className='justify-between'
            valueClassName='caption-14-bd'
          />
          {extraPrice.map((item, index) => (
            <Section.Row
              key={`${item.name ?? 'extra'}-${index}`}
              label={item.name ?? ''}
              value={`${formatPrice(item.amount ?? 0)}원`}
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
        </Section.Body>
      </Section.Card>
    </Section>
  );
}
