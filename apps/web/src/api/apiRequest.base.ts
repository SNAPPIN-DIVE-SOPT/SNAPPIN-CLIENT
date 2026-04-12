import { type RequestMethod, SERVER_API_BASE_URL } from '@/api/constants/api';

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

const resolveAccessToken = async (
  getAccessToken: CreateApiRequestDependencies['getAccessToken'],
) => {
  try {
    return getAccessToken();
  } catch {
    return null;
  }
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
  ): Promise<T | null> => {
    if (response.status === 401) {
      const refreshResponse = await getRefreshToken();

      if (refreshResponse.ok) {
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

        if (retryResponse.ok) {
          return await retryResponse.json();
        }

        throw await retryResponse.text();
      }
    } else if (response.status === 403) {
      throw new Error('권한 없는 사용자의 접근');
    } else {
      return null;
    }

    return null;
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
            error,
          });
        }

        throw error;
      }

      return await response.json();
    } catch (error) {
      if (typeof error === 'string') {
        try {
          const parsedError: unknown = JSON.parse(error);

          if (
            typeof parsedError !== 'object' ||
            parsedError === null ||
            !('status' in parsedError) ||
            parsedError.status !== 409
          ) {
            console.error(error);
          }
        } catch {
          console.error(error);
        }
      } else {
        console.error(error);
      }

      throw error;
    }
  };
};

export { buildRequestUrl };
