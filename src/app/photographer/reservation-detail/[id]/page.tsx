import NavigationClient from './components/navigation-client/Navigation.client';
import { RESERVATION_DETAIL_MOCK } from './mock/reservationDetail.mock';

import PageClient from './page.client';
import { notFound } from 'next/navigation';

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};
export default async function Page({ params }: ReservationDetailPageProps) {
  const { id } = await params;
  console.log(id);
  if (!id) {
    return notFound();
  }
  //TODO: 서버 데이터 연동( 파라미터에 id 추가)
  const data = RESERVATION_DETAIL_MOCK;

  return (
    <div className='bg-black-3 flex flex-col'>
      <NavigationClient />
      <PageClient id={id} />
    </div>
  );
}
