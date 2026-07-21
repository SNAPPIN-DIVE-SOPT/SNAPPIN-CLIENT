# 데이터 패턴

## 세 가지 핵심 패턴

- **Server Components**: 조회(read)에 최적. API 없이 직접 데이터에 접근하고, 클라이언트-서버 왕복이 없고, 시크릿이 서버에만 머문다.
- **Server Actions**: 뮤테이션(변경)에 적합. end-to-end 타입 안정성, JS 없이도 동작하는 progressive enhancement. 폼 제출 등 사용자 상호작용으로 트리거되는 POST/PUT/DELETE에 쓴다.
- **Route Handlers**: 외부 클라이언트, 모바일 앱, 웹훅처럼 REST API가 필요할 때, 혹은 HTTP 캐싱이 필요할 때 쓴다.

**판단 기준**: 내부에서 읽기만 한다면 Server Component, 변경이면 Server Action, 외부에 노출하는 API면 Route Handler.

## 데이터 워터폴 제거

순차적인 fetch는 성능을 깎아먹는다. 세 가지 해법:

1. **`Promise.all`로 병렬화**: 서로 의존하지 않는 리소스는 동시에 fetch한다.
2. **Suspense로 스트리밍**: 독립적인 데이터 영역을 각각 다른 `Suspense` 경계로 감싸서, 일부가 로딩 중이어도 나머지를 먼저 보여준다.
3. **Preload 패턴**: React의 `cache()`로 fetch를 미리 시작해서, 실제로 필요한 시점엔 이미 준비돼 있게 한다.

## 클라이언트 컴포넌트의 데이터 페칭

가능하면 Server Component에서 미리 가져온 데이터를 props로 내려준다. 클라이언트에서 독자적으로 fetch해야 한다면, Server Action은 항상 POST라 HTTP 캐싱이 안 되므로 Route Handler가 더 낫다.

이 프로젝트는 react-query + axios로 클라이언트 데이터 페칭을 이미 쓰고 있다 — 서버 컴포넌트에서 가져올 수 있는 데이터까지 react-query로 다시 가져오지 않도록 역할을 분리한다 (`react-vercel-performance` 참고).
