import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { preconnect, preload } from 'react-dom';
import '@/styles/global.css';
import { Providers } from './providers';
import GoogleAnalytics from '@/lib/GoogleAnalytics';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Snappin'",
  description: '나만의 무드로 연결되는 스냅',
  icons: {
    icon: '/imgs/favicon.ico',
  },
  openGraph: {
    title: "Snappin'",
    description: '나만의 무드로 연결되는 스냅',
    url: 'https://snappin-client.vercel.app/',
    siteName: "Snappin'",
    images: [
      {
        url: 'https://snappin-client.vercel.app/imgs/thumbnail.png',
        width: 1200,
        height: 630,
        alt: "Snappin' 썸네일",
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Snappin'",
    description: '나만의 무드로 연결되는 스냅',
    images: ['https://snappin-client.vercel.app/imgs/thumbnail.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preconnect('https://cdn.jsdelivr.net', { crossOrigin: 'anonymous' });
  preload(
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
    { as: 'style' },
  );

  return (
    <html lang='ko'>
      <body>
        {GTM_ID && (
          <>
            <Script
              id='google-tag-manager'
              strategy='afterInteractive'
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height='0'
                width='0'
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
