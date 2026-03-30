---
name: changelog
description: "Generates a structured CHANGELOG.md from git history, following the Keep a Changelog standard. Accepts a commit range, branch, or number of recent commits."
allowed-tools: Bash Read Write
---

# Changelog Skill

Generate a well-structured `CHANGELOG.md` from this repository's git history.

## Trigger

Use this skill when the user asks to:
- Generate or update a changelog
- Document what changed between two versions or tags
- Create a `CHANGELOG.md` file

## Steps

### 1. Discover the commit range

If the user specifies a range (e.g. `v1.0.0..v2.0.0`, `last 30 days`, `last 50 commits`), use it.
If no range is specified, default to the last 50 commits.

```bash
# Get available tags to help determine range
git tag --sort=-version:refname | head -20

# Get commits in range (adjust range as needed)
git log --oneline --no-merges <range>

# Get full commit details for analysis
git log --format="%H|%an|%ad|%s|%b" --date=short --no-merges <range>
```

### 2. Categorize each commit

Map each commit message into one of the Keep a Changelog categories:

| Category    | Keywords / Patterns                                              |
|-------------|------------------------------------------------------------------|
| `Added`     | feat, add, new, introduce, implement, create                     |
| `Changed`   | refactor, update, improve, change, rename, move, migrate, bump  |
| `Deprecated`| deprecate, sunset, legacy                                        |
| `Removed`   | remove, delete, drop, clean up                                   |
| `Fixed`     | fix, bug, patch, resolve, correct, repair, revert               |
| `Security`  | security, cve, vulnerability, auth, xss, injection, sanitize    |

If a commit doesn't fit cleanly, use your best judgment. If it's truly ambiguous, place it in
`Changed` and note the uncertainty with `<!-- unclear -->` in a comment.

### 3. Detect breaking changes

Scan commit messages and bodies for:
- `BREAKING CHANGE:` in the body
- `!` after the type in conventional commits (e.g. `feat!:`)
- Words: "breaking", "incompatible", "migration required", "removed support for"

Flag these prominently under `⚠️ Breaking Changes` at the top of the version block.

### 4. Group by version

- If git tags are available: group commits under the nearest tag they belong to.
- If no tags exist: group under `[Unreleased]`.
- Format dates as `YYYY-MM-DD` using the tag date (or latest commit date in the group).

### 5. Write the CHANGELOG.md

Use this exact format:

```markdown
# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.2.0] - 2025-09-15

### ⚠️ Breaking Changes
- Removed `legacyAuth()` — migrate to `auth.verify()` (see docs/migration.md)

### Added
- Dark mode support across all dashboard views
- Export to CSV feature in reports module

### Fixed
- Race condition in WebSocket reconnection logic
- Incorrect timezone handling in scheduled jobs

### Changed
- Upgraded dependency X from 3.1 to 4.0

[Unreleased]: https://github.com/owner/repo/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/owner/repo/compare/v1.1.0...v1.2.0
```

### 6. Save and confirm

Write the result to `CHANGELOG.md` in the repository root.
Confirm the file was written and summarize: X versions documented, Y commits categorized,
Z breaking changes flagged.
