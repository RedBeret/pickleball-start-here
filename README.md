# Pickleball Start Here

A calm, phone-first beginner site for adults who want to start pickleball, buy the right basics without overspending, and walk onto the court with a printable one-page cheat sheet.

## What It Includes

- Three starter spending lanes: budget, committed, and competitive
- A gameified “level up” path instead of a wall of text
- Beginner doubles court-position guidance that works on a phone
- Shopping guidance with clean Amazon links and no affiliate clutter
- A one-page printable cheat sheet for court day

## Research Notes

Rules and beginner guidance were grounded in official USA Pickleball resources and practical gear roundups. Shopping notes were researched on April 4, 2026 and should be refreshed over time as prices and listings move.

Primary references:

- https://usapickleball.org/blog/how-to-play-pickleball/
- https://usapickleball.org/rules/
- https://usapickleball.org/strategies/pickleball-doubles-strategy-tips/
- https://www.pickleheads.com/pickleball-gear/pickleball-balls
- https://www.pickleheads.com/blog/pickleball-set

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run build
npm run lint
```

## GitHub Pages

This project is wired for GitHub Pages via GitHub Actions in [.github/workflows/deploy.yml](/Users/alfred/.openclaw/workspace/projects/pickleball-start-here/.github/workflows/deploy.yml).

How to publish:

1. Push the repo to GitHub.
2. In the repository settings, open Pages.
3. Under Build and deployment, choose `GitHub Actions`.
4. Push to `main` or run the workflow manually from the Actions tab.

Notes:

- The workflow sets `VITE_BASE_PATH` to the repository name so repo-based Pages URLs work automatically.
- If you later use a custom domain or the root `username.github.io` site, change `VITE_BASE_PATH` in the workflow to `/`.
