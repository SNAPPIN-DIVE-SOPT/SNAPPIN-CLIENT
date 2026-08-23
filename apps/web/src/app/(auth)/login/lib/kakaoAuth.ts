import { SERVER_API_BASE_URL } from '@/api/constants/api';

const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL;

const AUTHORIZE_BASE_URL = 'https://kauth.kakao.com/oauth/authorize';

/**
 * 카카오 로그인 인가 요청 URL을 만듭니다.
 * @param returnTo 로그인 완료 후 돌아갈 내부 경로 (선택). state 파라미터로 전달됨
 * @returns 카카오 인가 URL, 클라이언트 ID/리다이렉트 URI가 없으면 null
 * @example const url = getKakaoAuthorizeUrl('/mypage');
 */
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

/**
 * 카카오 로그인 콜백을 처리하는 서버 API URL을 만듭니다.
 * @returns 서버 로그인 API URL, 필요한 환경변수가 없으면 null
 * @example const url = getKakaoLoginApiUrl();
 */
export const getKakaoLoginApiUrl = () => {
  if (!REDIRECT_URI || !SERVER_API_BASE_URL) {
    return null;
  }

  return `${SERVER_API_BASE_URL}/api/v2/auth/login/kakao?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
};
