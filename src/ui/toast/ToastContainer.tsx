'use client';

import { useAtomValue } from 'jotai';
import { ToastDataAtom } from './toast.atom';
import Toast from './Toast';
import { cn } from '@/utils/cn';

export default function ToastContainer() {
  const toast = useAtomValue(ToastDataAtom);

  return (
    <div className={cn('fixed-center z-50 w-full px-[1rem]', toast?.className)}>
      {toast && <Toast type={toast.type} message={toast.message} duration={toast.duration} />}
    </div>
  );
}
