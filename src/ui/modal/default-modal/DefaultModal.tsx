import { cn } from '@/utils/cn';
import { Modal, ModalButtonProps } from '../base/Modal';
import { DefaultModalType } from './types/type';
import { THEME } from './constants/theme';
import { Content, CONTENT } from './constants/content';
import { BUTTONS } from './constants/buttons';

type BaseProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  showCloseButton: boolean;
  contentClassName?: string;
  headerClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
};

type DefaultProps = {
  type: 'default';
  content: Content;
  buttons: ModalButtonProps[];
} & BaseProps;

type PresetProps = {
  type: Exclude<DefaultModalType, 'default'>;
  buttons: Pick<ModalButtonProps, 'onClick'>[];
} & BaseProps;

export type DefaultModalProps = DefaultProps | PresetProps;

export default function DefaultModal(props: DefaultModalProps) {
  const {
    open,
    handleOpenChange,
    showCloseButton,
    contentClassName,
    headerClassName,
    containerClassName,
    titleClassName,
    descriptionClassName,
    footerClassName,
    type
  } = props;

  const content = type === 'default' ? props.content : CONTENT[type];
  const buttons = type === 'default'
    ? props.buttons
    : props.buttons.map((button, idx) => ({ ...BUTTONS[type][idx], onClick: button.onClick }));
  const theme = THEME[type];

  return (
    <Modal
      open={open}
      handleOpenChange={handleOpenChange}
      showCloseButton={showCloseButton}
      className={cn(
        'flex flex-col justify-center w-[28.1rem] bg-black-1 border-0 rounded-[0.6rem]',
        theme.contentTheme,
        contentClassName
      )}
    >
      <Modal.Header className={cn('flex flex-col items-center', theme.headerTheme, headerClassName)}>
        {content.icon}
        <div className={cn('flex flex-col items-center', content.description && 'gap-[0.4rem]', containerClassName)}>
          <Modal.Title className={cn('flex flex-col items-center font-16-md text-black-10 whitespace-pre-line', theme.titleTheme, titleClassName)}>
            {content.title}
          </Modal.Title>
          <Modal.Description className={cn('caption-12-md text-black-7', descriptionClassName)}>
            {content.description}
          </Modal.Description>
        </div>
      </Modal.Header>
      <Modal.Footer className={cn('flex flex-row gap-[0.5rem]', footerClassName)}>
        <Modal.Buttons buttons={buttons} />
      </Modal.Footer>
    </Modal>
  );
}