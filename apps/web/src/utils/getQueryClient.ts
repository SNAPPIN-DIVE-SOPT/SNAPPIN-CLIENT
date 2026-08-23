import {
  isServer,
  QueryClient,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: 1,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        shouldRedactErrors: () => {
          return false
        },
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

/**
 * 환경에 맞는 QueryClient를 반환합니다. 서버에서는 매번 새로 만들고,
 * 브라우저에서는 싱글턴 인스턴스를 재사용합니다.
 * @returns QueryClient 인스턴스
 * @example const queryClient = getQueryClient();
 */
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}