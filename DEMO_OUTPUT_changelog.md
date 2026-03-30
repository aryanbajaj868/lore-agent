# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.3.0] - 2025-09-14

### ⚠️ Breaking Changes
- Removed `legacyAuth()` — migrate to `auth.verify()` before upgrading (see docs/migration.md)

### Added
- Dark mode support across all dashboard views (#88)
- CSV export feature in the reports module (#91)
- Rate limiting on public API endpoints (#95)

### Fixed
- Race condition in WebSocket reconnection logic (#82)
- Incorrect timezone handling in scheduled jobs (#84)
- Null pointer error when user profile is incomplete (#90)

### Changed
- Upgraded `express` from 4.18 to 5.0 (#93)
- Refactored authentication middleware for clarity (#87)

## [1.2.1] - 2025-08-30

### Fixed
- Login redirect loop on Safari (#79)
- Missing index on `users.email` causing slow queries (#80)

### Security
- Patched XSS vulnerability in comment rendering (#81)
