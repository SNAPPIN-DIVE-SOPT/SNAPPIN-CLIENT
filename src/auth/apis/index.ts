import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { AUTH_QUERY_KEY } from '@/query-key/auth';
import {
  GetUserInfoResponse,
  GetUserInfoData,
  GetSwitchedUserProfileResponse,
  PatchUserRoleData,
  LogoutData,
} from '@/swagger-api/data-contracts';
import { setAccessToken, getAccessToken } from '../token';
import { setUserType } from '../userType';
import { UserType } from '../constant/userType';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useAuth } from '../hooks/useAuth';

export const getRefreshToken = async () => {
  const refreshResponse = await fetch(`${SERVER_API_BASE_URL}/api/v1/auth/reissue`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  return refreshResponse;
};

// 유저 정보 조회 API
export const useGetUserInfo = () => {
  const { isLogIn } = useAuth();

  return useQuery<GetUserInfoResponse>({
    queryKey: AUTH_QUERY_KEY.AUTH,
    queryFn: async () => {
      const res = await apiRequest<GetUserInfoData>({
        endPoint: '/api/v1/users/me',
        method: 'GET',
      });

      if (!res.data) {
        throw new Error('/api/v1/users/me 응답에 데이터가 존재하지 않습니다.');
      }
      return res.data;
    },
    enabled: !!isLogIn,
  });
}

// 유저 프로필 전환 API
export const useSwitchUserProfile = () => {
  const queryClient = useQueryClient();
  const { error } = useToast();

  return useMutation<GetSwitchedUserProfileResponse, Error, void>({
    mutationFn: async () => {
      const res = await apiRequest<PatchUserRoleData>({
        endPoint: '/api/v1/users/role',
        method: 'PATCH',
      });

      if (!res.data) throw new Error('응답에 데이터가 없습니다.');
      return res.data;
    },

    onSuccess: (data) => {
      if (data.accessToken) setAccessToken(data.accessToken);
      if (data.role) setUserType(data.role as UserType);

      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY.AUTH });
    },

    onError: () => {
      error('프로필 전환에 실패했습니다. 잠시 후 다시 시도해주세요.', undefined, 'top-[2rem]');
    },
  });
};

export const usePrefetchUserProfile = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({ queryKey: AUTH_QUERY_KEY.AUTH });
  };
};
// apiRequest로 수정했는데 !res.data로 와서 주석처리해놓을게요
// export const logoutApi = async () => {
//   const res = await apiRequest<LogoutData>({
//     endPoint: '/api/v1/auth/logout',
//     method: 'POST',
//   })

//   if (!res.data) {
//     throw new Error('/api/v1/auth/logout 응답에 데이터가 존재하지 않습니다.');
//   }
//   return res.data;
// };
export const logoutApi = async () => {
  const accessToken = await getAccessToken();

  const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return true;
};

// 로그아웃 API
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: AUTH_QUERY_KEY.AUTH,
      });
    },
  });
}