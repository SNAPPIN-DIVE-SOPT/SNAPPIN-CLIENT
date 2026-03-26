import React from "react";
import Image from "next/image";
import BackgroundImage from "@/public/imgs/image-background.png";
import { IconLogo, IconSmallLogo } from "@/src/assets";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black-10 w-full flex flex-col items-center">
      {/* 배경 이미지 영역 */}
      <div className="relative w-full h-[44rem]">
        {/* background image */}
        <Image
          src={BackgroundImage}
          alt="background"
          fill
          priority
          className="object-cover"
        />

        {/* 이미지 위 오버레이 */}
        <div className="absolute inset-0 flex flex-col items-center justify-between">
          <IconLogo className="text-neon-black w-[27rem] h-[5.6rem] mt-[6.1rem]" />
          <div className="flex flex-col items-center gap-[0.4rem]">
            <h1 className="title-20-bd text-black-1">
              나만의 무드로 연결되는 스냅
            </h1>
            <p className="text-center caption-14-rg text-black-1">
              무드 태그로 내 취향에 딱 맞는
              <br />
              맞는 스냅 촬영을 예약해보세요
            </p>
          </div>
        </div>
      </div>

      {/* 하단 로고 */}
      <IconSmallLogo className="mt-[4.7rem] mb-[2.7rem]" />

      {children}

      {/* 하단 간단 소개 영역 */}
      <div className="flex flex-col items-center mt-[8.1rem] gap-[0.4rem] mb-[8rem]">
        <IconLogo className="w-[8.5rem] h-[1.5rem]" />
        <p className="text-center text-black-7 caption-14-md">
          ©2026 Snappin’ All rights reserved
        </p>
      </div>
    </div>
  );
}
