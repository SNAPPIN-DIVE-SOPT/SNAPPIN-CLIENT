# 비동기 패턴 (Next.js 15+)

## 비동기 params / searchParams

`params`와 `searchParams`는 Promise다. 타입도 `Promise<...>`로 선언하고 `await`해야 한다.

**페이지/레이아웃**:
```tsx
type Props = { params: Promise<{ slug: string }> }

export default async function Page({ params }: Props) {
  const { slug } = await params
}
```

**라우트 핸들러**:
```tsx
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
}
```

**searchParams**도 동일하게 `await`한다.

**async가 아닌 컴포넌트**: 컴포넌트 자체를 async로 만들 수 없다면 `React.use()`로 Promise를 풀어 쓴다.

**`generateMetadata`**: 이 함수도 Promise 타입의 `params`를 받으므로 값을 꺼내기 전에 `await`한다.

## 비동기 cookies() / headers()

`cookies()`와 `headers()`도 Promise를 반환한다.

```tsx
const cookieStore = await cookies()
const headersList = await headers()
const theme = cookieStore.get('theme')
```

## 마이그레이션

기존 동기 코드가 남아있다면 코드모드로 일괄 변환한다:

```bash
npx @next/codemod@latest next-async-request-api .
```
