import { notFound } from 'next/navigation';
import { productDetailOptions } from '@/app/product/[id]/api/options';
import PageClient from '@/app/product/[id]/reservation-form/page.client';
import { getQueryClient } from '@/utils/getQueryClient';

type ReservationFormPageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: ReservationFormPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    return notFound();
  }

  const queryClient = getQueryClient();
  const productDetail = await queryClient.fetchQuery(productDetailOptions(productId, false));
  const photographerId = productDetail.photographerInfo?.id;

  if (!photographerId) {
    return notFound();
  }

  return <PageClient photographerId={photographerId} />;
}
