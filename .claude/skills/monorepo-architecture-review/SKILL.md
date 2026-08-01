---
name: monorepo-architecture-review
description: 이 프로젝트(pnpm + Turborepo 모노레포, `apps/web`/`apps/ad`/`packages/*`)의 구조 관점 — 패키지 간 의존성 방향, 공개 엔트리(`exports`)를 통한 import 여부, 공유 코드가 올바른 패키지에 배치됐는지 — 를 전문적인 시선으로 리뷰합니다. 사용자가 "모노레포 구조 리뷰해줘", "패키지 경계 괜찮은지 봐줘", "이거 shared로 빼야 돼?", "앱 간 의존성 문제없나 확인해줘"처럼 말할 때 사용하세요. 개별 파일의 네이밍/스타일·버그/로직 리뷰는 `code-review`, Next.js/React/Vercel 자체 관례는 `next-best-practices`/`vercel-react-best-practices`의 영역이니 그쪽으로 넘기세요. PR 리뷰처럼 여러 관점이 다 필요한 요청이면 이 스킬과 함께 나머지 스킬들도 같이 사용하세요.
---

# 모노레포 구조 리뷰

개별 파일 내부의 코드 품질이 아니라, **앱/패키지 경계를 넘나드는 의존성과 공유 코드 배치**가 건전한지를 리뷰합니다. 한 컴포넌트/함수 내부 품질이나 네이밍/스타일은 `code-review`의 영역입니다.

## 기준 문서

`references/architecture.md`를 읽으세요. 현재 패키지 인벤토리(`apps/web`, `apps/ad`, `packages/design-system`, `packages/shared`, `packages/eslint-config`, `packages/tailwind-config`, `packages/typescript-config`)와 의존성 방향, 공유 코드 배치 기준이 있습니다. 새 패키지가 생겼는데 문서에 없다면, 리뷰 전에 실제 `pnpm-workspace.yaml`/각 `package.json`을 확인해서 최신 상태를 파악한다.

## 리뷰 절차

1. **리뷰 대상 파악**
   - 사용자가 특정 패키지/앱을 지정하면 그 범위만 본다.
   - 지정하지 않았다면 현재 브랜치와 베이스 브랜치(보통 `develop`, 없으면 `main`) 사이의 diff를 본다. `git merge-base`로 실제로 갈라진 지점을 찾아서 그 이후 변경분만 본다. `import`/`require` 구문과 각 패키지의 `package.json`(`dependencies`/`devDependencies`/`exports`) 변경을 특히 주목한다.

2. **기준 문서 읽기**

3. **세 가지 관점으로 점검**
   - **의존성 방향**: `apps → packages` 단방향인지, 앱 간 직접 참조는 없는지, 설정 패키지가 `devDependencies`에만 있는지, `package.json`에 선언되지 않은 패키지를 상대 경로로 참조하지 않는지.
   - **공개 엔트리 준수**: 각 패키지의 `exports` map에 있는 subpath로만 import하는지, `dist/`나 `src/` 내부 경로로 딥임포트하지 않는지.
   - **공유 코드 배치**: 여러 앱에 거의 동일한 로직/컴포넌트가 중복되어 있지 않은지, 반대로 한 곳에서만 쓰는 코드가 미리 공용 패키지로 과도하게 빠져 있지 않은지, `packages/shared` 내부에서도 `constants`/`types`/`lib` 중 맞는 위치에 있는지.
   - 지적할 때는 파일 경로:라인(또는 `package.json`의 필드), 어떤 항목을 어겼는지, 왜 문제인지(순환 의존 위험, 캡슐화 깨짐, 중복 유지보수 비용 등 구체적 근거), 어떻게 고치면 되는지를 적는다. 문서에 근거한 것만 지적하고, 막연한 "구조가 별로다" 식의 지적은 하지 않는다.

4. **심각도를 둘로 나눈다**
   - **필수 수정**: 의존성 방향이 실제로 역전됐거나(예: `packages/*`가 `apps/*`를 import), 앱 간 직접 참조, 선언 없는 패키지 참조, export map에 없는 내부 경로 딥임포트처럼 캡슐화가 명백히 깨진 경우
   - **권장 수정**: 지금 당장 빌드가 깨지진 않지만 중복 코드가 쌓이고 있거나, 배치 위치가 패키지 성격과 어긋나 향후 유지보수 비용이 커질 소지가 있는 경우

5. **결과 정리** — 아래 "출력 형식"대로 작성한다.

6. **수정 여부 확인 후 적용** — 지적 사항이 있으면 결과를 보여준 다음 고쳐도 될지 물어본다. 승인하면 직접 수정한다. 단, 파일을 패키지 간에 이동시키는 리팩터링은 영향 범위가 크므로(여러 파일의 import 경로가 함께 바뀜) 계획을 먼저 보여주고 승인받는다. 승인 전에는 코드를 건드리지 않는다.

## 출력 형식

```markdown
# 모노레포 구조 리뷰 결과

## 필수 수정
- `apps/ad/src/components/Banner.tsx:3` — [의존성 방향] `apps/web/src/components/Card`를 상대 경로로 직접 import. 앱 간 직접 참조 금지. 공용이면 `packages/design-system`으로 옮기고 두 앱에서 import.

## 권장 수정
- `apps/web/src/lib/formatPrice.ts`, `apps/ad/src/lib/formatPrice.ts` — [공유 코드 배치] 거의 동일한 함수가 양쪽에 중복. `packages/shared/lib`로 이동 권장.

## 요약
필수 수정 N건, 권장 수정 M건
```

지적할 게 없으면 "필수 수정 0건, 권장 수정 0건"으로 짧게 정리하고 끝낸다. 억지로 지적거리를 만들지 않는다.
