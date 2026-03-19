import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import {
  ApiResponseBodyPostPresignedUrlResponseVoid,
  PostPresignedUrlResponse,
  ReservationDetailResponse,
  GetReservationDetailData,
} from '@/swagger-api';
import { USER_QUERY_KEY } from '@/query-key/user';

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

export const useImageUpload = () => {
  return useMutation<PostPresignedUrlResponse, Error, { fileName: string; contentType: string }>({
    mutationFn: async ({ fileName, contentType }) => {
      const res = await apiRequest<ApiResponseBodyPostPresignedUrlResponseVoid>({
        endPoint: '/api/v1/reviews/image',
        method: 'POST',
        data: { fileName, contentType },
      });

      if (!res.data) {
        throw new Error('No data from POST /api/v1/reviews/image');
      }

      return res.data;
    },
  });
};

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { reservationId: number; rating: number; content: string; imageUrls: string[] }
  >({
    mutationFn: async ({ reservationId, rating, content, imageUrls }) => {
      await apiRequest<void>({
        endPoint: `/api/v1/reservations/${reservationId}/reviews`,
        method: 'POST',
        data: { reservationId, rating, content, imageUrls },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.RESERVATION_LISTS(),
      });
    },
  });
};
