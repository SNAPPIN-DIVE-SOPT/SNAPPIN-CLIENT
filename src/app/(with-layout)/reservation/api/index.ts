import { ReservationListResponse, GetReservationsData } from '@/swagger-api/data-contracts';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { USER_QUERY_KEY } from '@/query-key/user';
import { RESERVATION_TAB, type ReservationTab } from '../constants/tabs';

export const useGetReservationList = (
  tab: ReservationTab = RESERVATION_TAB.CLIENT_OVERVIEW,
  isEnabled = true,
) => {
  return useQuery<ReservationListResponse>({
    queryKey: USER_QUERY_KEY.RESERVATION_LIST(tab),
    queryFn: async () => {
      const response = await apiRequest<GetReservationsData>({
        endPoint: `/api/v1/reservations?tab=${tab}`,
        method: 'GET',
      });
      if (!response.data) throw new Error('No data from /api/v1/reservations');
      return response.data;
    },
    enabled: isEnabled,
  });
};
