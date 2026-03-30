# 📜 Lore — The Git Historian

> *"Every commit tells a story. Lore reads them all."*

Lore is a gitagent that lives in your git repo and turns raw commit history into documentation humans actually want to read. It generates changelogs, release notes, standup summaries, and commit health reports — all grounded in your actual git data, never fabricated.

---

## ✨ Skills

| Skill | What it does |
|-------|-------------|
| `changelog` | Generates a `CHANGELOG.md` following Keep a Changelog format, grouped by version/tag |
| `release-notes` | Writes polished release notes between two git refs — for GitHub Releases or announcements |
| `commit-health` | Audits commit message quality, scores each commit, and produces a health report |
| `standup` | Summarizes recent commits into a copy-paste standup update for Slack/Teams |

---

## 🚀 Quick Start

### Install & validate

```bash
# Install the CLI (scoped package — note the @open-gitagent/ prefix)
npm install -g @open-gitagent/gitagent

# Validate your agent definition
cd lore-agent
gitagent validate
gitagent info
```

### Run directly from GitHub (no clone needed)

```bash
# Run against any local project with Claude
npx @open-gitagent/gitagent@latest run -r https://github.com/YOUR_USERNAME/lore-agent -a claude

# Or run against a specific repo
npx @open-gitagent/gitagent@latest run \
  -r https://github.com/YOUR_USERNAME/lore-agent \
  --dir /path/to/your-project \
  -a claude \
  "Generate a changelog for the last 3 months"
```

### Run with gitclaw (alternative)

```bash
npm install -g gitclaw
cd /path/to/your-project
gitclaw --dir . "Generate a changelog for the last 3 months"
```

---

## 💬 Example Prompts

```
"Generate a changelog for the last 50 commits"
"Write release notes between v1.2.0 and v1.3.0"
"Give me a commit health report for the main branch"
"Summarize what I worked on today for standup"
"Create release notes for the latest tag"
```

---

## 📁 Structure

```
lore-agent/
├── agent.yaml                    # Manifest
├── SOUL.md                       # Lore's identity and values
├── RULES.md                      # Hard constraints (read-only git, no fabrication)
├── skills/
│   ├── changelog/SKILL.md        # CHANGELOG.md generator
│   ├── release-notes/SKILL.md    # Release notes writer
│   ├── commit-health/SKILL.md    # Commit quality auditor
│   └── standup/SKILL.md          # Daily standup summarizer
└── README.md                     # This file
```

---

## 🏛️ Design Principles

**Read-only by contract.** Lore's RULES.md explicitly forbids any git write operations.
It reads history; it never makes it.

**Accuracy over completeness.** If a commit is ambiguous, Lore says so rather than guessing.
Honest uncertainty is better than confident fiction.

**Dual-audience output.** Release notes are written for both engineers and stakeholders.
Changelogs follow a standard so tooling can parse them. Standups are ready to paste.

---

## 🧪 Demo

Run Lore against the gitagent repo itself (no local setup needed):

```bash
# Validate the agent first
npm install -g @open-gitagent/gitagent
cd lore-agent && gitagent validate && gitagent info

# Run against any repo with Claude
npx @open-gitagent/gitagent@latest run \
  -r https://github.com/YOUR_USERNAME/lore-agent \
  -a claude \
  "Generate a changelog for the last 50 commits"

npx @open-gitagent/gitagent@latest run \
  -r https://github.com/YOUR_USERNAME/lore-agent \
  -a claude \
  "Run a commit health audit on the last 50 commits"
```

---

*Built for the gitagent Hackathon. Lore is defined as a git repo, runs via gitclaw, and has no external dependencies.*
