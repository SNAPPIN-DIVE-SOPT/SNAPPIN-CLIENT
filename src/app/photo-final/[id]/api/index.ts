import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { USER_QUERY_KEY } from '@/query-key/user';
import { ReservationDetailResponse, GetReservationDetailData } from '@/swagger-api/data-contracts';

export const useGetReservationDetail = (reservationId: number, isEnabled = true) => {
  const enabled = isEnabled && reservationId != null;

  return useQuery<ReservationDetailResponse>({
    queryKey: USER_QUERY_KEY.RESERVATION_DETAIL(reservationId),
    enabled,
    queryFn: async () => {
      const response = await apiRequest<GetReservationDetailData>({
        endPoint: `/api/v1/reservations/${reservationId}`,
        method: 'GET',
      });
      if (!response.data) throw new Error(`No data from /api/v1/reservations/${reservationId}`);
      return response.data;
    },
  });
};
