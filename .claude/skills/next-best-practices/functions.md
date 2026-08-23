# 함수

## 내비게이션 훅 (클라이언트 전용)

- **`useRouter`**: `push`, `replace`, `back`, `refresh`로 프로그래밍 방식 내비게이션
- **`usePathname`**: 현재 URL 경로 (조건부 렌더링에 사용)
- **`useSearchParams`**: URL 쿼리 파라미터 접근. **Suspense 경계가 필요한 유일한 내비게이션 훅** — 자세한 내용은 [suspense-boundaries.md](suspense-boundaries.md)
- **`useParams`**: 현재 경로의 동적 세그먼트 값

```tsx
'use client'
import { usePathname } from 'next/navigation'

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <Link href={href} className={pathname === href ? 'active' : ''}>
      {children}
    </Link>
  )
}
```

## 서버 함수

- **`cookies()`**: 쿠키 읽기/쓰기 (Promise, [async-patterns.md](async-patterns.md) 참고)
- **`headers()`**: 요청 헤더 조회
- **`draftMode()`**: CMS 미공개 콘텐츠 프리뷰 렌더링
- **`after()`**: 응답 스트리밍이 끝난 뒤 실행되는 코드

```tsx
import { after } from 'next/server'

export async function POST(request: Request) {
  const data = await processRequest(request)
  after(async () => await logAnalytics(data)) // 응답 이후 실행, 응답 지연 없음
  return Response.json({ success: true })
}
```

## Generate 함수

- **`generateStaticParams`**: 빌드 타임에 동적 라우트 미리 렌더링
- **`generateMetadata`**: 동적 페이지 메타데이터 생성 ([metadata.md](metadata.md))
- **`generateViewport`**: 라우트별 viewport 설정

```tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}
```
