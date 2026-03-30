# Commit Health Report
**Range**: last 50 commits | **Generated**: 2025-09-15

## Overall Score: 6.4 / 10 🟡

## Anti-Pattern Summary
| Pattern                  | Count | % of commits |
|--------------------------|-------|--------------|
| Vague message            | 11    | 22%          |
| Missing issue reference  | 20    | 40%          |
| No body (large diff)     | 8     | 16%          |

## Hall of Fame
| SHA     | Score | Message |
|---------|-------|---------|
| a3f92c1 | 10/10 | `feat: add webhook support for third-party integrations (#74)` |
| b81de44 | 9/10  | `fix(auth): resolve race condition in WebSocket reconnection (#82)` |

## Hall of Shame
| SHA     | Score | Message |
|---------|-------|---------|
| f002aa1 | 2/10  | `fix fix fix` — vague, no context, no issue ref |
| g118bc3 | 2/10  | `wip` — unresolved draft committed to main |

## Recommendations
1. Add issue references — 40% of commits have no ticket link
2. Ban "wip" from main — use draft PRs instead
3. Require a body for large diffs (5+ files changed)
