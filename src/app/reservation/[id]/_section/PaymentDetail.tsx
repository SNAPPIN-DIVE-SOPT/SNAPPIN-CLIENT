import { Divider } from '@/ui';
import { formatPrice } from '@/utils/formatePrice';
import { Section } from '@/components/layout/reservation/SectionLayout';

type PaymentDetailProps = {
  basePrice: number;
  extraPrices?: { name?: string; amount?: number }[];
  totalPrice: number;
};

export default function PaymentDetail({
  basePrice,
  extraPrices = [],
  totalPrice,
}: PaymentDetailProps) {
  return (
    <Section title='결제 상세'>
      <Section.Card>
        <Section.Body>
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
          <Divider />
          <Section.Footer label='최종 결제 금액' value={formatPrice(totalPrice)} />
        </Section.Body>
      </Section.Card>
    </Section>
  );
}
