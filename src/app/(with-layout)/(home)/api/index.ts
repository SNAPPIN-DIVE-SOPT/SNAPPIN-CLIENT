import { apiRequest } from "@/api/apiRequest";
import { ApiResponseBodyGetPlacePhotographerRecommendationResponseVoid, GetPlacePhotographerRecommendationResponse } from "@/swagger-api/data-contracts";

import { USER_QUERY_KEY } from "@/query-key/user";
import { useQuery } from "@tanstack/react-query";
export const useGetRecommendation = () => {
  return useQuery<GetPlacePhotographerRecommendationResponse>({
    queryKey: USER_QUERY_KEY.RECOMMENDATION_SNAP_PLACE(),
    queryFn: () => apiRequest<ApiResponseBodyGetPlacePhotographerRecommendationResponseVoid>({
        endPoint: '/api/v1/home/recommendation',
        method: 'GET',
      }).then((res) => {
        if (!res.data) throw new Error('No data from /api/v1/home/recommendation');
        return res.data;
      }), 
  })
};  