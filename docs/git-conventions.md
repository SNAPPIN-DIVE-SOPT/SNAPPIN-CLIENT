# Git 컨벤션

커밋 메시지, PR 제목, 이슈 제목은 모두 [Conventional Commits](https://www.conventionalcommits.org/) 형식 하나로 통일합니다. 커밋 메시지는 husky `commit-msg` 훅의 commitlint(`commitlint.config.mjs`)가 검사하므로, 형식이 틀리면 커밋이 거부됩니다. 채택 배경은 [ADR 0003](adr/0003-conventional-commits.md)을 참고하세요.

## 커밋 메시지 / PR 제목 / 이슈 제목

`<type>(<scope>): <설명>`

예:

- `feat(web): 예약 상세 페이지 추가`
- `fix(design-system): Modal 포커스 트랩 누락 수정`
- `ci: typecheck 단계 추가` — 루트나 여러 워크스페이스에 걸친 변경은 scope 생략

- 이모지와 이슈 번호는 제목에 넣지 않습니다. 이슈 연결은 브랜치명과 PR 본문의 `close #<이슈번호>`로 합니다.
- `<type>`은 항상 소문자입니다.

## 타입

| 타입       | 용도                                                |
| ---------- | --------------------------------------------------- |
| `feat`     | 새 기능                                             |
| `fix`      | 버그 수정                                           |
| `refactor` | 동작 변화 없는 구조 개선                            |
| `style`    | 포맷·공백 등 로직과 무관한 변경                     |
| `docs`     | 문서                                                |
| `test`     | 테스트 추가·수정                                    |
| `perf`     | 성능 개선                                           |
| `build`    | 빌드 설정·의존성 (turbo, tsconfig, package.json 등) |
| `ci`       | GitHub Actions 등 CI 설정                           |
| `chore`    | 그 외 잡무 (husky, `.claude` 설정, 초기 세팅 등)    |
| `revert`   | 이전 커밋 되돌리기                                  |

GitHub의 type 라벨 이름은 위 타입과 똑같습니다. PR·이슈를 열거나 제목을 고치면 `auto-label` 워크플로가 제목의 type과 같은 라벨 하나와 작성자 라벨을 자동으로 붙입니다. `/start-work`는 이슈의 type 라벨을 그대로 브랜치의 `<type>`으로 씁니다.

## scope

scope는 아래 워크스페이스 이름 중 하나만 씁니다.

- `web`, `ad`
- `design-system`, `shared`
- `eslint-config`, `tailwind-config`, `typescript-config`

루트 파일(`.github`, `.husky`, `.claude`, `docs`, `turbo.json` 등)이나 여러 워크스페이스에 걸친 변경은 scope를 생략합니다. 기능 이름은 scope가 아니라 설명에 씁니다 (예: `feat(web): input 컴포넌트 개발`).

## 브랜치명

`<type>/#<이슈번호>/<작업내용>`

예: `feat/#13/input-develop`

`<type>`은 위 타입 목록을 따르고, `<작업내용>`은 kebab-case로 씁니다.
