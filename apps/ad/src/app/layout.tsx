import { preconnect, preload } from 'react-dom';
import '@/src/styles/global.css';
import { Providers } from '@/src/app/providers';
import GoogleAnalytics from '@/src/lib/GoogleAnalytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preconnect('https://cdn.jsdelivr.net', { crossOrigin: 'anonymous' });
  preload(
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
    { as: 'style' },
  );
  
  return (
    <html lang='ko'>
      <body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
