import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { USER_QUERY_KEY } from '@/query-key/user';
import {
  ReservationDetailResponse,
  GetReservationDetailData,
  CancelReservationResponse,
  UpdateReservationCancelData,
  UpdateReservationRequestPaymentData,
  RequestPaymentReservationResponse,
} from '@/swagger-api/data-contracts';

// 예약 상세 조회 API
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

// 예약 취소 API
export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation<CancelReservationResponse, Error, number>({
    mutationFn: async (reservationId) => {
      const response = await apiRequest<UpdateReservationCancelData>({
        endPoint: `/api/v1/reservations/${reservationId}/cancel`,
        method: 'PATCH',
      });

      if (!response.data) {
        throw new Error(`No data from /api/v1/reservations/${reservationId}/cancel`);
      }

      return response.data ?? null;
    },
    onSuccess: (_, reservationId) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.RESERVATION_DETAIL(reservationId) });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.RESERVATION_LISTS() });
    },
  });
};

// 결제 요청 API
export const useRequestPayment = () => {
  const queryClient = useQueryClient();

  return useMutation<RequestPaymentReservationResponse, Error, number>({
    mutationFn: async (reservationId) => {
      const response = await apiRequest<UpdateReservationRequestPaymentData>({
        endPoint: `/api/v1/reservations/${reservationId}/pay`,
        method: 'PATCH',
      });

      if (!response.data) {
        throw new Error(`No data from /api/v1/reservations/${reservationId}/pay`);
      }

      return response.data ?? null;
    },
    onSuccess: (_, reservationId) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.RESERVATION_DETAIL(reservationId) });
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.RESERVATION_LISTS() });
    },
  });
};
