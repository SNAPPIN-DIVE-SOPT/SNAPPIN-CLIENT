import localFont from 'next/font/local';
import { Providers } from '@/app/providers';
import '@/styles/global.css';
import { Metadata, Viewport } from 'next';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.ttf',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Snappin'",
  description: "나만의 무드에서 시작되는 스냅",
  icons: {
    icon: "/imgs/favicon.ico",
  },
  openGraph: {
    title: "Snappin'",
    description: "나만의 무드에서 시작되는 스냅",
    url: "https://snappin-client.vercel.app/",
    siteName: "Snappin'",
    images: [
      {
        url: "https://snappin-client.vercel.app/imgs/image-default.png",
        width: 1200,
        height: 630,
        alt: "Snappin' 썸네일",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snappin'",
    description: "나만의 무드에서 시작되는 스냅",
    images: ["https://snappin-client.vercel.app/imgs/image-default.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={pretendard.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
