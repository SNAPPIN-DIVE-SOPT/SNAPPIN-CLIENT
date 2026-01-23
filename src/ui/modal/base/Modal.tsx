import { Button } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from './Dialog';

type ModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  showCloseButton: boolean;
  children: React.ReactNode;
  className?: string;
};

type ModalSlotProps = {
  children: React.ReactNode;
  className?: string;
};

export type ModalButtonProps = {
  label: string;
} & Omit<React.ComponentProps<typeof Button>, 'children'>;

type ModalButtonsProps = {
  buttons: ModalButtonProps[];
};

export function ModalRoot({
  open,
  handleOpenChange,
  showCloseButton,
  children,
  className,
  ...props
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={handleOpenChange} {...props}>
      <DialogPortal>
        <DialogOverlay className='bg-black-10/20 fixed inset-0' />
        <DialogContent showCloseButton={showCloseButton} className={className}>
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

function ModalHeader({ children, className }: ModalSlotProps) {
  return <DialogHeader className={className}>{children}</DialogHeader>;
}

function ModalTitle({ children, className }: ModalSlotProps) {
  return <DialogTitle className={className}>{children}</DialogTitle>;
}

function ModalDescription({ children, className }: ModalSlotProps) {
  return <DialogDescription className={className}>{children}</DialogDescription>;
}

function ModalFooter({ children, className }: ModalSlotProps) {
  return <DialogFooter className={className}>{children}</DialogFooter>;
}

function ModalButton({ label, onClick, ...props }: ModalButtonProps) {
  return (
    <DialogClose asChild>
      <Button onClick={onClick} {...props}>
        {label}
      </Button>
    </DialogClose>
  );
}

function ModalButtons({ buttons }: ModalButtonsProps) {
  return (
    <>
      {buttons.map(({ label, ...props }, idx) => (
        <Modal.Button key={idx} label={label} {...props} className='caption-14-md' />
      ))}
    </>
  );
}

type ModalComponent = typeof ModalRoot & {
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
  Footer: typeof ModalFooter;
  Button: typeof ModalButton;
  Buttons: typeof ModalButtons;
};

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Footer: ModalFooter,
  Button: ModalButton,
  Buttons: ModalButtons,
}) as ModalComponent;
