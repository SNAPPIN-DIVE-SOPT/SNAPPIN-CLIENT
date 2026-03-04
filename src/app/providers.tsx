'use client';

import dynamic from 'next/dynamic';
import { OverlayProvider } from 'overlay-kit';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from './get-query-client';

const ToastContainer = dynamic(() => import('@/ui/toast/ToastContainer'), {
  ssr: false,
});

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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
