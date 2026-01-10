import { cn } from '@/utils/cn';
import { GraphicSuccess, GraphicError } from '@/assets';
import { Modal, ModalButtonProps } from '../base/Modal';
import { ResultModalType } from './types/type';
import { THEME } from './constants/theme';

type ResultModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  showCloseButton: boolean;
  type: ResultModalType;
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

export default function ResultModal({
  open,
  handleOpenChange,
  showCloseButton,
  type,
  title,
  description,
  buttons,
  layoutClassName,
  headerClassName,
  containerClassName,
  titleClassName,
  descriptionClassName,
  footerClassName,
}: ResultModalProps) {
  const { contentTheme, headerTheme } = THEME[type];

  return (
    <Modal
      open={open}
      handleOpenChange={handleOpenChange}
      showCloseButton={showCloseButton}
      className={cn(
        'flex flex-col justify-center w-[28.1rem] bg-black-1 border-0 rounded-[0.6rem]',
        contentTheme,
        layoutClassName
      )}
    >
      <Modal.Header className={cn('flex flex-col items-center', headerTheme, headerClassName)}>
        {type === 'success' ? <GraphicSuccess /> : <GraphicError />}
        <div className={cn('flex flex-col items-center', description && 'gap-[0.4rem]', containerClassName)}>
          <Modal.Title className={cn('font-16-md text-black-10 whitespace-pre-line', titleClassName)}>
            {title}
          </Modal.Title>
          {description &&
            <Modal.Description className={cn('caption-12-md text-black-7', descriptionClassName)}>
              {description}
            </Modal.Description>
          }
        </div>
      </Modal.Header>
      <Modal.Footer className={cn('flex flex-row gap-[0.5rem]', footerClassName)}>
        <Modal.Buttons buttons={buttons} />
      </Modal.Footer>
    </Modal>
  );
}