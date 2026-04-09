import { overlay } from 'overlay-kit';

export const openSearchSheet = async (key?: string) => {
  const { default: SearchSheet } =
    await import('@/app/(with-layout)/explore/components/search-sheet/SearchSheet');

  overlay.open(({ isOpen, close }) => <SearchSheet key={key} open={isOpen} onOpenChange={close} />);
};
