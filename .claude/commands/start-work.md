---
description: 이슈 번호로 연결된 브랜치를 만들고 체크아웃한다
argument-hint: <issue-number>
allowed-tools: Bash(gh issue view:*), Bash(gh issue develop:*)
---

이슈 `#$ARGUMENTS`에 연결된 브랜치를 만들고 체크아웃한다. 브랜치명은 `docs/git-conventions.md`의 브랜치명 컨벤션(`<type>/#<이슈번호>/<작업내용>`)을 따른다.

1. 이슈 라벨과 제목을 확인한다.

```bash
gh issue view $ARGUMENTS --json labels,title -q '{labels: [.labels[].name], title: .title}'
```

- `bug` 라벨이 있으면 `<type>`은 `fix`, 그 외에는 `feat`.
- 이슈 제목을 짧은 kebab-case 슬러그로 변환해 `<작업내용>`으로 쓴다 (예: "Input 컴포넌트 개발" → `input-develop`).

2. 브랜치를 만들고 체크아웃한다.

```bash
gh issue develop $ARGUMENTS --checkout --name "<type>/#$ARGUMENTS/<작업내용>"
```

- 이슈 번호가 주어지지 않으면 실행하지 말고 사용자에게 번호를 물어본다.
- 명령 실행 후 어떤 브랜치로 체크아웃됐는지 한 줄로 알려준다.
