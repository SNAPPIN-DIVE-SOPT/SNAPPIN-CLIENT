import { ModalType } from '../types/modalType';

type ModalTheme = {
  contentClassName: string;
  headerClassName: string;
  titleClassName?: string;
};

export const MODAL_THEME: Record<ModalType, ModalTheme> = {
  'success': { contentClassName: 'p-[1.6rem] gap-[2rem]', headerClassName: 'gap-[1.3rem]' },
  'error': { contentClassName: 'p-[1.5rem] gap-[2rem]', headerClassName: 'gap-[1.4rem]' },
  'cancelled': { contentClassName: 'p-[1.5rem] gap-[1.5rem]', headerClassName: 'gap-[1.4rem]', titleClassName: 'pt-[1rem]' },
  'rejected': { contentClassName: 'p-[1.5rem] gap-[1.5rem]', headerClassName: 'gap-[1.4rem]', titleClassName: 'pt-[1rem]' },
  'confirmed': { contentClassName: 'p-[1.5rem] gap-[1.5rem]', headerClassName: 'gap-[1.4rem]', titleClassName: 'pt-[1rem]' },
}