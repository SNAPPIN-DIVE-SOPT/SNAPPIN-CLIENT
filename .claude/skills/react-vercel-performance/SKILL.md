---
name: react-vercel-performance
description: React 19 성능 최적화(리렌더, Context, 훅)와 Vercel 배포 관점 모범 사례를 체크합니다. 리렌더 최적화, 환경 변수, Server/Client 컴포넌트 경계, Vercel 배포(Edge/ISR/이미지 과금) 관련 질문에 사용하세요. Next.js App Router 자체의 메커니즘(RSC 경계, hydration, 비동기 API, 라우트 컨벤션, 이미지/폰트, 번들링, 라우트 핸들러 등)은 `next-best-practices` 스킬이 다루니 그쪽을 우선 쓰세요. 팀 컨벤션(네이밍, 스타일)은 `code-convention-reviewer`, 버그/로직 문제는 `bug-reviewer`의 영역입니다. PR 리뷰처럼 여러 관점이 다 필요한 요청이면 관련 스킬들을 같이 사용하세요.
---

# React 19 / Vercel 모범 사례

이 프로젝트(snappin-client, Next.js 16 App Router + React 19, Vercel 배포)에서 React 19 성능 패턴과 Vercel 배포 관점 권장 사항을 따르고 있는지 확인합니다. 팀 컨벤션(변수명, 스타일 등)은 `code-convention-reviewer`, Next.js App Router 자체 메커니즘은 `next-best-practices` 스킬의 영역입니다.

## 기준 문서

`references/best-practices.md`를 읽으세요. Server/Client 컴포넌트 경계 개요, 데이터 페칭 역할 분리, 리렌더 최적화, 환경 변수, React 19 훅, Vercel 배포 관점을 다룹니다. App Router 세부 메커니즘은 이 문서에서 `next-best-practices`의 해당 파일로 링크해뒀습니다. 팀 컨벤션과 충돌하면 팀 컨벤션(`../code-convention-reviewer/references/conventions.md`)이 우선합니다.

## 언제 어떻게 쓰는가

- **코드를 작성하는 중이라면**: 새 페이지, 컴포넌트, 데이터 페칭 코드를 만들기 전에 관련 섹션을 참고해서 애초에 권장 패턴대로 작성한다. 다 쓰고 나서 지적하는 것보다 처음부터 맞게 쓰는 게 낫다.
- **이미 작성된 코드를 리뷰하는 중이라면**: 아래 절차를 따른다.

## 리뷰 절차

1. 리뷰 대상 파악 (사용자가 지정한 파일, 또는 현재 diff)
2. `references/best-practices.md`를 읽는다
3. 각 파일을 훑으며 위반을 찾는다. 위반을 찾으면 파일 경로:라인, 어떤 항목을 어겼는지, 왜 문제인지(성능/번들 크기/캐싱 정합성 등 구체적 근거), 어떻게 고치면 되는지를 적는다. 애매한 취향이 아니라 문서에 근거해서만 지적한다.
4. 심각도를 둘로 나눈다:
   - **필수 수정**: 민감한 값이 `NEXT_PUBLIC_`으로 노출되는 등 실제로 잘못된 동작으로 이어지는 경우, 혹은 뚜렷한 리렌더 성능 저하가 확실한 경우
   - **권장 수정**: 지금 당장 문제는 아니지만 React 19/Vercel이 권장하는 더 나은 패턴이 있는 경우 (예: `useEffect`로 계산 가능한 걸 서버에서 미리 계산 가능한 경우)

## 출력 형식

```markdown
# Next.js / React 모범 사례 리뷰

## 필수 수정
- `경로/파일.tsx:20` — [항목명] 문제 설명. 고치는 방법.

## 권장 수정
- `경로/파일.tsx:40` — [항목명] 문제 설명. 고치는 방법.

## 요약
필수 수정 N건, 권장 수정 M건
```

위반이 없으면 "필수 수정 0건, 권장 수정 0건"으로 짧게 정리하고 끝낸다. 억지로 지적거리를 만들지 않는다.
