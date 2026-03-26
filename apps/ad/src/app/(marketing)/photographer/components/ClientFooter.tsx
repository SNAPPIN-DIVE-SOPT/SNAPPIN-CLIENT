"use client";
import Button from "@/src/components/Button";

export default function ClientFooter() {
  const handleButtonClick = () => {
    window.gtag?.('event', 'button_click', {
      button_name: 'photographer_join',
      page_path: '/photographer',
    });
    window.open(
      "https://pretty-shake-931.notion.site/Snappin-2eea9c9b4473802d9d2ddcb2a202bc18?source=copy_link",
      "_blank",
    );
  };
  return (
    <Button
      buttonText="작가 입점 방법 알아보기"
      onClick={handleButtonClick}
      className="mt-[5.1rem]"
    />
  );
}
