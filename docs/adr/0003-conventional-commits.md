# 커밋·PR·이슈 제목을 Conventional Commits로 통일하고 이모지를 폐지한다

기존 컨벤션은 커밋은 `<type>(<범위>): <설명>`, PR·이슈 제목은 `<이모지> <Type>(<범위>): #<이슈번호> <설명>`으로 형식이 둘이었고, 타입도 6개(`init`, `fix`, `style`, `feat`, `refactor`, `docs`)뿐이라 실제 커밋에서는 `chore`, `build`, `*` 범위처럼 문서에 없는 형식이 이미 쓰이고 있었다. 이를 Conventional Commits 표준(`<type>(<scope>): <설명>`) 하나로 통일하고, 커밋은 commitlint로 강제한다. 표준 형식이라 commitlint·CodeRabbit 같은 도구를 설정만으로 붙일 수 있고, 외워야 할 규칙이 하나로 줄며, `/ship`이 이모지 매핑 없이 제목을 만들 수 있다.

## Considered Options

- **문서만 실제 사용에 맞추기** (타입 추가, 모호한 규칙 명확화): 변경 범위는 작지만 형식이 두 개인 문제와 도구로 강제할 수 없는 문제가 그대로 남는다. 기각.
- **커밋만 표준화하고 PR·이슈 제목의 이모지 유지**: PR 목록에서 종류를 한눈에 구분할 수 있지만, 이 저장소는 merge commit으로 머지해서 PR 제목이 히스토리에 남지 않으므로 이모지를 유지할 실익이 작고 형식 두 개를 계속 관리해야 한다. 기각.
- **커밋·PR·이슈 모두 Conventional Commits로 통일** (채택).

## Consequences

- 타입은 `config-conventional` 기본 11개(`feat`, `fix`, `refactor`, `style`, `docs`, `test`, `perf`, `build`, `ci`, `chore`, `revert`)로 하고 `init`은 폐지한다 (초기 세팅은 `feat`나 `chore`로 표현).
- scope는 워크스페이스 이름으로 닫힌 목록을 쓰고(`scope-enum`), 루트·여러 워크스페이스에 걸친 변경은 scope를 생략한다. `*` 범위는 쓰지 않는다.
- 제목에서 이슈 번호를 뺀다. 이슈 연결은 브랜치명(`<type>/#<번호>/<작업내용>`)과 PR 본문의 `close #<번호>`가 담당한다.
- GitHub type 라벨 이름을 타입과 같게 바꿔(`🎀 Feat` → `feat` 등, `🐾 init` → `chore`), `/start-work`가 라벨을 매핑 표 없이 그대로 브랜치 타입으로 쓴다.
- PR 제목은 CI에서 강제하지 않는다. `/ship`이 형식을 맞춰 만들고, CodeRabbit pre-merge check가 경고로만 알린다.
- 이 ADR 이전의 커밋·PR·이슈는 옛 형식으로 남는다. 소급 수정하지 않는다.
