import { PHOTOGRAPHER_QUERY_KEY } from "@/query-key/photographer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/api/apiRequest";
import {
  ApiResponseBodyCompleteReservationResponseVoid,
  ApiResponseBodyConfirmReservationResponseVoid,
  ApiResponseBodyRefuseReservationResponseVoid,
  CompleteReservationResponse,
  ConfirmReservationResponse,
  GetReservationDetailData,
  RefuseReservationResponse,
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

export const useRefuseReservation = (reservationId: number) => {
  const queryClient = useQueryClient();
  return useMutation<RefuseReservationResponse, Error, number>({
    mutationFn: async (reservationId: number) => {
      const res = await apiRequest<ApiResponseBodyRefuseReservationResponseVoid>({
        endPoint: `/api/v1/reservations/${reservationId}/refuse`,
        method: "PATCH",
      });

      if (!res.data) {
        throw new Error(
          `Failed to fetch /api/v1/reservations/${reservationId}/refuse`
        );
      }

        return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHOTOGRAPHER_QUERY_KEY.RESERVATION_DETAIL(reservationId) });
    },
  });
};


export const useCompleteReservation = (reservationId: number) => {
  const queryClient = useQueryClient();
  
  return useMutation<CompleteReservationResponse, Error, number>({
    mutationFn: async (reservationId: number) => {
      const res = await apiRequest<ApiResponseBodyCompleteReservationResponseVoid>({
        endPoint: `/api/v1/reservations/${reservationId}/complete`,
        method: "PATCH",
      });

      if (!res.data) {
        throw new Error(
          `Failed to fetch /api/v1/reservations/${reservationId}/complete`
        );
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHOTOGRAPHER_QUERY_KEY.RESERVATION_DETAIL(reservationId) });
    },
  });
};

export const useConfirmReservation = (reservationId: number) => {
  const queryClient = useQueryClient();
  return useMutation<ConfirmReservationResponse, Error, number>({
    mutationFn: async (reservationId: number) => {
      const res = await apiRequest<ApiResponseBodyConfirmReservationResponseVoid>({
        endPoint: `/api/v1/reservations/${reservationId}/confirm`,
        method: "PATCH",
      });

      if (!res.data) {
        throw new Error(
          `Failed to fetch /api/v1/reservations/${reservationId}/confirm`
        );
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHOTOGRAPHER_QUERY_KEY.RESERVATION_DETAIL(reservationId) });
    },
  });
};