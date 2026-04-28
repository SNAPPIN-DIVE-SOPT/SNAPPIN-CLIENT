import { SERVER_API_BASE_URL } from '@/api/constants/api';

const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL;

const AUTHORIZE_BASE_URL = 'https://kauth.kakao.com/oauth/authorize';

export const getKakaoAuthorizeUrl = (returnTo?: string) => {
  if (!CLIENT_ID || !REDIRECT_URI) {
    return null;
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
  });

  if (returnTo) {
    params.set('state', new URLSearchParams({ returnTo }).toString());
  }

  return `${AUTHORIZE_BASE_URL}?${params.toString()}`;
};

export const getKakaoLoginApiUrl = () => {
  if (!REDIRECT_URI || !SERVER_API_BASE_URL) {
    return null;
  }

  return `${SERVER_API_BASE_URL}/api/v2/auth/login/kakao?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
};
