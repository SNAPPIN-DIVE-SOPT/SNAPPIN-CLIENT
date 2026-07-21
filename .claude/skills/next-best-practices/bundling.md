# 번들링

## 서버와 호환되지 않는 패키지

`window`, `document`, `localStorage` 같은 브라우저 API를 쓰는 패키지는 Server Component에서 실패한다. 세 가지 해법:

**1. SSR 끄고 동적 import**
```tsx
import dynamic from 'next/dynamic'
const SomeChart = dynamic(() => import('some-chart-library'), { ssr: false })
```

**2. 서버 번들에서 제외**
```js
// next.config.ts
serverExternalPackages: ['problematic-package']
```
네이티브 바인딩이 있는 패키지(sharp, bcrypt)나 순환 의존성이 있을 때 쓴다.

**3. 클라이언트 컴포넌트로 감싸기**
문제되는 import를 `'use client'` 컴포넌트로 감싸서, Server Component가 자식으로 쓸 수 있게 한다.

## CSS

`<link>` 태그 대신 항상 CSS를 직접 import한다:
```tsx
import './styles.css'
import styles from './Button.module.css'
```

## 폴리필

Next.js는 `Promise`, `fetch`, `Map`, `Set` 등 흔한 폴리필을 자동 포함한다. CDN에서 중복으로 폴리필을 로드하지 않는다.

## ESM/CommonJS 충돌

import/require 에러가 나면 트랜스파일러를 쓴다:
```js
transpilePackages: ['some-esm-package']
```

## 번들 분석

```bash
next experimental-analyze
```
모듈 크기, import 체인, 트리맵을 시각적으로 확인할 수 있다.

## Turbopack 마이그레이션

webpack 전용 설정은 피한다. `serverExternalPackages`와 `transpilePackages`를 쓰면 Turbopack과도 호환된다.
