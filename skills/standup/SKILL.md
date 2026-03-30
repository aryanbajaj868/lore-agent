---
name: standup
description: "Generates a concise daily standup summary from recent git commits. Can be scoped by author, branch, or time window. Output is ready to paste into Slack, Teams, or a standup bot."
allowed-tools: Bash
---

# Standup Skill

Turn recent commits into a crisp daily standup update — ready to copy and paste.

## Trigger

Use this skill when the user asks to:
- Generate a standup summary
- Summarize what was done today / yesterday / this week
- Create a "what did I work on" summary from git
- Prepare a sprint update from commits

## Steps

### 1. Determine the time window

| User says           | Git range to use                              |
|---------------------|-----------------------------------------------|
| "today"             | `--after="yesterday 11:59pm"`                 |
| "yesterday"         | `--after="2 days ago" --before="today"`       |
| "this week"         | `--after="last Monday"`                       |
| "last N days"       | `--after="N days ago"`                        |
| No time specified   | Default to `--after="yesterday 11:59pm"`      |

```bash
# Get commits for the window, optionally by author
git log --format="%H|%an|%ad|%s" --date=relative --no-merges --after="yesterday 11:59pm"

# If user wants their own commits only:
git log --format="%H|%an|%ad|%s" --date=relative --no-merges \
  --author="$(git config user.name)" --after="yesterday 11:59pm"

# Get affected files for context
git log --name-only --format="" --no-merges --after="yesterday 11:59pm" | sort | uniq
```

### 2. Group commits into themes

Don't list every commit verbatim. Group related commits into themes/tasks:

- Multiple "fix auth bug" commits → one bullet: "Fixed authentication bug in login flow"
- "add user model", "add user controller", "add user routes" → "Implemented user CRUD API"

### 3. Format the standup

Produce output in this format (adapt based on whether user wants Slack, Teams, plain text, or emoji):

**Default format (plain, Slack-ready):**
```
📅 Standup — [Day, Date]

✅ Yesterday / Today:
• [Theme 1] — [1 sentence summary]
• [Theme 2] — [1 sentence summary]
• [Theme 3] — [1 sentence summary]

🔜 Next:
[Only include if the user mentions upcoming tasks. Otherwise omit this section.]

🚧 Blockers:
[Only include if the user mentions blockers. Otherwise omit this section.]
```

**Alternate formats:**

*Short (for bots like Geekbot / Standuply):*
```
What did you do? [bullet list]
What will you do? [ask user or omit]
Any blockers? [ask user or omit]
```

*Narrative (for email/async):*
```
Yesterday I worked on [X], [Y], and [Z]. Today I'm planning to [...]
```

### 4. Adjust for audience

- **Technical standup**: Include branch names, ticket refs if present in commit messages
- **Manager-facing**: Translate to business impact ("completed user login feature" not "wired up JWT middleware")
- Default: technical, since the audience is the dev's own standup

### 5. Output

Print the standup to stdout. Do not save to file unless the user asks.
If commits are empty for the window, say: "No commits found for [window]. Either no code was pushed,
or you may want to check the author filter or branch."
