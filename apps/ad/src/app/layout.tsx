import localFont from 'next/font/local';
import { Providers } from '@/src/app/providers';
import '@/src/styles/global.css';
import GoogleAnalytics from '../lib/GoogleAnalytics';

const suit = localFont({
  src: '../../public/fonts/SUIT-Variable.woff2',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={suit.className}>
      <body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
					<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
				) : null}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
