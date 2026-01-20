import ClientHeader from './components/client-header/ClientHeader';
import PaymentDetailContainer from './components/payment-detail-container/PaymentDetailContainer';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className='bg-black-3 flex min-h-dvh flex-col'>
      <ClientHeader />
      <PaymentDetailContainer id={Number(id)} />
    </div>
  );
}
