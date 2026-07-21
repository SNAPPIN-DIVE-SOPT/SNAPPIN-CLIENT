# Hydration 에러

## 흔한 원인과 해결법

**브라우저 API**: 서버 코드는 `window`/`document`에 접근할 수 없다. 마운트 여부를 체크하는 클라이언트 컴포넌트를 쓴다:
```tsx
'use client'
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
return mounted ? children : null
```

**날짜/시간 불일치**: 서버와 클라이언트가 다른 값을 렌더링한다. 클라이언트 전용 렌더링으로 미룬다:
```tsx
const [time, setTime] = useState<string>()
useEffect(() => setTime(new Date().toLocaleString()), [])
```

**랜덤 ID**: `Math.random()`으로 ID를 만들지 않는다. 대신 렌더마다 일관된 값을 주는 `useId` 훅을 쓴다.

**잘못된 HTML 구조**: `<p><div>`, `<p><p>` 같은 중첩 위반을 피한다. 시맨틱 중첩 규칙을 지킨다.

**서드파티 스크립트**: hydration 도중 DOM을 조작하는 스크립트는 불일치를 일으킨다. `next/script`의 `strategy="afterInteractive"`로 안전하게 로드한다.

## 디버깅

개발 환경은 인터랙티브 에러 오버레이를 제공한다. hydration 에러 알림을 클릭하면 서버 렌더링 결과와 클라이언트 렌더링 결과를 나란히 비교해서 불일치 지점을 바로 확인할 수 있다.
