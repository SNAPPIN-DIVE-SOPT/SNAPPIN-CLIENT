import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { getAccessToken } from '@/auth/token';

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