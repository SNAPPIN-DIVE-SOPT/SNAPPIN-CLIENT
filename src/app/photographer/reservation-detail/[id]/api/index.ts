import { PHOTOGRAPHER_QUERY_KEY } from "@/query-key/photographer";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/api/apiRequest";
import {
  GetReservationDetailData,
  ReservationDetailResponse,
} from "@/swagger-api/data-contracts";

export const useGetReservationDetail = (reservationId: number) => {
  return useQuery<ReservationDetailResponse>({
    queryKey: PHOTOGRAPHER_QUERY_KEY.RESERVATION_DETAIL(reservationId),
    enabled: !!reservationId, 
    queryFn: async () => {
      const res = await apiRequest<GetReservationDetailData>({
        endPoint: `/api/v1/reservations/${reservationId}`,
        method: "GET",
      });

      if (!res.success) {
        throw new Error(
          `Failed to fetch /api/v1/reservations/${reservationId}`
        );
      }

      return res.data!;
    },
  });
};