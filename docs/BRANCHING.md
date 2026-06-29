# Branching Strategy

This document defines the branch structure, workflow, and conventions for the Burner Wallet project.

## Main Branches

| Branch | Purpose |
|--------|---------|
| `master` | Production-ready code. Only merged via pull request from `develop` after passing CI and review. |
| `develop` | Integration branch for features. All feature branches merge here first. |
| `staging` | Pre-production testing environment (optional — create when a release candidate is ready). |

## Supporting Branches

### Feature Branches
- **Naming:** `feature/<short-description>` or `feat/<short-description>`
- **Created from:** `develop`
- **Merged into:** `develop`
- **Lifecycle:** Delete after merge.

### Bugfix Branches
- **Naming:** `fix/<short-description>` or `bugfix/<issue-number>`
- **Created from:** `develop` (for bugs found during development) or `master` (for hotfixes)
- **Merged into:** `develop` or `master` respectively.

### Hotfix Branches
- **Naming:** `hotfix/<version-or-issue>`
- **Created from:** `master`
- **Merged into:** both `master` and `develop`
- Use when a critical production bug must be fixed immediately.

### Release Branches
- **Naming:** `release/<version>`
- **Created from:** `develop`
- **Merged into:** `master` and `develop`
- Used to finalize a release (version bumps, changelog, final QA).

## Workflow for Contributors

1. **Fork the repository** and clone your fork locally.
2. Create a feature branch from `develop`:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/my-feature
   ```
3. Make changes, commit with descriptive messages.
4. Push your branch to your fork:
   ```bash
   git push origin feature/my-feature
   ```
5. Open a **Pull Request** targeting the upstream `develop` branch.
6. Request a review and address feedback.
7. Once approved and merged, delete your feature branch.

## Commit Conventions

- Use [Conventional Commits](https://www.conventionalcommits.org/) where practical:
  - `feat:` — new feature
  - `fix:` — bug fix
  - `docs:` — documentation
  - `refactor:` — code restructuring without behavior change
  - `test:` — adding or updating tests
  - `chore:` — maintenance tasks
- Keep commits small and focused. One logical change per commit.

## Merging

- Open a Pull Request from your branch into `develop` (or `master` for hotfixes).
- At least one approving review is required before merging.
- Prefer **squash merge** for feature branches to keep `develop` history clean.
- Use **merge commit** for release and hotfix branches to preserve context.
