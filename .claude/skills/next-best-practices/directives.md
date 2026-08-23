# 디렉티브

## `'use client'` (React)

브라우저에서 실행되는 컴포넌트를 표시한다. React 훅, 이벤트 리스너, 브라우저 API가 필요할 때 사용한다.

```tsx
'use client'
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

## `'use server'` (React)

클라이언트 컴포넌트에서 호출 가능한 서버 전용 함수를 표시한다. 파일 최상단이나 서버 컴포넌트 안에 인라인으로 선언할 수 있다.

```tsx
'use server'
export async function submitForm(formData: FormData) {
  // 서버에서 실행
}
```

## `'use cache'` (Next.js)

함수/컴포넌트를 캐시 가능하도록 표시한다. Next.js Cache Components 기능의 일부이며, `next.config.ts`에서 `cacheComponents: true`를 켜야 동작한다.

이 프로젝트는 현재 이 플래그가 꺼져 있어 `'use cache'`를 쓸 일이 없다. 실제로 `cacheComponents: true`를 켜게 되면 [laguagu/claude-code-nextjs-skills](https://github.com/laguagu/claude-code-nextjs-skills)의 cache-components 스킬을 참고해서 관련 스킬을 새로 만든다.

## 요약

상호작용에는 `'use client'`, 백엔드 로직에는 `'use server'`, (활성화된 경우) 성능 최적화에는 `'use cache'`를 쓴다.
