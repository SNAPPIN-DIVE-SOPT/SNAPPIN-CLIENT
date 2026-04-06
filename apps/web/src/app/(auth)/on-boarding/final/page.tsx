import { GraphicSuccess } from '@snappin/design-system/assets';
import ClientFooter from '@/app/(auth)/on-boarding/final/components/client-footer/ClientFooter';

export default function Page() {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-[1.4rem]'>
      <GraphicSuccess />
      <div className='flex flex-col items-center gap-[0.4rem]'>
        <h1 className='title-20-sb'>가입이 완료되었어요!</h1>
        <p className='caption-14-rg text-black-7'>홈에서 다양한 무드의 스냅을 탐색해보세요</p>
      </div>
      <ClientFooter />
    </div>
  );
}
