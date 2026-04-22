'use client';

import { useAtomValue } from 'jotai';
import { ToastDataAtom } from '@/ui';
import Toast from './Toast';
import { cn } from '@snappin/design-system/lib/cn';

export default function ToastContainer() {
  const toast = useAtomValue(ToastDataAtom);

  return (
    <div className={cn('fixed-center z-50 w-full px-[1rem]', toast?.className)}>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          className={toast.className}
          duration={toast.duration}
        />
      )}
    </div>
  );
}
