import ImagePhotographerAi from "@/public/imgs/image-photographer-ai.png";
import ImagePhotographerRegister from "@/public/imgs/image-photographer-register.png";
import Image from "next/image";
import MoodAnimation from "../_components/MoodAnimation";
import ClientFooter from "./components/ClientFooter";

export default function Page() {
  return (
    <div className="flex flex-col px-[2rem] w-full items-center">
      <div className="flex flex-col gap-[4.2rem] w-full">
        <div className="flex flex-col gap-[0.7rem] text-center">
          <h1 className="text-black-1  title-23-eb">
            AI 스냅 무드 분석을 통해
            <br />
            무드 취향이 딱 맞는 고객과 연결
          </h1>
          <h2 className="caption-14-rg text-black-6 ">
            내 무드를 좋아해주는 고객과 연결되어
            <br />더 만족스러운 스냅 촬영 경험을 선물하세요.
          </h2>
        </div>
        <Image src={ImagePhotographerAi} alt="작가 ai 이미지" />
      </div>
      <MoodAnimation />
      <div className="flex flex-col gap-[3.8rem] mt-[12.6rem]">
        <div className="flex flex-col gap-[0.7rem] text-center">
          <h1 className="text-black-1  title-23-eb">
            여러 플랫폼에 흩어져 있던 <br />
            예약 문의를 한 곳에,
          </h1>
          <h2 className="caption-14-rg text-black-6 ">
            인스타그램, 블로그 등 여러 채널에 흩어져 있던
            <br />
            예약 현황을 스냅핑에서 한 번에, 한눈에 관리하세요.
          </h2>
        </div>
        <Image src={ImagePhotographerRegister} alt="작가 포트폴리오 이미지" />
      </div>
      <ClientFooter />
    </div>
  );
}
