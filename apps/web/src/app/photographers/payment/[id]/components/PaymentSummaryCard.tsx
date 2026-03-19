import { IconAdd } from '@snappin/design-system/assets';
import { Button, Divider } from '@snappin/design-system';
import { type ExtraPrice } from '../hooks/paymentExtraPrice.atom';
import { formatPrice } from '@snappin/shared/lib';

type PaymentSummaryCardProps = {
  basePrice: number;
  extraPrices: ExtraPrice[];
  totalAmount: number;
  handleClickAddPayment: () => void;
};

type PaymentDetailRowProps = {
  label: string;
  price: number;
};

export default function PaymentSummaryCard({
  basePrice,
  extraPrices,
  totalAmount,
  handleClickAddPayment,
}: PaymentSummaryCardProps) {
  return (
    <div className='border-black-5 flex flex-col gap-[1.2rem] rounded-[0.6rem] border-1 p-[1.7rem]'>
      <PaymentDetailRow label='湲곕낯 珥ъ쁺 鍮꾩슜' price={basePrice} />

      {extraPrices.map((extraPrice, idx) => (
        <PaymentDetailRow
          key={`${extraPrice.name}-${idx}`}
          label={extraPrice.name}
          price={extraPrice.amount}
        />
      ))}

      <Button
        className='bg-black-3 text-black-8 flex items-center gap-[0.4rem]'
        size='large'
        onClick={handleClickAddPayment}
      >
        <IconAdd />
        <span className='caption-14-md'>촬영 비용 추가</span>
      </Button>

      <Divider thickness='small' color='bg-black-5' />

      <div className='flex items-center justify-between'>
        <span className='caption-14-bd'>최종 결제 금액</span>
        <div className='flex items-center gap-[0.2rem]'>
          <span className='title-23-eb'>{formatPrice(totalAmount)}</span>
          <span className='caption-14-md'>원</span>
        </div>
      </div>
    </div>
  );
}

function PaymentDetailRow({ label, price }: PaymentDetailRowProps) {
  return (
    <div className='flex items-center justify-between'>
      <span className='caption-12-md'>{label}</span>
      <div className='flex items-center gap-[0.2rem]'>
        <span className='caption-14-bd'>{formatPrice(price)}</span>
        <span className='caption-14-md'>원</span>
      </div>
    </div>
  );
}
