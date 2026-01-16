import { IconArrowBack, IconHome } from '@/assets';
import { IconButton, Navigation } from '@/ui';

export default function ClientHeader() {
  return (
    <Navigation
      left={
        <IconButton>
          <IconArrowBack />
        </IconButton>
      }
      center={<span className='caption-14-bd text-black-10'>리뷰 작성</span>}
      right={
        <IconButton>
          <IconHome />
        </IconButton>
      }
      className='border-black-5 items-center border-b'
    />
  );
}
