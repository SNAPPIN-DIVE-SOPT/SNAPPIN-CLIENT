'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from '@/ui/dialog/Dialog';

export default function PageClient() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    alert('confirm');
    setOpen(false);
  };

  return (
    <div>
      <br />
      <h1 className='text-2xl font-bold'>Dialog 예시입니다.</h1>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button className='cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white'>
            Open Dialog
          </button>
        </DialogTrigger>
        <DialogContent showCloseButton={true} className='w-full max-w-md bg-white'>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-between gap-2'>
            <button
              onClick={handleClose}
              className='w-full cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white'
            >
              Close
            </button>
            <button
              onClick={handleConfirm}
              className='w-full cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white'
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
