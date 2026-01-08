import { cn } from '@/utils/cn';
import { Button } from '@/ui';
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
import { ModalType } from './types/modalType';
import { ModalTitle, MODAL_CONTENT } from './constants/modalContent';
import { MODAL_THEME } from './constants/modalTheme';

const renderTitle = (title: ModalTitle) => {
  const { type, text } = title;

  if (type === 'multiple') {
    return text.map((line, idx) => (
      <span className='block' key={idx}>{line}</span>
    ))
  }

  return text;
}

type ModalProps = {
  type: ModalType;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleLeftClick: () => void;
  handleRightClick: () => void;
}

export default function Modal({
  type,
  open,
  handleOpenChange,
  handleLeftClick,
  handleRightClick
}: ModalProps) {
  const { icon, title, description, leftButton, rightButton } = MODAL_CONTENT[type];
  const { contentClassName, headerClassName, titleClassName } = MODAL_THEME[type];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className='fixed inset-0 bg-[rgba(0, 0, 0, 0.20)]' />
        <DialogContent
          showCloseButton={false}
          className={cn('flex flex-col justify-center w-[28.1rem] bg-black-1 border-0 rounded-[0.6rem]', contentClassName)}
        >
          {/* 헤더 영역 - 아이콘, 제목, 설명 */}
          <DialogHeader className={cn('flex flex-col items-center', headerClassName)}>
            {icon}
            <div className={cn('flex flex-col items-center', description && 'gap-[0.4rem]')}>
              <DialogTitle className={cn('flex flex-col items-center font-16-md text-black-10', titleClassName)}>{renderTitle(title)}</DialogTitle>
              <DialogDescription className='caption-12-md text-black-7'>{description}</DialogDescription>
            </div>
          </DialogHeader>
          {/* 푸터 영역 - 좌측 버튼, 우측 버튼 */}
          <DialogFooter className='flex flex-row gap-[0.5rem]'>
            <DialogClose asChild>
              <Button
                size='medium'
                disabled
                onClick={handleLeftClick}
              >
                {leftButton}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                size='medium'
                color='black'
                onClick={handleRightClick}
              >
                {rightButton}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>  
      </DialogPortal>
    </Dialog>
  );
}