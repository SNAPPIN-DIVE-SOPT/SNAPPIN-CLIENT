import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PHOTOGRAPHER_QUERY_KEY } from "@/query-key/photographer";
import { apiRequest } from "@/api/apiRequest";
import {  ApiResponseBodyReservationPriceResponseVoid, ReservationPriceResponse, RequestPaymentReservationRequest } from "@/swagger-api/data-contracts";

export const useGetPaymentPrice = (reservationId: number) => {
  return useQuery<ReservationPriceResponse>({
    queryKey: PHOTOGRAPHER_QUERY_KEY.PRODUCT_PRICE(reservationId),
    queryFn: async () => {
      const res = await apiRequest<ApiResponseBodyReservationPriceResponseVoid>({
        endPoint: `/api/v1/reservations/${reservationId}/price`,
        method: "GET",

      });

      if (!res.data) {
        throw new Error(
          `Failed to fetch /api/v1/reservations/${reservationId}/price`
        );
      }

      return res.data;
    },
  });
};

export const useRequestPayment = (reservationId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payment: RequestPaymentReservationRequest) => {
      const res =
        await apiRequest({
          endPoint: `/api/v1/reservations/${reservationId}/request-payment`, 
          method: "PATCH",
          data: payment,     
        },);

      if (!res) {
        throw new Error(
          `Failed to fetch /api/v1/reservations/${reservationId}/request-payment`
        );
      }

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHOTOGRAPHER_QUERY_KEY.RESERVATION_DETAIL(reservationId) });
    },
  });
};