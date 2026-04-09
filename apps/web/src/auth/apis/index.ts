import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { AUTH_QUERY_KEY } from '@/query-key/auth';
import {
  GetUserInfoResponse,
  GetUserInfoData,
  GetSwitchedUserProfileResponse,
  PatchUserRoleData,
  CreateKakaoLoginData,
  GetOnboardingData
} from '@/swagger-api';
import { setAccessToken, getAccessToken, deleteAccessToken } from '../token';
import { deleteAuthUser, setAuthUser } from '../userType';
import { useToast } from '@/ui/toast/hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { isValidUserType } from '@snappin/shared/types';

// 카카오 로그인 API
type KakaoCodePayload = { code: string };

export const useKakaoLogin = (URL: string) => {
  return useMutation<CreateKakaoLoginData, Error, KakaoCodePayload>({
    mutationFn: async ({ code }) => {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Kakao login failed: ${res.status} ${text}`);
      }

      return res.json();
    },
  });
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
    onError: (e) => {
      console.error('로그아웃에 실패했습니다. error: ', e);
    },
  });
};

const logoutApi = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error('No access token available');

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

  await deleteAccessToken();
  await deleteAuthUser();

  return true;
};

// 리프레시 토큰 발급 API
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
        endPoint: '/api/v2/users/me',
        method: 'GET',
      });

      if (!res.data) {
        throw new Error('/api/v2/users/me 응답에 데이터가 존재하지 않습니다.');
      }
      return res.data;
    },
    enabled: !!isLogIn,
  });
};

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

    onSuccess: async (data) => {
      if (data.accessToken) await setAccessToken(data.accessToken);
      if (data.role && isValidUserType(data.role))
        await setAuthUser({ role: data.role, hasPhotographerProfile: true });

      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY.AUTH });
    },

    onError: () => {
      error('프로필 전환에 실패했습니다. 잠시 후 다시 시도해주세요.', undefined, 'top-[2rem]');
    },
  });
};

// 예약자 정보 조회 API
export const useGetUsersOnboarding = (isLogIn: boolean) => {
  return useQuery({
    queryKey: AUTH_QUERY_KEY.ONBOARDING_USER(),
    queryFn: async () => {
      try {
        const res = await apiRequest<GetOnboardingData>({
          endPoint: '/api/v1/users/onboarding',
          method: 'GET',
        });

        if (!res.data) {
          throw new Error('/api/v1/users/onboarding 응답에 데이터가 존재하지 않습니다.');
        }
        return res.data;
      } catch (error) {
        if (typeof error === 'string') {
          try {
            const parsed = JSON.parse(error);
            if (parsed.status === 404) return null;
          } catch {
            console.error(error);
          }
        }
        throw error;
      }
    },
    enabled: isLogIn,
  });
};