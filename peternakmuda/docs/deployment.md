---
title: Deployment Guide — Vercel
date: 2025-10-21
createdBy: pm
---

This document describes how to deploy the frontend (Next.js) to Vercel and the recommended CI checks.

1) Recommended flow (Vercel Git Integration)

- Connect the Git repository to Vercel (via Vercel dashboard -> New Project -> Import Git Repository).
- Configure Production and Preview environment variables in the Vercel project settings.
- With the Git integration enabled, every Pull Request will create a Preview Deployment automatically. Merging to `main` triggers a Production deploy.

2) GitHub Actions (pre-deploy checks)

- We include a workflow at `.github/workflows/deploy-vercel.yml` which performs:
  - Install deps (frontend)
  - ESLint
  - Typecheck (tsc --noEmit)
  - Tests (jest)
  - Build (`next build`)

This workflow does not perform the actual Vercel deploy; it ensures the branch is buildable before Vercel picks it up.

3) CLI-based deploy (optional)

If you prefer to trigger deploys from CI using the Vercel CLI (instead of Git integration), add the secret `VERCEL_TOKEN` to your repository's Secrets and update the workflow to run a deploy step on push to `main`:

Example deploy step (pseudo):

```bash
npx vercel --token $VERCEL_TOKEN --prod
```

Notes:
- Never commit tokens or environment variables to the repository.
- Use `NEXT_PUBLIC_` prefix for any environment variables that must be available on the client.
- After production deploy, perform smoke tests (HTTP 200 check on `/` and `/api/gallery`).

4) Rollback

- Vercel retains previous deployments; you can restore a prior deployment from the Vercel dashboard by promoting a previous deployment to production.

5) Troubleshooting

- If build fails in CI: inspect `npm run build` logs in Actions; fix TypeScript or dependency issues.
- If Preview doesn't appear: confirm Vercel Git integration is connected to the repository and branch.

6) How to connect the repository to Vercel (step-by-step)

- Option A — Recommended: Vercel Git Integration (no token required)
  1. Go to https://vercel.com/new and click "Import Git Repository".
  2. Choose your Git provider (GitHub) and authorize Vercel to access the repository (if not already authorized).
  3. Select the repository `Stradivary/bmad-method-peternakmuda` (or your fork) and click Import.
  4. Vercel auto-detects Next.js apps. Set the Root (if your Next.js app is in `frontend`, set Root directory to `frontend`).
  5. Review Environment Variables and add any required keys for Preview and Production.
  6. Finish import — Vercel will create Preview deploys for PRs and deploy to Production on merge to `main`.

- Option B — Explicit CI deploy with Vercel CLI (optional)
  1. Create a Vercel token: https://vercel.com/account/tokens → "Create Token". Copy the token value.
  2. Add the token to GitHub repository secrets (`Settings` → `Secrets and variables` → `Actions` → `New repository secret`) as `VERCEL_TOKEN`.
  3. (Optional, using GitHub CLI) from PowerShell you can run:

```powershell
# Replace with your token value
$env:VERCEL_TOKEN = 'ghp_xxx'
# Using GitHub CLI to set secret for repo (install gh and authenticate first)
# gh repo set-secret requires gh version that supports set-secret; alternative is gh secret set
gh secret set VERCEL_TOKEN --body "$env:VERCEL_TOKEN" --repo Stradivary/bmad-method-peternakmuda
```

  4. Update `.github/workflows/deploy-vercel.yml` to add a deploy step on `push` to `main` that runs:

```powershell
npx vercel --prod --token $env:VERCEL_TOKEN --confirm
```

  Note: Using the CLI from CI will perform the deploy directly; ensure your workflow runs from the repository root and `working-directory` is set to the project root or `frontend` as needed.

7) Verification & Smoke Tests

- After connecting, open a Pull Request and confirm Vercel created a Preview deployment (Vercel UI shows deployments and URLs).
- After merging to `main`, check the Production deployment URL in Vercel and run simple smoke tests:

```powershell
Invoke-WebRequest -Uri 'https://<your-production-url>/' -UseBasicParsing | Select-Object StatusCode
Invoke-WebRequest -Uri 'https://<your-production-url>/api/gallery' -UseBasicParsing | Select-Object StatusCode
```

Replace `<your-production-url>` with the Vercel-provided domain.

---

Quick checklist — Import to Vercel (copy-paste)

1) Import repository: https://vercel.com/new → Import Git Repository → choose GitHub repo `Stradivary/bmad-method-peternakmuda`.
2) Important: Set Root Directory = `frontend` (so Vercel finds `frontend/package.json`).
3) Confirm Build Command = `npm run build` and Framework = Next.js.
4) Add environment variables (Preview & Production) in Vercel Project Settings.
5) Click Deploy. Verify the first deployment succeeds in Vercel Dashboard → Deployments.
6) Create a PR in GitHub — Vercel should create a Preview automatically. Merge to `main` → production deploy.

Reference: CI checks run from `.github/workflows/deploy-vercel.yml` (lint, typecheck, test, build).

