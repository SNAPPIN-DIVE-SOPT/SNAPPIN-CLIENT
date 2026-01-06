'use client';

import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { ToastDataAtom } from './toast.atom';
import Toast from './Toast';

export default function ToastContainer() {
  const [isClient, setIsClient] = useState(false);

  const toast = useAtomValue(ToastDataAtom);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className='fixed-center top-[1rem] z-50 w-full px-[1rem]'>
      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
}
