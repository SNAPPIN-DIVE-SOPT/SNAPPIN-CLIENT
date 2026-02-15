import { overlay } from 'overlay-kit';

export const openSearchSheet = async (key?: string) => {
  const { SearchSheet } = await import('@/app/(with-layout)/explore/components');

  overlay.open(({ isOpen, close }) => <SearchSheet key={key} open={isOpen} onOpenChange={close} />);
};
