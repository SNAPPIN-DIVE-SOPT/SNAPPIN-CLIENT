---
name: nextjs-seo
description: Next.js App Router의 SEO 구현/점검을 다룹니다. metadata와 generateMetadata, viewport/themeColor, Open Graph·Twitter 이미지, 웹앱 매니페스트, 파비콘, sitemap.xml, robots.txt, canonical URL, hreflang/i18n alternates, JSON-LD 구조화 데이터, Core Web Vitals(LCP/INP/CLS), 구글 색인 문제 진단에 사용하세요. "이 페이지 검색에 안 잡혀요", "메타데이터 추가해줘", "OG 이미지 만들어줘", "sitemap 만들어줘" 같은 요청에 사용하세요. SEO와 무관한 일반 Next.js 기능 개발에는 사용하지 마세요.
---

# Next.js SEO

> 출처: [laguagu/claude-code-nextjs-skills](https://github.com/laguagu/claude-code-nextjs-skills) (MIT), 이 프로젝트에 맞게 정리

## 빠른 SEO 점검

새 페이지를 만들거나 SEO 문제를 진단할 때:

1. `curl -s <url> | grep -i '<title>\|<meta name="description"'`로 메타데이터가 서버 렌더링 결과에 실제로 포함되는지 확인 (CSR로만 렌더링되면 크롤러가 못 볼 수 있음)
2. 페이지 소스에 `viewport` meta가 있는지 확인 (App Router는 `viewport` export가 필수 취급됨)
3. `robots.txt`가 `/_next/`처럼 실제로 필요한 정적 자원을 막고 있지 않은지 확인
4. sitemap.xml이 실제 라우트와 맞는지 확인
5. PageSpeed Insights로 Core Web Vitals 필드 데이터 확인 (랩 데이터가 아니라 필드 데이터가 랭킹에 영향)

## 핵심 파일

- **루트 메타데이터**: `app/layout.tsx`의 `metadata` export 또는 `generateMetadata`
- **동적 sitemap**: `app/sitemap.ts`에서 `MetadataRoute.Sitemap` 반환
- **robots**: `app/robots.ts`에서 `MetadataRoute.Robots` 반환
- **웹앱 매니페스트**: `app/manifest.ts`
- **소셜 이미지(OG/Twitter)**: 정적 파일(`opengraph-image.png`), 외부 URL, 또는 `ImageResponse`로 동적 생성 중 상황에 맞게 선택

## 원칙

- 페이지별로 다른 title/description이 필요하면 `generateMetadata`를 쓴다. 정적이면 `metadata` export로 충분하다.
- SEO가 중요한 페이지(랜딩, 상세 페이지 등)는 CSR로만 렌더링하지 않는다 — 서버에서 렌더링된 HTML에 콘텐츠가 있어야 크롤러가 읽는다.
- `canonical` URL을 명시해서 쿼리 파라미터 등으로 인한 중복 콘텐츠 문제를 막는다.
- 구조화 데이터(JSON-LD)는 리치 리절트(별점, 가격, 이벤트 등)가 필요한 페이지에 붙인다. 예약/상품 페이지처럼 검색 결과에서 추가 정보를 보여주고 싶은 곳에 유용하다.
- Core Web Vitals: LCP·INP(2024년에 FID를 대체)·CLS. "페이지 경험은 순위를 뒤집는 요소가 아니라 타이브레이커"라는 점을 감안해서, 콘텐츠/구조 문제보다 우선순위를 높게 두지 않는다.

## 자주 하는 실수

1. SEO가 중요한 페이지를 클라이언트 컴포넌트로만 렌더링
2. `robots.txt`에서 `/_next/` 같은 필수 정적 자원을 차단
3. `viewport` export 누락 (App Router에서 필수 취급)
4. robots.txt의 그룹 상속을 잘못 가정 (그룹마다 규칙이 독립적)
5. `generateMetadata`에서 상위 라우트의 메타데이터를 안 이어받아 title/description이 빠짐
6. sitemap에 없는 라우트가 실제로 존재하거나, 반대로 sitemap에는 있는데 접근 불가능한 라우트가 있음
7. OG 이미지 크기/비율이 표준(1200x630)과 안 맞아서 일부 플랫폼에서 잘림
8. canonical URL을 안 붙여서 같은 콘텐츠가 여러 URL로 색인됨
9. `noindex`가 필요한 페이지(내부 관리자 페이지 등)에 안 붙임
10. 이미지에 `alt` 텍스트 누락
11. `hreflang`/i18n alternate가 필요한데 안 붙어서 다국어 콘텐츠가 중복으로 인식됨
12. 존재하지 않는 최신 스펙(예: 근거 없이 "LCP 기준이 낮아졌다")을 가정하고 최적화

## 구글 색인 문제 진단

"Discovered/Crawled - currently not indexed" 같은 문제가 보고되면:
- Search Console에서 실제 상태를 먼저 확인한다
- 콘텐츠가 서버 렌더링 결과에 있는지 (`curl`로 확인)
- 페이지가 다른 페이지에서 내부 링크로 연결되는지 (고아 페이지는 크롤링 우선순위가 낮음)
- `robots.txt`/`noindex`로 실수로 막고 있지 않은지

## 빠른 수정 스니펫

```tsx
// noindex 추가
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// canonical URL 지정
export const metadata: Metadata = {
  alternates: { canonical: 'https://example.com/path' },
}

// 동적 메타데이터
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getData(slug)
  return { title: data.title, description: data.description }
}
```
