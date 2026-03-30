import { readFileSync } from "fs";
import { execSync } from "child_process";

const soul = readFileSync("./SOUL.md", "utf8");
const rules = readFileSync("./RULES.md", "utf8");
const skills = ["changelog", "release-notes", "commit-health", "standup"]
  .map(s => `\n\n## Skill: ${s}\n` + readFileSync(`./skills/${s}/SKILL.md`, "utf8"))
  .join("");

const systemPrompt = `${soul}\n\n${rules}\n\n# Skills\n${skills}`;

const targetDir = process.argv.includes("--dir")
  ? process.argv[process.argv.indexOf("--dir") + 1]
  : ".";

const gitLog = execSync(`git -C "${targetDir}" log --oneline --no-merges -50`, { encoding: "utf8" });
const userPrompt = `${process.argv[process.argv.length - 1]}\n\nGit log:\n${gitLog}`;

const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01"
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }]
  })
});

const data = await res.json();
console.log("Full response:", JSON.stringify(data, null, 2));
