# 파일 컨벤션

## 프로젝트 구조

App Router는 파일 기반 라우팅을 쓴다. `app/` 아래 특수 파일들:

| 파일 | 역할 |
|---|---|
| `page.tsx` | 라우트 UI |
| `layout.tsx` | 해당 세그먼트와 자식들이 공유하는 UI (루트 layout은 필수) |
| `loading.tsx` | Suspense 기반 로딩 UI |
| `error.tsx` | 에러 바운더리 |
| `not-found.tsx` | 404 응답 |
| `global-error.tsx` | 루트 레이아웃 에러용, `<html>`/`<body>` 포함 |
| `route.ts` | API 엔드포인트 |
| `template.tsx` | 내비게이션마다 리렌더되는 layout 변형 |
| `default.tsx` | 병렬 라우트 fallback |

하위 디렉토리가 라우트 세그먼트를 만든다 (`blog/page.tsx` → `/blog`).

## 라우트 세그먼트

- 정적: `blog/` → `/blog`
- 동적: `[slug]/` → `/:slug`
- Catch-all: `[...slug]/` → `/a/b/c`
- Optional catch-all: `[[...slug]]/` → `/` 또는 `/a/b/c`
- 라우트 그룹: `(marketing)/` — URL에는 포함 안 됨, 레이아웃 분리용
- Private 폴더: `_components/`처럼 `_` 접두사 — 라우팅에서 제외

## 병렬 라우트

`@` 접두사 폴더(`@analytics/`, `@sidebar/`)는 부모 레이아웃에 prop으로 전달된다:

```tsx
export default function Layout({
  children,
  analytics,
  sidebar,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  sidebar: React.ReactNode
}) {}
```

## 인터셉트 라우트

- `(.)` = 같은 레벨
- `(..)` = 한 단계 위
- `(..)(..)` = 두 단계 위
- `(...)` = 루트에서부터

예: `@modal/(.)photo/[id]/`가 `/photo/[id]` 이동을 가로챈다.

## 미들웨어 → 프록시 이름 변경 (v16)

**Next.js 14~15**: `middleware.ts`
```ts
export function middleware(request: NextRequest) {
  return NextResponse.next()
}
export const config = { matcher: ['/dashboard/:path*'] }
```

**Next.js 16+**: `proxy.ts`
```ts
export function proxy(request: NextRequest) {
  return NextResponse.next()
}
export const config = { matcher: ['/dashboard/:path*'] }
```

v16에서 달라지는 점:
- `proxy.ts`는 Node.js 런타임에서만 동작한다. `runtime` 설정은 금지된다.
- `middleware.ts`는 deprecated이며 Edge 런타임이 꼭 필요한 경우를 위해 남아있다.
- matcher가 없으면 proxy가 모든 요청을 가로채므로, 정적 자원을 제외하려면 negative matcher를 쓴다.

마이그레이션: `npx @next/codemod@canary middleware-to-proxy .`

**이 프로젝트 확인 필요**: `apps/web/middleware.ts`가 현재 구 이름을 그대로 쓰고 있다. Next.js 16.1.1을 이미 쓰고 있으므로, 위 코드모드로 마이그레이션할지 검토가 필요하다.
