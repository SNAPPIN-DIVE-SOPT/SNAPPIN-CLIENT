import { cn } from '@/utils/cn';
import { Modal, ModalButtonProps } from '../base/Modal';

type ConfirmModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  showCloseButton?: boolean;
  title: string;
  description?: string;
  buttons: ModalButtonProps[];
  layoutClassName?: string;
  headerClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
};

export default function ConfirmModal({
  open,
  handleOpenChange,
  showCloseButton = false,
  title,
  description,
  buttons,
  layoutClassName,
  headerClassName,
  containerClassName,
  titleClassName,
  descriptionClassName,
  footerClassName,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      handleOpenChange={handleOpenChange}
      showCloseButton={showCloseButton}
      className={cn(
        'flex flex-col justify-center gap-[1.5rem] w-[28.1rem] p-[1.5rem] bg-black-1 border-0 rounded-[0.6rem]',
        layoutClassName
      )}
    >
      <Modal.Header className={cn('flex flex-col items-center gap-[1.4rem]', headerClassName)}>
        <div className={cn('flex flex-col items-center', description && 'gap-[0.4rem]', containerClassName)}>
          <Modal.Title className={cn('pt-[1rem] font-16-md text-black-10 whitespace-pre-line', titleClassName)}>
            {title}
          </Modal.Title>
          {description && (
            <Modal.Description className={cn('caption-12-md text-black-7', descriptionClassName)}>
              {description}
            </Modal.Description>
          )}
        </div>
      </Modal.Header>
      <Modal.Footer className={cn('flex flex-row gap-[0.5rem]', footerClassName)}>
        <Modal.Buttons buttons={buttons} />
      </Modal.Footer>
    </Modal>
  );
}