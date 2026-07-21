# 병렬 & 인터셉트 라우트

## 핵심 개념

병렬 라우트(한 레이아웃에서 여러 페이지를 동시에 렌더링)와 인터셉트 라우트(내비게이션 출처에 따라 다른 UI를 보여줌)를 조합해 모달 패턴을 만든다.

## 1. 병렬 라우트 구조

`@슬롯이름` 폴더를 쓰면 메인 콘텐츠와 나란히 렌더링된다. 루트 레이아웃은 `children`과 슬롯 props를 함께 받는다:

```tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return <body>{children}{modal}</body>
}
```

## 2. `default.tsx`는 필수

모든 병렬 라우트 슬롯에는 `default.tsx`가 반드시 있어야 한다. 북마크나 직접 URL 접근 같은 하드 내비게이션을 처리하는 파일이다. 보통 `null`을 반환하며, 생략하면 Next.js 16+에서 빌드가 실패한다.

```tsx
// app/@modal/default.tsx
export default function Default() {
  return null
}
```

## 3. `(.)` 인터셉트 라우트

- `(.)` = 같은 레벨
- `(..)` = 한 단계 위
- `(...)` = 루트부터

`@modal/(.)photos/[id]/page.tsx`에 모달 콘텐츠를 두면 `/photos/[id]` 이동을 앱 안에서 가로챈다.

## 4. 모달은 `router.back()`으로 닫기

`push`나 `Link`로 모달을 "닫으면" 히스토리에 새 엔트리가 추가돼서 뒤로가기를 누르면 모달이 다시 뜬다. 대신 `router.back()`으로 인터셉트된 라우트를 히스토리에서 제거한다.

```tsx
const handleClose = () => router.back() // 올바른 방법
```

## 5. 직접 접근은 인터셉트를 건너뛴다

`/photos/123`에 직접 접근하면 모달이 아니라 전체 페이지 컴포넌트가 렌더링된다 — 북마크나 공유 링크에서는 이게 정상 동작이다.
