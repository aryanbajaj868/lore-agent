---
name: commit-health
description: "Analyzes commit message quality across a git range. Scores each commit, identifies anti-patterns, and gives a repo-level health report with actionable advice."
allowed-tools: Bash Read Write
---

# Commit Health Skill

Audit the quality of commit messages in this repository and generate a health report.

## Trigger

Use this skill when the user asks to:
- Audit commit quality
- Check if commit messages follow conventions
- Get a "commit health" or "commit hygiene" report
- Review contribution quality before a code review or merge

## Steps

### 1. Gather commits

```bash
# Get commits to analyze (default: last 100, or user-specified range)
git log --format="%H|%an|%ae|%ad|%s" --date=iso --no-merges -n 100

# For each flagged commit, get the full body too
git show --format="%B" --no-patch <sha>
```

### 2. Score each commit (0–10)

Apply this rubric:

| Criterion | Points | Description |
|-----------|--------|-------------|
| Subject length (50–72 chars) | +2 | Not too short, not too long |
| Imperative mood | +2 | "Add feature" not "Added feature" or "Adding feature" |
| No trailing period | +0.5 | Subject lines don't end with `.` |
| Has a body (for complex changes) | +2 | Multi-file changes warrant explanation |
| References issue/ticket | +1.5 | e.g. `Fixes #42`, `Closes JIRA-123` |
| Conventional commit format | +2 | `feat:`, `fix:`, `chore:` prefix |

**Anti-patterns** (deduct points or flag):
- 🚩 `fix fix fix`, `wip`, `asdf`, `temp`, `test`, `update`, `changes` → **Vague** (-3)
- 🚩 Subject over 100 chars → **Too long** (-2)
- 🚩 Subject under 10 chars → **Too short** (-2)
- 🚩 Commit message is just a filename → **Uninformative** (-2)
- 🚩 "WIP" commits in a merged branch → **Unresolved draft** (-1)
- 🚩 Repeated identical messages → **Copy-paste commits** (-2)

### 3. Compute repo-level stats

```
Total commits analyzed: N
Average score: X.X / 10
Score distribution: ██████░░░░ (histogram)

Top contributors by commit quality (average score):
  @alice   8.4 / 10  (32 commits)
  @bob     6.1 / 10  (18 commits)

Most common anti-patterns:
  1. Vague messages (23%)
  2. Missing issue references (41%)
  3. No commit body for large diffs (17%)
```

### 4. Generate the health report

Write a report with these sections:

```markdown
# Commit Health Report
**Repo**: <name> | **Range**: <range> | **Generated**: <date>

## Overall Score: 6.8 / 10 🟡

## Score Distribution
[ASCII histogram of per-commit scores]

## Anti-Pattern Summary
| Pattern              | Count | % of commits |
|----------------------|-------|--------------|
| Vague message        | 18    | 24%          |
| Missing issue ref    | 31    | 41%          |
| No body (large diff) | 12    | 16%          |

## Hall of Fame (Top 5 commits)
[SHA] [score] [message] — what made this one great

## Hall of Shame (Bottom 5 commits)
[SHA] [score] [message] — what to avoid

## Recommendations
1. [Specific, actionable advice based on the most common issues found]
2. ...

## Per-Contributor Summary
| Author  | Commits | Avg Score | Common Issues |
|---------|---------|-----------|---------------|
```

### 5. Save the report

Write the report to `commit-health-report.md`.
Print a one-paragraph summary to stdout with the overall score and the #1 recommendation.
