# snappin-client

AI로 스냅 무드를 분석해 무드가 맞는 작가와 고객을 연결하는 스냅 촬영 매칭 서비스의 웹 클라이언트. pnpm + Turborepo 모노레포 (`apps/web`, `apps/ad`, `packages/*`).

이 저장소는 회사 프로젝트가 아니라 사이드 프로젝트이므로, 확신이 없을 땐 임의로 판단하지 말고 공식 가이드(Next.js/React/Vercel 문서, 이 저장소에 설치된 스킬들)를 우선 따른다.

## 전역 코딩 컨벤션

코드 스타일(네이밍, 조건문, export 규칙, 타입 선언 등)의 유일한 기준 문서는 [`docs/conventions.md`](docs/conventions.md)다. 다른 곳에 다시 옮겨 적지 않는다 — 여기 한 곳만 갱신하면 된다.

## Git 컨벤션

브랜치명, 커밋 메시지, PR/이슈 제목 형식은 [`docs/git-conventions.md`](docs/git-conventions.md) 기준을 따른다.

## 공통 명령어

루트에서 (turbo로 각 앱에 위임):
```bash
pnpm dev:web     # apps/web 개발 서버
pnpm dev:ad      # apps/ad 개발 서버
pnpm build       # 전체 빌드
pnpm lint        # 전체 lint
pnpm test        # 전체 테스트
pnpm format      # prettier 전체 포맷
```
