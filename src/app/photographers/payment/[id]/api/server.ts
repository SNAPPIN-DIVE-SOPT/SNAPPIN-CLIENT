import { apiRequest } from '@/api/apiRequest';
import { ApiResponseBodyReservationPriceResponseVoid } from '@/swagger-api/data-contracts';

export const getPaymentBasePrice = async (reservationId: number) => {
  try {
    const res = await apiRequest<ApiResponseBodyReservationPriceResponseVoid>({
      endPoint: `/api/v1/reservations/${reservationId}/price`,
      method: 'GET',
    });

    return res.data?.price ?? 0;
  } catch {
    return 0;
  }
};
