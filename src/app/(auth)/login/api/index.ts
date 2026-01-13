import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { CreateKakaoLoginData } from '@/swagger-api/data-contracts';
import { useMutation } from '@tanstack/react-query';

type KakaoCodePayload = { code: string };

export const useKakaoLoginMutation = () => {
  const CLIENT_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL;
  const URL =
    `${SERVER_API_BASE_URL}/api/v1/auth/login/kakao` +
    `?redirect_uri=${encodeURIComponent(CLIENT_REDIRECT_URI!)}`;

  return useMutation<CreateKakaoLoginData, Error, KakaoCodePayload>({
    mutationFn: async ({ code }) => {
      const res = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({ code: code }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Kakao login failed: ${res.status} ${text}`);
      }

      return res.json();
    },
  });
};
