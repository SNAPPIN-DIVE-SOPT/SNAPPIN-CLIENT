# 폰트 최적화

## `next/font`가 기본

`next/font`를 쓰면 레이아웃 시프트 없이 자동으로 폰트가 최적화된다.

```tsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

## 여러 폰트 & CSS 변수

여러 서체를 쓸 땐 CSS 커스텀 프로퍼티로 중복 import를 피한다:

```tsx
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })
```
CSS에서는 `font-family: var(--font-inter);`로 참조한다.

## 굵기/스타일 지정

번들 크기를 줄이려면 필요한 굵기만 지정한다:
- 단일: `weight: '400'`
- 복수: `weight: ['400', '500', '700']`
- 가변 폰트(권장): `weight`를 생략하면 모든 굵기 포함

## 로컬 폰트

```tsx
import localFont from 'next/font/local'
const myFont = localFont({ src: './fonts/MyFont-Variable.woff2', variable: '--font-my-font' })
```

## Tailwind 연동

```js
// tailwind.config.js
theme: {
  extend: { fontFamily: { sans: ['var(--font-inter)'] } }
}
```

## 서브셋 프리로딩

필요한 문자셋만 로드한다: `subsets: ['latin']` 또는 `['latin', 'cyrillic']`

## display 전략

`display: 'swap'`(권장)은 fallback을 먼저 보여주고 로드되면 교체한다.

## 흔한 실수

- 여러 컴포넌트에서 같은 폰트를 각자 import (중복 인스턴스 생성)
- `<link>` 태그나 `@import`로 폰트 로드
- 필요 없는 굵기까지 전부 로드
- subset 미지정
