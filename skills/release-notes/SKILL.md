---
name: release-notes
description: "Generates polished, human-readable release notes between two git refs (tags, SHAs, or branches). Produces output suitable for GitHub Releases, product announcements, or internal comms."
allowed-tools: Bash Read Write
---

# Release Notes Skill

Produce professional release notes for a specific version or release window.

## Trigger

Use this skill when the user asks to:
- Write release notes for a version
- Generate notes for a GitHub Release
- Summarize what's in a specific tag or version
- Create an announcement for a new release

## Steps

### 1. Identify the release range

```bash
# List recent tags
git tag --sort=-version:refname | head -10

# Get commits between two refs
git log <from>..<to> --oneline --no-merges

# Get full details
git log <from>..<to> --format="%H|%an|%ad|%s%n%b" --date=short --no-merges

# Check what files changed (gives scope context)
git diff --stat <from>..<to>
```

If the user says "latest release", use the most recent tag as `<to>` and the one before it as `<from>`.

### 2. Identify the audience

Default to **dual audience** (technical + non-technical) unless the user specifies otherwise:
- **Technical**: engineers, open-source contributors — want specifics, PRs, SHAs
- **Non-technical**: product managers, stakeholders — want features, benefits, impact

### 3. Structure the release notes

Use this template:

```markdown
# Release [version] — [date]

> One-sentence summary of what this release is about.

## ✨ What's New

[User-facing features and improvements. Written in plain language.
Focus on what users can now *do*, not implementation details.]

## 🐛 Bug Fixes

[Notable bugs fixed. Describe the symptom that was fixed, not the root cause.]

## 🔧 Under the Hood

[Technical changes: refactors, dependency updates, performance improvements.
Keep this short for non-technical audiences.]

## ⚠️ Breaking Changes

[Only present if there are breaking changes. Describe what breaks and the migration path.]

## 👥 Contributors

[List contributors who appear in this range's git log, if more than one person.]

---
Full diff: [link if remote can be inferred]
```

### 4. Write the right tone

- **Lead with value**: Start with what the user *gains*, not what the developer *did*.
- **Active voice**: "Added dark mode" not "Dark mode has been added".
- **No jargon** in the "What's New" section. Save technical terms for "Under the Hood".
- **Be specific**: "Reduced API response time by ~40%" beats "improved performance".

### 5. Infer the remote URL if possible

```bash
git remote get-url origin
```

Use it to construct comparison links like:
`https://github.com/owner/repo/compare/v1.0.0...v1.1.0`

### 6. Output

Print the release notes to stdout AND offer to write them to `RELEASE_NOTES_<version>.md`.
Ask the user if they want the file saved.
