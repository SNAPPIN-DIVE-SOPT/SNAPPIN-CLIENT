import ClientHeader from './components/client-header/ClientHeader';
import { PAYMENT_MOCK } from './mock/payment.mock';
import PaymentDetailContainer from './components/payment-detail-container/PaymentDetailContainer';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  //TODO: basePrice 조회 API 연동
  const data = PAYMENT_MOCK;

  return (
    <div className='bg-black-3 flex min-h-dvh flex-col'>
      <ClientHeader />
      <PaymentDetailContainer id={Number(id)} basePrice={data.basePrice} />
    </div>
  );
}
