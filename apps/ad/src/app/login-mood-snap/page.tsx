import { IconLogoFull } from "@/src/assets";
import ImageSlide from "./components/ImageSlide";
import ClientFooter from "./components/ClientFooter";

export default function Page() {
  return (
    <div className="flex relative flex-col items-center h-dvh">
      <div className="flex flex-col items-center gap-[1.2rem] mb-[6rem] mt-[6.5rem]">
        <IconLogoFull className="w-[18.7rem] h-[3.3rem] text-black-10" />
        <h1 className="title-20-bd">나만의 무드에서 시작되는 스냅</h1>
      </div>
      <ImageSlide />

      <div className="flex flex-col items-center gap-[2.1rem] absolute bottom-[2rem]">
        <h1 className="title-20-bd">26.01.24 오픈 예정</h1>
        <ClientFooter />
      </div>
    </div>
  );
}
