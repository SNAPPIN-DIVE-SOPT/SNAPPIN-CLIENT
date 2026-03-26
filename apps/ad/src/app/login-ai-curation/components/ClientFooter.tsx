"use client";
import Button from "@/src/components/Button";

export default function ClientFooter() {
  const handleButtonClick = () => {
    window.open(
      "https://www.instagram.com/snapping.mag/",
      "_blank",
    );
  };
  return (
    <Button
      buttonText="OPEN 소식 받아보기"
      onClick={handleButtonClick}
    />
  );
}
