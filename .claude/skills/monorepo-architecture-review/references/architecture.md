# 모노레포 구조 기준

이 프로젝트(snappin-client)는 pnpm workspace + Turborepo 모노레포입니다(`pnpm-workspace.yaml`: `apps/*`, `packages/*`). 아래는 현재 패키지 인벤토리와 의존 방향/공유 코드 배치 기준입니다. 새 패키지가 추가되면 이 표도 함께 갱신하세요.

## 패키지 인벤토리

| 위치 | 패키지명 | 성격 | 공개 엔트리(`exports`) |
| --- | --- | --- | --- |
| `apps/web` | `web` | 배포 앱 | - (앱, 다른 곳에서 import 대상 아님) |
| `apps/ad` | `ad` | 배포 앱 | - (앱, 다른 곳에서 import 대상 아님) |
| `packages/design-system` | `@snappin/design-system` | UI 컴포넌트/에셋 | `.`, `./ui/*`, `./assets`, `./assets/*`, `./lotties`, `./lotties/*`, `./lib`, `./lib/*`, `./styles.css` |
| `packages/shared` | `@snappin/shared` | 도메인 무관 공용 로직/타입 | `./constants`, `./lib`, `./types` |
| `packages/eslint-config` | `@snappin/eslint-config` | 설정 전용 (devDependency만) | `./base`, `./react`, `./next` |
| `packages/tailwind-config` | `@snappin/tailwind-config` | 설정 전용 (devDependency만) | `.`, `./postcss` |
| `packages/typescript-config` | `@snappin/typescript-config` | 설정 전용 (devDependency만) | `./base`, `./nextjs` |

## 의존성 방향

- **`apps/*` → `packages/*`만 허용**. `packages/*`가 `apps/*`의 코드를 import하면 안 된다(방향이 반대로 뒤집힘).
- **`apps/web` ↔ `apps/ad` 간 직접 import 금지**. 두 앱이 같은 로직/컴포넌트를 필요로 한다면 `packages/shared` 또는 `packages/design-system`으로 끌어올려야지, 한 앱이 다른 앱의 소스를 상대 경로나 직접 참조로 가져오면 안 된다.
- **설정 패키지(`eslint-config`/`tailwind-config`/`typescript-config`)는 `devDependencies`에만 존재**해야 한다. 런타임 `dependencies`에 들어가 있으면 잘못 배치된 것.
- **패키지 간 의존은 `package.json`에 `workspace:*`로 선언된 것만** 유효하다. 선언 없이 다른 패키지의 소스를 상대 경로(`../../packages/...`)로 직접 import하는 건 금지 — 반드시 패키지명으로 import하고 의존성을 선언한다.
- **패키지의 공개 엔트리(`exports`)를 통해서만 import**한다. 예를 들어 `@snappin/design-system/ui/Button`처럼 실제 export된 subpath만 쓰고, `@snappin/design-system/dist/ui/internal/...`처럼 export map에 없는 내부 경로로 딥임포트하지 않는다. `packages/shared`도 마찬가지로 `@snappin/shared/constants`, `@snappin/shared/lib`, `@snappin/shared/types`만 사용한다.
- **`@snappin/design-system` ↔ `@snappin/shared` 간 의존은 방향을 하나로 유지**한다. `shared`는 도메인 로직/타입/상수를 다루고 UI를 모른다 — `shared`가 `design-system`을 의존하면 안 된다. `design-system`이 `shared`의 타입/상수를 쓰는 것(단방향)은 허용된다.

## 공유 코드 배치

- **2개 이상의 앱/패키지에서 실제로 쓰이는 코드만** `packages/*`로 끌어올린다. 지금 한 곳에서만 쓰는데 "나중에 재사용할 것 같아서" 미리 공용 패키지로 빼는 건 지양 — 재사용 시점에 옮긴다.
- **UI 컴포넌트**가 2개 이상의 앱에서 쓰이거나 쓰일 예정이 확실하면 `packages/design-system`으로. 앱 전용 컴포넌트를 design-system에 넣지 않는다.
- **도메인 무관 로직/타입/상수**가 여러 곳에서 쓰이면 `packages/shared`로, 그 안에서도 성격에 맞게 배치한다:
  - `constants`: 상수 값
  - `types`: 타입 정의
  - `lib`: 함수/모듈 (외부 라이브러리 래핑, 클라이언트 인스턴스 등 — `docs/conventions.md`의 `utils` vs `lib` 구분 기준과 동일)
- **같은 로직이 `apps/web`과 `apps/ad`에 거의 동일하게 복붙되어 있는지** 확인한다. 발견되면 `packages/shared` 또는 `packages/design-system`으로 옮기고 양쪽에서 import하도록 제안한다. 단, 우연히 비슷해 보일 뿐 개념적으로 다른 코드(예: 각 앱의 도메인이 달라 요구사항이 갈라질 코드)까지 성급하게 공통화하진 않는다.
- **패키지 하나가 너무 많은 성격의 코드를 떠안고 있는지**도 확인한다(예: `shared`에 특정 앱에서만 쓰는 UI 전용 로직이 섞여 있는 경우). 패키지 경계와 실제 내용물의 성격이 어긋나면 지적한다.
