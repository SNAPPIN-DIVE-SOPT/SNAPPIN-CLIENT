---
description: 전체 typecheck 통과 후 .github/pull_request_template.md 형식을 채워 PR을 생성한다 (close #이슈번호, --assignee @me 자동 포함)
allowed-tools: Bash(git branch:*), Bash(git push:*), Bash(git diff:*), Bash(gh pr create:*), Bash(gh issue view:*), Bash(npm run:*), Bash(pnpm run:*), Bash(yarn run:*)
---

1. **전체 typecheck를 실행한다.** `package.json`의 `scripts`에서 typecheck 관련 스크립트(`typecheck`, `tsc` 등)를 찾아 실행한다. 실패하면 여기서 멈추고 에러를 보고한다 — PR을 만들지 않는다.
2. 현재 브랜치명에서 `<type>`과 이슈 번호를 파싱한다 (`/start-work`가 만드는 브랜치는 `docs/git-conventions.md`의 브랜치명 컨벤션대로 `<type>/#<이슈번호>/<작업내용>` 형태). 번호를 못 찾으면 사용자에게 물어본다.
3. 커밋되지 않은 변경이 있으면 사용자에게 먼저 확인한다. 원격에 브랜치가 없으면 push한다.
4. PR 제목을 만든다. `docs/git-conventions.md`의 형식(`<type>(<scope>): <설명>`)과 scope 목록을 따른다.
   - `<type>`은 2번에서 파싱한 값을 그대로 쓴다.
   - `<scope>`는 베이스 브랜치 대비 변경된 파일(`git diff --name-only`)이 속한 워크스페이스 이름이다. 워크스페이스 하나에만 걸쳐 있지 않으면(루트 파일, 여러 워크스페이스) scope를 생략한다.
   - `<설명>`은 이슈 제목(`gh issue view <이슈번호> --json title`)의 설명 부분을 기준으로 실제 변경에 맞게 다듬는다. 제목에 이모지와 이슈 번호는 넣지 않는다.
5. PR 본문을 만든다. `.github/pull_request_template.md`를 **먼저 읽고**, 그 파일의 섹션 제목과 순서를 그대로 유지한 채 각 섹션의 HTML 주석 안내에 따라 내용을 채운다. 주석 자체는 지운다. Related Issues 섹션에는 반드시 `- close #<이슈번호>`를 넣는다 — `close-linked-issue` 워크플로가 이 줄을 읽어 이슈를 닫는다. 채울 내용이 없는 섹션도 지우지 말고 주석이 안내하는 문구("특별히 없음", "해당 없음" 등)를 적는다.
6. `gh pr create`는 non-interactive 모드에서 템플릿을 자동으로 불러오지 않으므로, 5번에서 채운 본문을 heredoc으로 직접 넘긴다:

```bash
gh pr create --assignee @me --title "<type>(<scope>): <설명>" --body "$(cat <<'EOF'
<5번에서 채운 본문>
EOF
)"
```

- 타입체크를 건너뛰지 않는다.
- 섹션 제목이나 순서를 임의로 바꾸지 않는다 — 팀 전체가 같은 형식으로 리뷰하기 위한 템플릿이다. 구조를 바꾸려면 템플릿 파일을 고친다.
- PR 생성 후 URL을 사용자에게 보여준다.
