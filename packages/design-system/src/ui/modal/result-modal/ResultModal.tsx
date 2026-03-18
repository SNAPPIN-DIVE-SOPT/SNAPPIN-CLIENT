import { ResultModalType } from './types/type';
import { Modal, ModalButtonProps } from '../base/Modal';
import { THEME } from './constants/theme';
import { cn } from '../../../lib/cn';
import { GraphicError, GraphicSuccess } from '../../../assets';

type ResultModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  showCloseButton?: boolean;
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
  showCloseButton = false,
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
        'bg-black-1 flex w-[28.1rem] flex-col justify-center rounded-[0.6rem] border-0',
        contentTheme,
        layoutClassName,
      )}
    >
      <Modal.Header className={cn('flex flex-col items-center', headerTheme, headerClassName)}>
        {type === 'success' ? <GraphicSuccess /> : <GraphicError />}
        <div
          className={cn(
            'flex flex-col items-center',
            description && 'gap-[0.4rem]',
            containerClassName,
          )}
        >
          <Modal.Title
            className={cn('font-16-md text-black-10 whitespace-pre-line', titleClassName)}
          >
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
