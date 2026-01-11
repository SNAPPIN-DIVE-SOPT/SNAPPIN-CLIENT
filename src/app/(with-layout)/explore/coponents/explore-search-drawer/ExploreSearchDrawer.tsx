import { BottomDrawer, Drawer, DrawerDescription, DrawerTitle, IconButton, Navigation } from '@/ui';
import { IconClose } from '@/assets';

type ExploreSearchDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ExploreSearchDrawer({ isOpen, onClose }: ExploreSearchDrawerProps) {
  return (
    <BottomDrawer
      isOpen={isOpen}
      handleOpenChange={onClose}
      className='bg-black-3 !inset-0 !top-0 !bottom-0 !m-0 h-dvh w-screen max-w-none rounded-none p-0'
    >
      <DrawerTitle hidden className='sr-only'>
        탐색 검색
      </DrawerTitle>
      <DrawerDescription hidden className='sr-only'>
        스냅 작가 탐색 검색 화면
      </DrawerDescription>
      <div className='bg-black-1 mx-auto h-full max-w-[45rem] px-[2rem] py-0'>
        <header>
          <Navigation
            center={
              <BottomDrawer.Title as='h3' className='caption-14-bd whitespace-nowrap'>
                어떤 스냅 작가를 찾고 있나요?
              </BottomDrawer.Title>
            }
            right={
              <IconButton type='button' onClick={onClose}>
                <IconClose />
              </IconButton>
            }
            className='p-0'
          />
        </header>
      </div>
    </BottomDrawer>
  );
}
