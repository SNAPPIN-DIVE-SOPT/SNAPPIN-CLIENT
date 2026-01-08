import { getAccessToken } from '../auth/token';
import { SERVER_API_BASE_URL, type RequestMethod } from './constants/api';
import { getRefreshToken } from '@/auth/apis/index';

interface ApiRequestProps {
  endPoint: string;
  method?: RequestMethod;
  data?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

const responseInterceptor = async <T>(
  response: Response,
  originalRequest: ApiRequestProps,
): Promise<T | null> => {
  if (response.status === 401) {
    const refreshResponse = await getRefreshToken();

    if (refreshResponse.ok) {
      const retryHeader: Record<string, string> = {
        'Content-Type': 'application/json',
        ...originalRequest.headers,
      };

      const fetchOptions: RequestInit = {
        method: originalRequest.method,
        headers: retryHeader,
        credentials: 'include',
      };

      if (originalRequest.data && originalRequest.method !== 'GET') {
        fetchOptions.body = JSON.stringify(originalRequest.data);
      }

      const retryResponse = await fetch(
        `${SERVER_API_BASE_URL}/${originalRequest.endPoint}`,
        fetchOptions,
      );

      if (retryResponse.ok) {
        const retryData = await retryResponse.json();
        return retryData;
      } else {
        const retryError = await retryResponse.text();

        throw retryError;
      }
    }
  } else if (response.status === 403) {
    //TODO: 서버측 api 연결되면 logout api 호출
    throw new Error('권한 없는 사용자의 접근');
  } else {
    return null;
  }
  return null;
};

export const apiRequest = async <T = unknown>({
  endPoint,
  method = 'GET',
  data,
  headers,
  params,
}: ApiRequestProps): Promise<T> => {
  const accessToken = await getAccessToken();

  try {
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    // 쿼리 파라미터가 있으면 URL에 추가
    let requestUrl = `${SERVER_API_BASE_URL}${endPoint}`;
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value);
        }
      });
      requestUrl += `?${searchParams.toString()}`;
    }

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    };

    const fetchOptions: RequestInit = {
      method,
      headers: defaultHeaders,
      credentials: 'include',
    };
    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }
    const response = await fetch(requestUrl, fetchOptions);
    const interceptedResponse = await responseInterceptor<T>(response, {
      endPoint,
      method,
      data,
      headers,
      params,
    });

    if (interceptedResponse) {
      return interceptedResponse as T;
    }

    if (!response.ok) {
      const error = await response.text();

      if (response.status !== 409) {
        console.error('API Response Error:', {
          status: response.status,
          statusText: response.statusText,
          url: requestUrl,
          error: error,
        });
      }

      throw error;
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    if (typeof error === 'string') {
      try {
        const parsedError = JSON.parse(error);
        if (parsedError.status !== 409) {
          console.error(error);
        }
      } catch {
        // JSON 파싱 실패 시 기본 에러 로그 출력
        console.error(error);
      }
    } else {
      console.error(error);
    }

    throw error;
  }
};
