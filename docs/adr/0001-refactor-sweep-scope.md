# 컨벤션 정리 스윕 스코프: 기능 위험 규칙 + 중복 코드만

`#483`(claude skill 재구성) 브랜치에서 정의한 스킬·파이프라인을 기반으로 저장소 전체의 컨벤션 위반과 중복 코드를 `shared → design-system → web → ad` 순서로 정리하는 리팩터링 스윕을 진행하면서, `docs/conventions.md`에 정의된 규칙 중 **실제 버그·접근성 위험으로 이어질 수 있는 항목**(map key 유일성, `switch-case` break 누락, `button type` 누락, `utils`/`lib` JSDoc 누락 등)과 **중복 코드 추출**만 이번 스윕의 대상으로 삼는다. 화살표 함수 통일, 삼항연산자↔early-return 전환처럼 ESLint가 강제하지 않는 순수 스타일 규칙은 이번 스코프에서 제외한다.

## Considered Options

- **문서의 모든 규칙을 전부 적용**: 수백 개 파일(특히 `apps/web` 378개, `design-system` 185개)에 걸쳐 스타일까지 기계적으로 rewrite하면 diff가 커지고, `design-system`·`apps/web`은 테스트 커버리지가 사실상 없어 리뷰어가 놓치는 회귀를 잡을 안전망이 부족하다. 스타일 일관성이라는 이득 대비 회귀 위험이 커서 기각.
- **순수 스타일 규칙은 이번 스윕에서 제외하고, 추후 ESLint 규칙 + autofix로 일괄 적용** (채택): 기계적으로 안전하게 자동화 가능한 작업은 도구에 맡기고, 이번 스윕은 사람(또는 에이전트) 판단이 실제로 필요한 항목에 집중한다.

## Consequences

이 스윕이 끝난 뒤에도 `docs/conventions.md`의 스타일 규칙(화살표 함수, 삼항 vs early-return 등)은 코드베이스 전반에 걸쳐 여전히 불일치 상태로 남는다. 이는 의도된 기술 부채이며, 별도로 ESLint 규칙을 추가해 autofix로 해소하기 전까지는 코드 리뷰에서 새 위반만 지적하고 기존 코드를 소급 수정하지 않는다.
