---
description: 이슈 번호로 연결된 브랜치를 만들고 체크아웃한다
argument-hint: <issue-number>
allowed-tools: Bash(gh issue view:*), Bash(gh issue develop:*), Bash(gh repo view:*), Bash(git branch:*), Bash(git rev-parse:*), Bash(git fetch:*), Bash(git checkout:*)
---

이슈 `#$ARGUMENTS`에 연결된 브랜치를 만들고 체크아웃한다. 브랜치명은 `docs/git-conventions.md`의 브랜치명 컨벤션(`<type>/#<이슈번호>/<작업내용>`)을 따른다.

0. 시작하기 전에 로컬을 정리한다. (`close-linked-issue` 워크플로 + 저장소의 `delete_branch_on_merge` 설정 덕분에, 머지된 PR의 브랜치는 원격에서 이미 삭제되어 있다 — 로컬만 정리하면 된다.)

```bash
git fetch --prune
```

- 현재 브랜치가 정리 대상일 수 있으니 먼저 저장소 기본 브랜치로 전환한다:

```bash
git checkout $(gh repo view --json defaultBranchRef -q '.defaultBranchRef.name')
```

- 원격 추적이 끊긴(= 머지되어 원격에서 삭제된) 로컬 브랜치를 찾아 안전하게 지운다. `-d`는 아직 병합되지 않은 브랜치는 자동으로 거부하므로 실수로 작업물을 잃을 위험이 없다:

```bash
git branch -vv | awk '/: gone]/{print $1}' | xargs -r git branch -d
```

- 지운 브랜치가 있으면 목록을 한 줄로 알려준다. 없으면 조용히 다음 단계로 넘어간다.

1. 베이스 브랜치를 정한다. `git branch --show-current`로 현재 브랜치를 확인한다. 현재 브랜치가 저장소의 기본 브랜치(보통 `main`)가 아니면 — 즉 아직 머지되지 않은 브랜치 위에 있다면 — 새 브랜치를 그 브랜치에서 딸지, 기본 브랜치에서 딸지 사용자에게 먼저 물어본다. `gh issue develop`은 별도 지정이 없으면 항상 기본 브랜치를 기준으로 브랜치를 만들기 때문에, 현재 작업 브랜치를 베이스로 쓰려면 아래 3번 명령에 `--base <현재 브랜치명>`을 반드시 추가해야 한다.

2. 이슈 라벨과 제목을 확인한다.

```bash
gh issue view $ARGUMENTS --json labels,title -q '{labels: [.labels[].name], title: .title}'
```

- 라벨을 아래 표에 따라 `<type>`으로 매핑한다. 매핑되는 라벨이 없으면 실행을 멈추고 사용자에게 타입을 물어본다.

  | 라벨 | `<type>` |
  | --- | --- |
  | `🐾 init` | `init` |
  | `🔨 Fix` | `fix` |
  | `🎨 Style` | `style` |
  | `🎀 Feat` | `feat` |
  | `🔧 refactor` | `refactor` |
  | `🔖 docs` | `docs` |
- 이슈 제목을 짧은 kebab-case 슬러그로 변환해 `<작업내용>`으로 쓴다 (예: "Input 컴포넌트 개발" → `input-develop`).

3. 브랜치를 만들고 체크아웃한다.

```bash
gh issue develop $ARGUMENTS --checkout --name "<type>/#$ARGUMENTS/<작업내용>"
```

- 이슈 번호가 주어지지 않으면 실행하지 말고 사용자에게 번호를 물어본다.
- 명령 실행 후 어떤 브랜치로 체크아웃됐는지 한 줄로 알려준다.
