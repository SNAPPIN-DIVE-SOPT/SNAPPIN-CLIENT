import { ImageSlide } from '@snappin/design-system';
import { LogoFull } from '@snappin/design-system/assets';
import AnnouncementButton from '@/src/components/AnnouncementButton';

type PageProps = {
  params: Promise<{
    entry: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { entry } = await params;
  console.info('entry', entry);

  return (
    <main className='relative flex h-dvh flex-col items-center'>
      <div className='mt-[6.5rem] mb-[6rem] flex flex-col items-center gap-[1.2rem]'>
        <LogoFull className='text-black-10 h-[3.3rem] w-[18.7rem]' />
        <h1 className='title-20-bd'>나만의 무드에서 시작되는 스냅</h1>
      </div>
      <ImageSlide tagChipVariant='neon-outline' />

      <div className='absolute bottom-[2rem] flex flex-col items-center gap-[2.1rem]'>
        <h2 className='title-20-bd'>26.01.24 오픈 예정</h2>
        <AnnouncementButton />
      </div>
    </main>
  );
}
