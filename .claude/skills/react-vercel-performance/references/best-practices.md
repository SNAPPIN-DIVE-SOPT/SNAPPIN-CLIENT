# React 19 / Vercel 배포 모범 사례

이 프로젝트(snappin-client)는 Next.js 16 (App Router) + React 19 + Vercel 배포를 기준으로 합니다. 팀 컨벤션(`../code-convention-reviewer/references/conventions.md`)과 충돌하면 팀 컨벤션이 우선합니다.

**Next.js App Router 자체의 메커니즘(RSC 경계, hydration, 비동기 API, 라우트 컨벤션, 이미지/폰트, 번들링 등)은 `next-best-practices` 스킬이 훨씬 상세하게 다룹니다.** 이 문서는 그와 겹치지 않는, React 19 성능 최적화와 Vercel 플랫폼 관점만 다룹니다.

## Server / Client 컴포넌트 경계

- 기본은 Server Component. `"use client"`는 실제로 상호작용이 필요한 최소 단위(leaf 컴포넌트)에만 붙인다. 자세한 경계 위반 패턴은 `next-best-practices`의 `rsc-boundaries.md` 참고.
- 서버 컴포넌트에서 이미 받아올 수 있는 데이터를 클라이언트 컴포넌트 안에서 다시 fetch하지 않는다.

## 데이터 페칭 역할 분리

- react-query로 클라이언트에서 가져오는 데이터와 서버 컴포넌트에서 가져오는 데이터가 같은 데이터를 이중으로 fetch하지 않도록 역할을 분리한다. 워터폴 제거 패턴은 `next-best-practices`의 `data-patterns.md` 참고.
- Next.js 16 Cache Components(`'use cache'`)는 이 프로젝트에서 아직 미적용이다 (`cacheComponents` 플래그 꺼짐).

## 리렌더 최적화

- 자주 리렌더되는 리스트 아이템 등에 인라인 함수·객체를 매번 새로 만들어 자식에게 내려주면 `React.memo`가 무력화된다. `useCallback`/`useMemo`로 참조를 안정시킬지, 애초에 memo가 꼭 필요한지 먼저 판단한다.
- Context value를 매 렌더마다 새 객체로 만들면(`value={{ a, b }}`처럼 인라인 객체) 그 Context를 구독하는 모든 컴포넌트가 불필요하게 리렌더된다.

## 환경 변수

- 브라우저에 노출돼야 하는 값에만 `NEXT_PUBLIC_` 접두사를 쓴다. API 키 등 민감한 값에 실수로 `NEXT_PUBLIC_`을 붙이지 않는다.

## React 19 / 훅

- 서버에서 이미 알 수 있는 값을 `useEffect`로 클라이언트에서 다시 계산하지 않는다 (예: URL 파라미터로 초기값을 알 수 있는 경우).
- 폼 제출 등에는 `useActionState`/Server Actions를 우선 고려하고, 불필요한 수동 로딩/에러 상태 관리를 줄인다.
- 낙관적 업데이트가 필요한 곳은 `useOptimistic`을 고려한다.

## Vercel 배포 관점

- Edge Runtime 선택 기준, 다중 인스턴스 ISR 이슈는 `next-best-practices`의 `runtime-selection.md`/`self-hosting.md` 참고.
- Vercel Image Optimization은 요청량에 따라 과금되므로, 원본 이미지 크기/포맷을 미리 최적화해 최적화 대상 크기를 줄인다.
