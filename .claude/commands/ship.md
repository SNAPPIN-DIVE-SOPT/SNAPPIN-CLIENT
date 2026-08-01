---
description: 전체 typecheck 통과 후 .github/pull_request_template.md 형식을 채워 PR을 생성한다 (close #이슈번호, --assignee @me 자동 포함)
allowed-tools: Bash(git branch:*), Bash(git push:*), Bash(gh pr create:*), Bash(npm run:*), Bash(pnpm run:*), Bash(yarn run:*)
---

1. **전체 typecheck를 실행한다.** `package.json`의 `scripts`에서 typecheck 관련 스크립트(`typecheck`, `tsc` 등)를 찾아 실행한다. 실패하면 여기서 멈추고 에러를 보고한다 — PR을 만들지 않는다.
2. 현재 브랜치명에서 `<type>`과 이슈 번호를 파싱한다 (`/start-work`가 만드는 브랜치는 `docs/git-conventions.md`의 브랜치명 컨벤션대로 `<type>/#<이슈번호>/<작업내용>` 형태). 번호를 못 찾으면 사용자에게 물어본다.
3. 커밋되지 않은 변경이 있으면 사용자에게 먼저 확인한다. 원격에 브랜치가 없으면 push한다.
4. PR 제목을 만든다. `docs/git-conventions.md`의 PR/이슈 제목 컨벤션(`<이모지> <Type>(<범위>): #<이슈번호> <설명>`)과 타입↔이모지 매핑 표를 참고해, 2번에서 파싱한 `<type>`에 맞는 이모지를 고르고 `<Type>`은 첫 글자를 대문자로 쓴다.
5. `.github/pull_request_template.md`의 섹션 구조를 그대로 채워서 PR을 생성한다. `gh pr create`는 non-interactive 모드에서 템플릿을 자동으로 불러오지 않으므로, 아래처럼 heredoc으로 직접 채운 body를 넘긴다:

```bash
gh pr create --assignee @me --title "<이모지> <Type>(<범위>): #<이슈번호> <설명>" --body "$(cat <<'EOF'
## Summary

<무엇을, 왜 바꿨는지 1~3줄>

## Related Issues

- close #<이슈번호>

## PR Point (To Reviewer)

<리뷰어가 특히 봐줬으면 하는 부분, 애매한 결정, 트레이드오프. 없으면 "특별히 없음">

## Screenshot

<UI 변경이 있으면 스크린샷 표를 채운다. 없으면 섹션은 남기고 "해당 없음"만 적는다>

## ETC

<추가로 남길 내용. 없으면 "없음">
EOF
)"
```

- 타입체크를 건너뛰지 않는다.
- 섹션 제목이나 순서를 임의로 바꾸지 않는다 — 팀 전체가 같은 형식으로 리뷰하기 위한 템플릿이다.
- PR 생성 후 URL을 사용자에게 보여준다.
