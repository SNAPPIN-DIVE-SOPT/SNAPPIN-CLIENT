import { PHOTOGRAPHER_QUERY_KEY } from "@/query-key/photographer";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/api/apiRequest";
import { GetReservationDetailData, ReservationDetailResponse } from "@/swagger-api/data-contracts";

export const useGetReservationDetail = (id: number ) => {
    return useQuery<ReservationDetailResponse>({
        queryKey: PHOTOGRAPHER_QUERY_KEY.RESERVATION_DETAIL(id),
        queryFn: () => apiRequest<GetReservationDetailData>({
            endPoint: `/api/v1/reservations`,
            method: 'GET',
            params: {
                reservationId: id,
            },
            enabled: !!id,
        }).then((res) => {
            if(!res.success) throw new Error(`Failed to fetch /api/v1/reservations/${id}`);
            return res.data ?? {};
        }),
    }); 
};  