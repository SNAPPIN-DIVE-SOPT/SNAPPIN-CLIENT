# 에러 핸들링

## 에러 바운더리

**`error.tsx`**는 클라이언트 컴포넌트로, 해당 라우트 세그먼트와 그 자식에서 발생한 에러를 잡는다. `error`와 `reset`을 받는다:

```tsx
'use client'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>문제가 발생했습니다</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  )
}
```

**`global-error.tsx`**는 루트 레이아웃의 에러를 처리하며, 문서 전체를 대체하므로 `<html>`/`<body>`를 포함해야 한다.

## 내비게이션 API는 try-catch로 감싸지 않는다

`redirect()`, `permanentRedirect()`, `notFound()`, `forbidden()`, `unauthorized()`는 Next.js가 내부적으로 가로채는 특수한 에러를 던진다. try-catch로 감싸면 내비게이션 자체가 막힌다.

**해결**: try-catch 밖에서 호출하거나, `unstable_rethrow()`로 다시 던진다.

```tsx
import { unstable_rethrow } from 'next/navigation'

async function action() {
  try {
    await db.create()
    redirect('/success')
  } catch (error) {
    unstable_rethrow(error) // redirect가 던진 에러는 다시 던져서 정상 동작하게 함
    return { error: '실패했습니다' }
  }
}
```

## 리다이렉트

- **`redirect()`** — 307 임시 리다이렉트 (일반적인 경우)
- **`permanentRedirect()`** — 308 영구 리다이렉트 (URL 마이그레이션용, 브라우저에 캐시됨)

## Not Found

`not-found.tsx`로 커스텀 404 페이지를 만들고, `notFound()`로 트리거한다:

```tsx
if (!post) notFound()
```

## 인증 에러 (실험적)

`forbidden()`(403), `unauthorized()`(401)는 Next.js 16의 실험적 `authInterrupts` 설정이 필요하고, 아직 프로덕션에 권장되지 않는다.

## 에러 전파

에러는 파일 계층에서 가장 가까운 에러 바운더리로 올라가고, 최종적으로 `global-error.tsx`가 루트 레이아웃 에러까지 잡는다.
