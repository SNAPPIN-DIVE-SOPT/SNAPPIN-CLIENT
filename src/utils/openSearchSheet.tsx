import { overlay } from 'overlay-kit';
import { SearchSheet } from '@/app/(with-layout)/explore/components';

export const openSearchSheet = () => {
  overlay.open(({ isOpen, close }) => <SearchSheet open={isOpen} onOpenChange={close} />);
};
