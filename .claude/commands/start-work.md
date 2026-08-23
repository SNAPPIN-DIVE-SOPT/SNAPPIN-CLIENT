---
description: 이슈 번호로 연결된 브랜치를 만들고 체크아웃한다
argument-hint: <issue-number>
allowed-tools: Bash(gh issue view:*), Bash(gh issue develop:*), Bash(git branch:*), Bash(git rev-parse:*)
---

이슈 `#$ARGUMENTS`에 연결된 브랜치를 만들고 체크아웃한다. 브랜치명은 `docs/git-conventions.md`의 브랜치명 컨벤션(`<type>/#<이슈번호>/<작업내용>`)을 따른다.

0. 베이스 브랜치를 정한다. `git branch --show-current`로 현재 브랜치를 확인한다. 현재 브랜치가 저장소의 기본 브랜치(보통 `main`)가 아니면 — 즉 아직 머지되지 않은 브랜치 위에 있다면 — 새 브랜치를 그 브랜치에서 딸지, 기본 브랜치에서 딸지 사용자에게 먼저 물어본다. `gh issue develop`은 별도 지정이 없으면 항상 기본 브랜치를 기준으로 브랜치를 만들기 때문에, 현재 작업 브랜치를 베이스로 쓰려면 아래 2번 명령에 `--base <현재 브랜치명>`을 반드시 추가해야 한다.

1. 이슈 라벨과 제목을 확인한다.

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

2. 브랜치를 만들고 체크아웃한다.

```bash
gh issue develop $ARGUMENTS --checkout --name "<type>/#$ARGUMENTS/<작업내용>"
```

- 이슈 번호가 주어지지 않으면 실행하지 말고 사용자에게 번호를 물어본다.
- 명령 실행 후 어떤 브랜치로 체크아웃됐는지 한 줄로 알려준다.
