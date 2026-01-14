import type { ComponentProps } from 'react';

import type { ReservationListItemMock } from '../mock/reservationList.mock';
import ReservationCard from '../components/reservation-card/ReservationCard';

type ReservationCardProps = ComponentProps<typeof ReservationCard>;
type ReservationMock = ReservationListItemMock['reservation'];

type CreateReservationCardPropsOptions = Pick<ReservationCardProps, 'reviewHref'>;

const createReservationCardProps = (
  reservation: ReservationMock,
  options?: CreateReservationCardPropsOptions,
) =>
  ({
    image: { src: reservation.product.imageUrl, alt: reservation.product.title },
    name: reservation.product.title,
    rate: reservation.product.rate,
    reviewCount: reservation.product.reviewCount,
    photographer: reservation.product.photographer,
    price: reservation.product.price,
    moods: reservation.product.moods,
    status: reservation.status,
    date: reservation.createdAt,
    href: `/reservation-detail/${reservation.reservationId}`,
    isReviewed: reservation.product.isReviewed,
    reviewHref: options?.reviewHref,
  }) satisfies ReservationCardProps;

export default createReservationCardProps;
