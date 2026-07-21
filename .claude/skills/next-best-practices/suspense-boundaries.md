# Suspense 경계

## 핵심 이슈

`useSearchParams`는 내비게이션 훅 중 유일하게, Suspense 경계 없이 쓰면 CSR bailout이 발생한다. 정적/프리렌더 라우트에서는 프로덕션 빌드 실패("Missing Suspense boundary with useSearchParams")로 이어진다.

## 해법 1: Suspense로 감싸기

```tsx
import { Suspense } from 'react'
import SearchBar from './search-bar'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchBar />
    </Suspense>
  )
}
```

## 해법 2: 강제로 동적 렌더링

Server Component에서 `connection()`을 호출해 라우트를 정적 프리렌더링 대상에서 제외하면, Suspense 경계가 따로 필요 없어진다.

```tsx
import { connection } from 'next/server'
import SearchBar from './search-bar'

export default async function Page() {
  await connection() // 라우트가 동적으로 전환됨
  return <SearchBar />
}
```

## 참고

`usePathname`, `useParams`, `useRouter`는 Suspense 경계가 필요 없다. 정적 컨텍스트에서 `useSearchParams()`만 예외적으로 필요하다.
