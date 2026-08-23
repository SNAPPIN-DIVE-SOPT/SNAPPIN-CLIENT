import { overlay } from 'overlay-kit';

/**
 * 검색 시트(SearchSheet)를 오버레이로 엽니다.
 * @param key 시트를 새로 마운트하고 싶을 때 넘기는 React key (선택)
 * @example await openSearchSheet();
 */
export const openSearchSheet = async (key?: string) => {
  const { default: SearchSheet } =
    await import('@/app/(with-layout)/explore/components/search-sheet/SearchSheet');

  overlay.open(({ isOpen, close }) => <SearchSheet key={key} open={isOpen} onOpenChange={close} />);
};
