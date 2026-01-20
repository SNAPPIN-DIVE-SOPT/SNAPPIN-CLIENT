//TODO: logout, refresh api 호출
import { SERVER_API_BASE_URL } from '@/api/constants/api';

export const getRefreshToken = async () => {
  //TODO: 서버측 api 연결되면 refresh api 호출
  const refreshResponse = await fetch(`${SERVER_API_BASE_URL}/api/v1/auth/reissue`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  return refreshResponse;
};

export const logoutApi = async () => {
  //TODO: logout api 호출
  //deleteAccessToken
  //deleteUserType
};
