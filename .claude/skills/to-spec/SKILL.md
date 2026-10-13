---
name: to-spec
description: Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed.
disable-model-invocation: true
---

This skill takes the current conversation context and codebase understanding and produces a spec (you may know this document as a PRD). Do NOT interview the user — just synthesize what you already know.

이슈 트래커 접근 방법과 triage 라벨 체계는 `docs/agents/issue-tracker.md`를 참고한다. 파일이 없다면 사용자에게 물어본다.

## Process

1. Explore the repo to understand the current state of the codebase, if you haven't already. Use the project's domain glossary vocabulary throughout the spec, and respect any ADRs in the area you're touching.

2. Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can. The fewer seams across the codebase, the better - the ideal number is one.

Check with the user that these seams match their expectations.

3. Write the spec by **reading [`.github/ISSUE_TEMPLATE/issue_template.md`](../../../.github/ISSUE_TEMPLATE/issue_template.md) first** and filling its sections in the file's order, keeping its headings as-is — the template is the single source of truth for the issue structure, so don't add or rename sections here; if the structure needs to change, change the template. Drop the template's frontmatter and HTML guide comments from the body you publish. Title the issue `<type>(<scope>): <설명>` per `docs/git-conventions.md` (no emoji, no issue number). Apply exactly one type label — label names are identical to the type list in `docs/git-conventions.md` (`feat`, `fix`, `refactor`, `style`, `docs`, `test`, `perf`, `build`, `ci`, `chore`, `revert`; run `gh label list` if unsure they still match). Then publish it to the project issue tracker. `/start-work` uses this label as the `<type>` segment of the `<type>/#<이슈번호>/<작업내용>` branch name, so every issue needs exactly one.

Fill each section from what was actually discussed - don't pad a section just to fill it:

- **배경** — why this is needed, in 1-3 sentences. The problem or request that started the conversation, from the user's perspective.
- **작업 내용** — a checklist (`- [ ] ...`) of the concrete tasks/seams agreed on in step 2. Each item should be small enough that `/implement` can drive one `/tdd` loop through it. Order by the seam that should be built first.
- **완료 조건** — the conditions the result must satisfy for this to count as done, independent of ticking off the checklist above. This is what `/code-review`'s Spec axis checks the diff against, so state it precisely (observable behavior, not implementation detail).
- **참고 자료** — links, prior art, or screenshots mentioned in the conversation. Keep the heading even when there's nothing to add - omitting the section entirely makes it look forgotten rather than empty on purpose.
