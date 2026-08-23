# 라우트 핸들러

## 기본

`route.ts` 파일에 HTTP 메서드별 async 함수(`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`)를 export해서 API 엔드포인트를 만든다. 각 함수는 `Request`를 받고 `Response`를 반환한다.

```tsx
export async function GET() {
  return Response.json({ data })
}
```

## 파일 충돌 주의

같은 폴더에 `route.ts`와 `page.tsx`를 같이 둘 수 없다. 페이지와 API 라우트는 별도 디렉토리에 둔다 (예: `/users/page.tsx`와 `/api/users/route.ts`).

## 환경 제약

라우트 핸들러는 서버 전용 컨텍스트에서 동작한다. async 작업, Node.js API, `cookies()`/`headers()` 같은 Next.js 헬퍼는 쓸 수 있지만 **React DOM API는 쓸 수 없다**.

```tsx
// ❌ 동작 안 함
import { renderToString } from 'react-dom/server'
export async function GET() {
  const html = renderToString(<Component />) // React DOM API 사용 불가
}
```

## 동적 라우트

```tsx
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
}
```

## 라우트 핸들러 vs Server Actions

- **라우트 핸들러**: 외부 웹훅, 외부 API, 공개 REST 서비스
- **Server Actions**: 폼 제출, UI에서 트리거되는 뮤테이션
