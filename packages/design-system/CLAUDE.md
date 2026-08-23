# packages/design-system

`@snappin/design-system` — `apps/web`, `apps/ad`가 공유하는 UI 컴포넌트 라이브러리. 전역 규칙은 루트 [`CLAUDE.md`](../../CLAUDE.md) 참고.

## 원칙

이 패키지는 radix-ui 프리미티브 + `cn()`(`clsx`+`tailwind-merge`) + 시맨틱 토큰 조합으로 직접 구현돼 있다. 새 컴포넌트를 추가하거나 기존 컴포넌트를 수정할 때는 이 조합 방식(레이아웃만 `className`으로, 색상/타이포는 컴포넌트가 관리)을 그대로 따른다.

## 빌드/배포

이 패키지는 `dist/`로 빌드된 결과물을 `exports`에서 내보낸다 (`main`, `ui/*`, `assets`, `lotties`, `lib`, `styles.css`). 소스만 고치고 빌드를 누락하면 앱에서 변경사항이 안 보일 수 있다 — `pnpm build`로 다시 빌드했는지 확인한다.

아이콘은 `pnpm build:icons`로 `assets/svg`에서 자동 생성된다. 아이콘 SVG를 직접 `assets/components`에 추가하지 않는다.
