import { type RequestMethod, SERVER_API_BASE_URL } from '@/api/constants/api';
import { ApiError, getApiErrorKind } from '@/api/apiError';

type InterceptResult<T> = { handled: true; data: T } | { handled: false };

export type ApiRequestProps = {
  endPoint: string;
  method?: RequestMethod;
  data?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string>;
};

type CreateApiRequestDependencies = {
  getAccessToken: () => string | undefined | null | Promise<string | undefined | null>;
  getRefreshToken: () => Response | Promise<Response>;
};

type ServerErrorBody = {
  success?: boolean;
  status?: number;
  message?: string;
  code?: string;
  meta?: unknown;
};

const resolveAccessToken = async (
  getAccessToken: CreateApiRequestDependencies['getAccessToken'],
) => {
  try {
    return getAccessToken();
  } catch {
    return null;
  }
};

/**
 * 실패한 응답을 파싱해 구조화된 ApiError로 변환합니다. JSON 응답이면 message
 * 필드를 우선 쓰고, 아니면 원본 텍스트나 상태 텍스트를 메시지로 씁니다.
 * @param response 실패한(ok가 아닌) fetch Response
 * @returns 상태 코드와 메시지를 담은 ApiError
 * @example const apiError = await parseErrorResponse(response);
 */
const parseErrorResponse = async (response: Response): Promise<ApiError> => {
  const rawText = await response.text();
  let body: unknown = rawText;
  let message = rawText || response.statusText;

  try {
    const parsed: unknown = JSON.parse(rawText);
    if (typeof parsed === 'object' && parsed !== null) {
      body = parsed;
      const parsedMessage = (parsed as ServerErrorBody).message;
      if (typeof parsedMessage === 'string' && parsedMessage.trim()) {
        message = parsedMessage;
      }
    }
  } catch {
    // rawText가 JSON이 아니면 그대로 사용한다.
  }

  return new ApiError(response.status, message, body);
};

const buildRequestUrl = (endPoint: string, params?: Record<string, string>) => {
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

  return requestUrl;
};

export const createApiRequest = ({
  getAccessToken,
  getRefreshToken,
}: CreateApiRequestDependencies) => {
  const responseInterceptor = async <T>(
    response: Response,
    originalRequest: ApiRequestProps,
  ): Promise<InterceptResult<T>> => {
    if (getApiErrorKind(response.status) === 'unauthorized') {
      const refreshResponse = await getRefreshToken();

      if (!refreshResponse.ok) {
        // 토큰 갱신 자체가 실패하면 가로채지 않고, 원래 401 응답을 그대로
        // 흘려보내 바깥의 공용 에러 처리(parseErrorResponse)가 처리하게 한다.
        return { handled: false };
      }

      const accessToken = await resolveAccessToken(getAccessToken);
      const retryHeader: Record<string, string> = {
        'Content-Type': 'application/json',
        ...originalRequest.headers,
      };

      if (accessToken) {
        retryHeader.Authorization = `Bearer ${accessToken}`;
      }

      const fetchOptions: RequestInit = {
        method: originalRequest.method,
        headers: retryHeader,
        credentials: 'include',
      };

      if (originalRequest.data && originalRequest.method !== 'GET') {
        fetchOptions.body = JSON.stringify(originalRequest.data);
      }

      const retryResponse = await fetch(
        buildRequestUrl(originalRequest.endPoint, originalRequest.params),
        fetchOptions,
      );

      if (!retryResponse.ok) {
        throw await parseErrorResponse(retryResponse);
      }

      return { handled: true, data: await retryResponse.json() };
    }

    if (getApiErrorKind(response.status) === 'forbidden') {
      // 사용자에게 보여줄 메시지는 고정 문구를 유지하되(기존 동작), 서버 응답
      // body는 버리지 않고 남겨서 디버깅 시 확인할 수 있게 한다.
      const parsedError = await parseErrorResponse(response);
      throw new ApiError(response.status, '권한 없는 사용자의 접근', parsedError.body);
    }

    return { handled: false };
  };

  return async <T = unknown>({
    endPoint,
    method = 'GET',
    data,
    headers,
    params,
  }: ApiRequestProps): Promise<T> => {
    const accessToken = await resolveAccessToken(getAccessToken);

    try {
      const requestUrl = buildRequestUrl(endPoint, params);

      const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
      };

      if (accessToken) {
        defaultHeaders.Authorization = `Bearer ${accessToken}`;
      }

      const fetchOptions: RequestInit = {
        method,
        headers: defaultHeaders,
        credentials: 'include',
      };

      if (data) {
        fetchOptions.body = JSON.stringify(data);
      }

      const response = await fetch(requestUrl, fetchOptions);
      const intercepted = await responseInterceptor<T>(response, {
        endPoint,
        method,
        data,
        headers,
        params,
      });

      if (intercepted.handled) {
        return intercepted.data;
      }

      if (!response.ok) {
        throw await parseErrorResponse(response);
      }

      return await response.json();
    } catch (error) {
      const isExpectedConflict =
        error instanceof ApiError && getApiErrorKind(error.status) === 'conflict';

      if (!isExpectedConflict) {
        console.error('API Request Error:', error);
      }

      throw error;
    }
  };
};

export { buildRequestUrl };
