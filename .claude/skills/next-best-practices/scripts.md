# 스크립트

## 기본 규칙

네이티브 `<script>` 태그 대신 항상 `next/script`를 쓴다. 로딩 성능 최적화가 자동으로 들어간다.

인라인 스크립트는 `id`가 필요하다 — Next.js가 이 값으로 스크립트를 추적하기 때문이다.

`next/script`를 `<head>` 안에 중첩해서 넣지 않는다. Script 컴포넌트가 알아서 위치를 관리한다.

```tsx
import Script from 'next/script'

<Script id="my-script" dangerouslySetInnerHTML={{ __html: 'console.log("loaded")' }} />
```

## 로딩 전략

- **`afterInteractive`** (기본값): 페이지가 인터랙티브해진 직후 실행
- **`lazyOnload`**: 브라우저가 유휴 상태일 때까지 지연
- **`beforeInteractive`**: 인터랙티브해지기 전 실행 (루트 레이아웃에서만)

## 서드파티 서비스

수동 구현 대신 `@next/third-parties`의 전용 컴포넌트를 쓴다:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXX" />
    </html>
  )
}
```
보일러플레이트 없이 최적화까지 자동으로 적용된다.
