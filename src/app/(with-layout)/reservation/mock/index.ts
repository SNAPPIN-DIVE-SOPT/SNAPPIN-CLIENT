export { RESERVATION_MOCK } from './reservationList.mock';

export type ReservationListItemMock = (typeof import('./reservationList.mock').RESERVATION_MOCK)['reservations'][number];
