# 메타데이터 & OG 이미지

SEO 관점의 전체 체크리스트는 `nextjs-seo` 스킬을 참고하고, 여기서는 API 사용법만 다룬다.

## 정적/동적 메타데이터

**Server Component 전용**: 메타데이터 API는 서버 컴포넌트에서만 동작한다. 페이지가 `'use client'`라면 제거하거나, 클라이언트 로직을 자식으로 옮기거나, 메타데이터를 부모 레이아웃으로 뺀다.

**정적 메타데이터**:
```tsx
export const metadata: Metadata = {
  title: '페이지 제목',
  description: '검색엔진용 페이지 설명',
}
```

**동적 메타데이터**:
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return { title: post.title, description: post.description }
}
```

중복 fetch를 막으려면 React의 `cache()`로 데이터 함수를 감싼다:
```tsx
export const getPost = cache(async (slug: string) => {
  return await db.posts.findFirst({ where: { slug } })
})
```

## 파일 기반 메타데이터 컨벤션

`app/` 아래 배치:

| 파일 | 역할 |
|---|---|
| `favicon.ico` | 브라우저 탭 아이콘 |
| `opengraph-image.png` | 소셜 미리보기 (OG & Twitter) |
| `sitemap.ts` | 검색엔진용 URL 목록 |
| `robots.ts` | 크롤링 규칙 |

대부분의 사이트는 파비콘 하나, OG 이미지 하나, 레이아웃 단의 title/description 정도로 SEO 커버리지가 충분하다.

## `next/og`로 OG 이미지 생성

`@vercel/og`가 아니라 항상 `next/og`에서 import한다. 기본 Node.js 런타임을 쓴다 (Edge 피하기).

```tsx
import { ImageResponse } from 'next/og'

export const alt = '사이트 이름'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ fontSize: 128, background: 'white', display: 'flex' }}>Hello World</div>,
    { ...size },
  )
}
```

동적 OG 이미지는 라우트 파라미터를 받는다:
```tsx
export default async function Image({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  return new ImageResponse(/* post.title, post.description을 쓰는 JSX */)
}
```

**제약**: OG 이미지는 searchParams에 접근할 수 없다 — 라우트 파라미터를 쓴다. 레이아웃은 Flexbox만 지원(CSS Grid 불가), 인라인 스타일만 가능하다.
