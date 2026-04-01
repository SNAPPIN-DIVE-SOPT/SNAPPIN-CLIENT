import { ImageSlide } from '@snappin/design-system';
import { LogoFull } from "@snappin/design-system/assets";
import { IMAGE_SLIDE_MOCK } from '@snappin/design-system/ui/image/image-slide/imageSlideMock';
import AnnouncementButton from "@/src/components/AnnouncementButton";

export default function Page() {
  return (
    <main className="flex relative flex-col items-center h-dvh">
      <div className="flex flex-col items-center gap-[1.2rem] mb-[6rem] mt-[6.5rem]">
        <LogoFull className="w-[18.7rem] h-[3.3rem] text-black-10" />
        <h1 className="title-20-bd">나만의 무드에서 시작되는 스냅</h1>
      </div>
      <ImageSlide data={IMAGE_SLIDE_MOCK.portfolios} tagChipVariant="neon-outline" />

      <div className="flex flex-col items-center gap-[2.1rem] absolute bottom-[2rem]">
        <h2 className="title-20-bd">26.01.24 오픈 예정</h2>
        <AnnouncementButton />
      </div>
    </main>
  );
}
