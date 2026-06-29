# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in the Burner Wallet, please do **not** open a public issue. Instead, report it privately to the maintainers.

## Dependency Management

### Automated Updates
This repository uses **Dependabot** to automatically monitor and update dependencies. Dependabot will open pull requests when:
- A new version of a dependency is available
- A security vulnerability is disclosed for a dependency

### Lockfile
Always commit `package-lock.json` or `yarn.lock` to pin exact dependency versions. This prevents supply-chain attacks via malicious patch versions (e.g., the 2018 event-stream incident).

### Review Process
- Review all Dependabot PRs within 7 days
- For critical security patches, merge within 24 hours
- Run `npm audit` or `yarn audit` before each release
- Prefer exact versions (`1.2.3`) or tilde ranges (`~1.2.3`) over caret ranges (`^1.2.3`) for production-critical dependencies

## Supported Versions
Only the latest `master` branch is actively supported with security updates.
