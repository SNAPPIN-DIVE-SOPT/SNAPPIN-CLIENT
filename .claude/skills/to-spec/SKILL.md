---
name: to-spec
description: Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed.
disable-model-invocation: true
---

This skill takes the current conversation context and codebase understanding and produces a spec (you may know this document as a PRD). Do NOT interview the user — just synthesize what you already know.

The issue tracker and triage label vocabulary should have been provided to you — run `/setup-matt-pocock-skills` if not.

## Process

1. Explore the repo to understand the current state of the codebase, if you haven't already. Use the project's domain glossary vocabulary throughout the spec, and respect any ADRs in the area you're touching.

2. Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can. The fewer seams across the codebase, the better - the ideal number is one.

Check with the user that these seams match their expectations.

3. Write the spec using the template in [`.github/ISSUE_TEMPLATE/issue_template.md`](../../../.github/ISSUE_TEMPLATE/issue_template.md) — it's a single free-form "Task Description" section with no default labels, so fill the four sections below into that body yourself and apply both labels explicitly: `ready-for-agent`, plus exactly one type label (`bug` if this is a fix, `enhancement` otherwise). Then publish it to the project issue tracker. `/start-work` reads the type label to pick the `feat`/`fix` segment of the `<type>/#<이슈번호>/<작업내용>` branch name (see `docs/git-conventions.md`), so every issue needs one.

Fill each section from what was actually discussed - don't pad a section just to fill it:

- **배경 (Background)** — why this is needed, in 1-3 sentences. The problem or request that started the conversation, from the user's perspective.
- **작업 내용 (Scope)** — a checklist (`- [ ] ...`) of the concrete tasks/seams agreed on in step 2. Each item should be small enough that `/implement` can drive one `/tdd` loop through it. Order by the seam that should be built first.
- **완료 조건 (Acceptance criteria)** — the conditions the result must satisfy for this to count as done, independent of ticking off the checklist above. This is what `/code-review`'s Spec axis checks the diff against, so state it precisely (observable behavior, not implementation detail).
- **참고 자료 (References)** — links, prior art, or screenshots mentioned in the conversation. Leave the section's HTML comment/table in place (don't delete it) when there's nothing to add - omitting the section entirely makes it look forgotten rather than empty on purpose.
