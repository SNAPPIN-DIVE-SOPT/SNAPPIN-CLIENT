import { Suspense, type ReactNode } from 'react';
import ClientNavigation from '@/app/(auth)/on-boarding/components/client-navigation/ClientNavigation';
import { OnBoardingFormProvider } from '@/app/(auth)/on-boarding/hooks/useOnBoardingFormContext';
import { Navigation } from '@snappin/design-system';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <OnBoardingFormProvider>
      <div className='flex h-dvh w-full flex-col'>
        <Suspense fallback={<Navigation isFixed={true} />}>
          <ClientNavigation />
        </Suspense>
        {children}
      </div>
    </OnBoardingFormProvider>
  );
}
