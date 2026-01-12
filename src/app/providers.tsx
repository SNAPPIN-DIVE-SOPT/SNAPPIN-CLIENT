'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dynamic from 'next/dynamic';
import { OverlayProvider } from 'overlay-kit';

const ToastContainer = dynamic(() => import('@/ui/toast/ToastContainer'), {
  ssr: false,
});

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
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <ToastContainer />
        <div className='bg-black-1 mx-auto h-dvh max-w-[45rem] shadow-[0_0_10px_4px_rgba(0,0,0,0.04)]'>
          <div id='app-scroll' className='scrollbar-hide h-full overflow-y-auto'>
            {children}
          </div>
        </div>
      </OverlayProvider>
      <div className='bg-black-3 footer-height flex items-center justify-center'>
        <Logo className='text-black-5' width={100} height={20} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
