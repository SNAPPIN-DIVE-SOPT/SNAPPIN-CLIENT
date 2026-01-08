'use client';

import { useAtomValue } from 'jotai';
import { ToastDataAtom } from './toast.atom';
import Toast from './Toast';

export default function ToastContainer() {
  const toast = useAtomValue(ToastDataAtom);

  return (
    <div className='fixed-center top-[1rem] z-50 w-full px-[1rem]'>
      {toast && <Toast type={toast.type} message={toast.message} duration={toast.duration} />}
    </div>
  );
}
