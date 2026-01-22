import localFont from 'next/font/local';
import { Providers } from '@/app/providers';
import '@/styles/global.css';
import { Viewport } from 'next';

const suit = localFont({
  src: '../../public/fonts/PretendardVariable.ttf',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={suit.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
