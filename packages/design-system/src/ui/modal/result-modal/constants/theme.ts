import { ResultModalType } from '../types/type';

type Theme = { contentTheme: string; headerTheme: string; };

export const THEME: Record<ResultModalType, Theme> = {
  'success': { contentTheme: 'p-[1.6rem] gap-[2rem]', headerTheme: 'gap-[1.3rem]' },
  'error': { contentTheme: 'p-[1.5rem] gap-[2rem]', headerTheme: 'gap-[1.4rem]' }
}