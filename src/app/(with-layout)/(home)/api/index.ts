import { apiRequest } from "@/api/apiRequest";
import { ApiResponseBodyGetCurationResponseVoid, GetCurationResponse, GetPlacePhotographerRecommendationResponse, GetPopularPortfolioListResponse } from "@/swagger-api/data-contracts";
import { useQuery } from "@tanstack/react-query";
import { SERVER_API_BASE_URL } from "@/api/constants/api";
import { USER_QUERY_KEY } from "@/query-key/user";

export const useGetRecommendation = () => {
  //토큰 불필요 api 이므로 fetch 사용
  return useQuery<GetPlacePhotographerRecommendationResponse>({
    queryKey: USER_QUERY_KEY.RECOMMENDATION_SNAP_PLACE(),
    queryFn: () => fetch(`${SERVER_API_BASE_URL}/api/v1/home/recommendation`, {
      method: 'GET',
    }).then((res) => res.json()).then((data) => {
 
      return data.data;
    }), 

  })
};  

//비로그인 시 인기 무드 기반 포폴 추천
export const useGetPopularPortfoliosRecommendation = (enabled?: boolean) => {
  return useQuery<GetPopularPortfolioListResponse>({
    queryKey: USER_QUERY_KEY.RECOMMENDATION_PORTFOLIOS_PORTFOLIOS(),
    enabled: enabled ?? true,
    queryFn: () => fetch(`${SERVER_API_BASE_URL}/api/v1/portfolios/popular`, {
      method: 'GET',
    }).then((res) => res.json()).then((data) => {
      return data.data;
    }),
  })
};

//로그인 시 큐레이션 기반 포폴 추천
export const useGetPortfoliosRecommendation = (enabled?: boolean) => {
  return useQuery<GetCurationResponse>({
    queryKey: USER_QUERY_KEY.RECOMMENDATION_PORTFOLIOS_PORTFOLIOS(),
    enabled: enabled ?? true,
    queryFn: () => apiRequest<ApiResponseBodyGetCurationResponseVoid>({
      endPoint: '/api/v1/portfolios/recommendation',
      method: 'GET',
    }).then((res) => {
      if (!res.data) throw new Error('No data from /api/v1/portfolios/recommendation');
      return res.data;
    }),
  })
};