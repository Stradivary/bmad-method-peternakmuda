---
title: Testing & QA Plan
date: 2025-10-20
createdBy: tea
updatedBy: tea
---

## Tujuan

Menjamin kualitas fungsional dan non-fungsional melalui unit tests, integration tests, dan otomatisasi CI.

## Scope

- Frontend: unit tests untuk semua komponen (Jest + React Testing Library)
- Backend/API: unit/integration tests untuk endpoint gallery
- Linting & type checks: TypeScript strict mode + ESLint
- Build validation: jalankan build sebelum deploy

## Minimum test coverage

- Target awal: 70% garis coverage per module; naik menjadi 85% saat stabil.

## Test examples

- Frontend unit test: mock fetch untuk `Gallery` component (lihat contoh `frontend/components/__tests__/Gallery.test.tsx`).
- API test: panggil `/api/gallery` dan verifikasi response schema.

## CI checks (recommended)

1. Install dependencies
2. Run lint
3. Run TypeScript compile (tsc --noEmit)
4. Run unit tests (jest --ci --coverage)
5. Build (next build)

Jika semua lulus → deploy ke Vercel (atau merge ke branch release).

## QA checklist (manual + automated)

Automated:
- Lint passes
- Typecheck passes
- Tests pass with minimum coverage
- Build success

Manual:
- Smoke test on staging (navigation, forms, gallery load)
- Accessibility basic audit (axe or Lighthouse)
- Visual check on mobile & desktop

## How to run tests (local, Windows PowerShell)

```powershell
cd frontend
npm ci
npm run test -- --watchAll=false
``` 

Untuk build check:

```powershell
npm run build
```
