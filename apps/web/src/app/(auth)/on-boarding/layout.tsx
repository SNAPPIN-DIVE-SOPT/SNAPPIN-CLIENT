import type { ReactNode } from 'react';
import ClientNavigation from '@/app/(auth)/on-boarding/components/client-navigation/ClientNavigation';
import { OnBoardingFormProvider } from '@/app/(auth)/on-boarding/hooks/useOnBoardingFormContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <OnBoardingFormProvider>
      <div className='flex h-dvh w-full flex-col'>
        <ClientNavigation />
        {children}
      </div>
    </OnBoardingFormProvider>
  );
}
