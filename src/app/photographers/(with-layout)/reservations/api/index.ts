import { apiRequest } from "@/api/apiRequest";
import { ApiResponseBodyReservationListResponseVoid, ReservationListResponse } from "@/swagger-api/data-contracts";
import { useQuery } from "@tanstack/react-query";   
import { ReservationTab } from "../constants/tabs";
import { PHOTOGRAPHER_QUERY_KEY } from "@/query-key/photographer";

export const useGetReservationList = (tab: ReservationTab) => {
  return useQuery<ReservationListResponse>({
    queryKey: PHOTOGRAPHER_QUERY_KEY.RESERVATION_LIST(tab),
    queryFn: () => apiRequest<ApiResponseBodyReservationListResponseVoid>({
      endPoint: '/api/v1/reservations',
      method: 'GET',
      params: {
        tab,
      },
    }).then((res) => {
        if(!res.success) throw new Error('Failed to fetch /api/v1/reservations');
        return res.data ?? { reservations: [] } ;
      }),
  });
};