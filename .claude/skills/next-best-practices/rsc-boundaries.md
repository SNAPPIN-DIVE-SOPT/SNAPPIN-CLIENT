# RSC 경계

잘못된 React Server Component 패턴을 찾아낸다.

## 1. async 클라이언트 컴포넌트는 불가

`'use client'` 컴포넌트는 async 함수이거나 Promise를 반환할 수 없다 — async/await는 Server Component만 가능하다.

**해결**: 데이터 페칭은 부모 Server Component에서 하고, 결과값을 props로 클라이언트 컴포넌트에 내려준다.

```tsx
// ❌ 잘못된 예
'use client'
export default async function UserCard({ id }: { id: string }) {
  const user = await getUser(id) // 클라이언트 컴포넌트는 async 불가
  return <div>{user.name}</div>
}

// ✅ 올바른 예
// page.tsx (Server Component)
export default async function Page({ params }: Props) {
  const { id } = await params
  const user = await getUser(id)
  return <UserCard user={user} />
}

// UserCard.tsx (Client Component)
'use client'
export function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>
}
```

## 2. 직렬화 불가능한 props 탐지

Server → Client로 넘어가는 props는 직렬화 가능해야 한다.

**안전한 타입**: 원시값(string/number/boolean/null/undefined), 배열, `Map`, `Set`, `Date`, 일반 객체, `Promise`, JSX 엘리먼트, Server Action

**위험한 타입**:
- 일반 함수 (Server Action이 아니고, 클라이언트 모듈에서 온 것도 아닌 경우)
- 클래스 인스턴스, prototype 기반 객체
- `WeakMap`, `WeakSet`
- 전역이 아닌 Symbol (`Symbol('x')` — `Symbol.for('x')`는 가능)

**흔한 실수**: `onClick={handleClick}`처럼 서버에서 만든 함수를 클라이언트로 넘기는 것. 이벤트 핸들러는 클라이언트 컴포넌트 *안에서* 정의한다.

**참고**: `Date`, `Map`, `Set`은 실제로 직렬화 가능하다 — 별도 변환 없이 그대로 넘겨도 된다.

## 3. Server Actions는 예외

`'use server'`가 붙은 함수는 직렬화 규칙의 예외로, Server에서 Client로 props처럼 안전하게 넘길 수 있다.

```tsx
// actions.ts
'use server'
export async function submitForm(formData: FormData) { /* ... */ }

// page.tsx (Server Component)
import { submitForm } from './actions'
export default function Page() {
  return <Form onSubmit={submitForm} /> // OK — Server Action은 예외
}
```
