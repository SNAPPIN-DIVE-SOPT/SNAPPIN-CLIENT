---
name: next-best-practices
description: Next.js App Router 모범 사례 허브 스킬. 파일 컨벤션, RSC 경계, 비동기 API, 데이터 패턴, hydration 에러, 메타데이터, 라우트 핸들러, 이미지/폰트 최적화, 번들링 등을 다룹니다. Next.js 코드를 작성하거나 리뷰할 때, hydration 에러·RSC 위반·데이터 워터폴·설정 실수를 예방하기 위해 사용하세요. "Next.js에서 이거 어떻게 해", "라우트 핸들러 vs 서버 액션", "이미지 최적화", "hydration 에러 났어" 같은 질문에도 사용하세요.
---

# Next.js Best Practices

> 출처: [laguagu/claude-code-nextjs-skills](https://github.com/laguagu/claude-code-nextjs-skills) (MIT), 이 프로젝트(Next.js 16 App Router, `apps/web`·`apps/ad`)에 맞게 정리. 각 주제는 아래 링크된 파일에서 자세히 다룹니다 — 관련된 파일만 읽으세요.

코드를 작성하거나 리뷰할 때 이 규칙들을 적용하세요.

**Cache Components**: 현재 `apps/web`, `apps/ad` 둘 다 `next.config.ts`의 `cacheComponents` 플래그가 꺼져 있어 `'use cache'`, `cacheLife()`, `cacheTag()` 등은 이 프로젝트에 해당 사항이 없다. 나중에 플래그를 켜게 되면 [directives.md](directives.md)를 참고해 별도 스킬을 새로 만든다.

## 파일 컨벤션

[file-conventions.md](file-conventions.md) 참고:
- 프로젝트 구조와 특수 파일
- 라우트 세그먼트 (동적, catch-all, 그룹)
- 병렬/인터셉트 라우트
- **v16에서 미들웨어 이름 변경 (`middleware` → `proxy`)** — 이 프로젝트의 `apps/web/middleware.ts`가 아직 구 이름을 쓰고 있어 확인이 필요합니다.

## RSC 경계

잘못된 React Server Component 패턴을 탐지합니다. [rsc-boundaries.md](rsc-boundaries.md) 참고:
- async 클라이언트 컴포넌트 탐지 (잘못된 패턴)
- 직렬화 불가능한 props 탐지
- Server Action 예외

## 비동기 패턴

Next.js 15+의 비동기 API 변경사항. [async-patterns.md](async-patterns.md) 참고:
- 비동기 `params`, `searchParams`
- 비동기 `cookies()`, `headers()`
- 마이그레이션 코드모드

## 런타임 선택

[runtime-selection.md](runtime-selection.md) 참고:
- 기본은 Node.js 런타임
- Edge 런타임이 적합한 경우

## 디렉티브

[directives.md](directives.md) 참고:
- `'use client'`, `'use server'` (React)
- `'use cache'` (Next.js) — 이 프로젝트는 아직 미적용 (위 "Cache Components" 참고)

## 함수

[functions.md](functions.md) 참고:
- 내비게이션 훅: `useRouter`, `usePathname`, `useSearchParams`, `useParams`
- 서버 함수: `cookies`, `headers`, `draftMode`, `after`
- Generate 함수: `generateStaticParams`, `generateMetadata`

## 에러 핸들링

[error-handling.md](error-handling.md) 참고:
- `error.tsx`, `global-error.tsx`, `not-found.tsx`
- `redirect`, `permanentRedirect`, `notFound`
- `forbidden`, `unauthorized` (인증 에러)
- catch 블록에서의 `unstable_rethrow`

## 데이터 패턴

[data-patterns.md](data-patterns.md) 참고:
- Server Components vs Server Actions vs Route Handlers
- 데이터 워터폴 피하기 (`Promise.all`, `Suspense`, preload)
- 클라이언트 컴포넌트에서의 데이터 페칭

## 라우트 핸들러

[route-handlers.md](route-handlers.md) 참고:
- `route.ts` 기본
- `page.tsx`와의 GET 핸들러 충돌
- 환경 특성 (React DOM 사용 불가)
- Server Actions 대신 언제 쓸지

## 메타데이터 & OG 이미지

[metadata.md](metadata.md) 참고 — SEO 상세 체크리스트는 `nextjs-seo` 스킬도 함께 보세요:
- 정적/동적 메타데이터
- `generateMetadata` 함수
- `next/og`로 OG 이미지 생성
- 파일 기반 메타데이터 컨벤션

## 이미지 최적화

[image.md](image.md) 참고:
- `<img>` 대신 항상 `next/image`
- 원격 이미지 설정 (이 프로젝트는 `apps/web/next.config.ts`에 `remotePatterns` 이미 설정됨)
- 반응형 `sizes` 속성
- blur placeholder
- LCP를 위한 priority 로딩

## 폰트 최적화

[font.md](font.md) 참고:
- `next/font` 설정
- Google Fonts, 로컬 폰트
- Tailwind CSS 연동
- 서브셋 프리로딩

## 번들링

[bundling.md](bundling.md) 참고:
- 서버와 호환되지 않는 패키지
- CSS import (link 태그 금지)
- 폴리필 (이미 포함됨)
- ESM/CommonJS 이슈
- 번들 분석

## 스크립트

[scripts.md](scripts.md) 참고:
- `next/script` vs 네이티브 script 태그
- 인라인 스크립트는 `id` 필요
- 로딩 전략
- `@next/third-parties`로 Google Analytics

## Hydration 에러

[hydration-error.md](hydration-error.md) 참고:
- 흔한 원인 (브라우저 API, 날짜, 잘못된 HTML)
- 에러 오버레이로 디버깅
- 원인별 해결법

## Suspense 경계

[suspense-boundaries.md](suspense-boundaries.md) 참고:
- `useSearchParams`로 인한 CSR bailout (Suspense 경계가 필요한 유일한 훅)
- `connection()`으로 강제 동적 렌더링

## 병렬 & 인터셉트 라우트

[parallel-routes.md](parallel-routes.md) 참고:
- `@slot`과 `(.)` 인터셉터로 모달 패턴
- fallback을 위한 `default.tsx`
- `router.back()`으로 모달 올바르게 닫기

## 셀프 호스팅

[self-hosting.md](self-hosting.md) 참고 — 이 프로젝트는 현재 Dockerfile이 없어 해당 사항 없지만, 셀프 호스팅을 검토하게 되면 참고:
- Docker용 `output: 'standalone'`
- 다중 인스턴스 ISR을 위한 캐시 핸들러
- 되는 것과 추가 설정이 필요한 것

## 디버그 팁

[debug-tricks.md](debug-tricks.md) 참고:
- AI 보조 디버깅을 위한 MCP 엔드포인트
- `--debug-build-paths`로 특정 라우트만 재빌드
