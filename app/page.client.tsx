"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/shared/components/dialog/Dialog";
import { useState } from "react";

export default function PageClient() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    alert("confirm");
    setOpen(false);
  };

  return (
    <div>
      <br />
      <h1 className="text-2xl font-bold">Dialog 예시입니다.</h1>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Open Dialog
          </button>
        </DialogTrigger>
        <DialogContent
          showCloseButton={true}
          className="w-full max-w-md bg-white"
        >
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between gap-2">
            <button
              onClick={handleClose}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleConfirm}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
