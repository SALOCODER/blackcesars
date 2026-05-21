---
name: commit
description: Stage relevant changes and commit with a conventional commit message (feat/fix/docs/refactor/chore). Use when the user asks to commit, save changes, or wrap up a unit of work. Omits Claude attribution by default.
---

# Commit

Stage relevant changes, write a conventional commit message (feat/fix/docs/refactor), and commit.

## Defaults

- Conventional commit format: `<type>(<scope>): <description>` — types: `feat`, `fix`, `docs`, `refactor`, `chore`, `style`, `test`, `perf`.
- **Do NOT include Claude attribution** (`Co-Authored-By: Claude ...`) unless the user explicitly asks for it.
- Commit on the current branch — per repo convention this should be `staging`.

## Workflow

1. `git status` + `git diff` to see what changed.
2. Group changes logically; do not bundle unrelated work in one commit.
3. Compose the message (single subject line, optional body explaining the why).
4. `git add <specific files>` — avoid `git add -A` unless intentional.
5. `git commit -m "..."`.
6. Do not push automatically unless asked.

## Examples

- `feat(supabase): wire publishable + admin clients`
- `fix(waterfall): correct preferred return calculation`
- `docs(claude): add Bash Usage section`
- `chore: bump next to 16.2.7`
