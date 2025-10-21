---
title: Technical Specification — Peternak Muda (Gallery MVP)
date: 2025-10-21
---

## Summary

This technical specification covers the Gallery MVP feature for the Peternak Muda landing page. It is a Level 1 feature: a coherent front-end feature with a supporting API endpoint and minimal server logic. The document is definitive and prescriptive.

## Source Tree Changes

- `frontend/components/Gallery.tsx` — Gallery component and lightbox UX (already implemented)
- `frontend/app/api/gallery/route.ts` — API endpoint providing paginated/searchable gallery data
- `frontend/data/gallery.json` — data source for MVP

## Implementation Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5.x
- TailwindCSS 3.x
- Framer Motion 10.x
- Node.js 20 runtime (for CI and local builds)

## Technical Details

- API Contract: `GET /api/gallery`
  - Query params: `page` (integer, default 1), `limit` (integer, max 50, default 12), `q` (string, optional search)
  - Response: 200 JSON array of items: { id, title, image, description, createdAt }

- Gallery component:
  - Fetches `/api/gallery` and renders grid
  - Images lazy-load (`loading="lazy"`) and fallback to `/gallery/fallback.jpg` on error
  - Lightbox modal with Esc key to close

## Testing Approach

- Unit tests (Jest + RTL) for:
  - API route: happy path, pagination, search
  - Gallery component: renders items, opens/closes lightbox, fallback image handling

## Deployment Strategy

- Build with `npm run build` in `frontend`.
- Deploy to Vercel (connect repo, set branch `main` to production). Use environment protection and preview deployments for PRs.

## Next Steps

- Generate epics & stories for implementation (see `epics.md`).
---
title: Technical Specification — Gallery MVP & API
date: 2025-10-21
author: PM
---

Ringkasan singkat
- Scope: Implementasi Gallery frontend (komponen Grid + Lightbox) dan API `GET /api/gallery` untuk MVP.
- Project level: 1 (feature dalam codebase existing)
- Output: `frontend/components/Gallery.tsx` (refine), `app/api/gallery/route.ts` (exists, validate), `data/gallery.json` (seed), unit & integration tests, CI checks.

1. Kontrak teknis (definitive)

GET /api/gallery
- Path: `app/api/gallery/route.ts` (Next.js App Router API Route)
- Method: GET
- Query params: `page` (number, default 1), `limit` (number, default 12), `q` (string, optional)
- Response 200: JSON array of items: { id: number, title: string, image: string, description: string, createdAt: string }
- Error: 500 with { error: string }
- Data source (MVP): `frontend/data/gallery.json` (seeded). Server reads JSON synchronously via import.

Gallery Component
- File: `frontend/components/Gallery.tsx` (React client component)
- Behavior:
  - On mount, fetch `/api/gallery?page=1&limit=12` via native `fetch` (or wrapper) and render grid.
  - Show loader: "Memuat galeri..." while loading.
  - Show error text "Gagal mengambil data gallery" when fetch.ok === false.
  - Responsive grid: desktop 3 columns (md:grid-cols-3), mobile 1 column.
  - Images use `img` tag with `loading="lazy"` and correct `alt` from item.title.
  - Clicking an item opens Lightbox modal (Framer Motion) showing hi-res image and description; modal is keyboard accessible (Esc to close, focus trap).

Implementation details (files to change)
- `frontend/components/Gallery.tsx` — ensure fetch path `/api/gallery`, add loading/error states, ensure `motion.img` mocked in tests remains compatible.
- `app/api/gallery/route.ts` — validate response shape, implement `page`/`limit`/`q` handling.
- `frontend/data/gallery.json` — ensure seeded objects include `createdAt` ISO strings.
- `frontend/components/__tests__/Gallery.test.tsx` — existing tests should pass; add an additional test for `createdAt` presence if desired.

Testing
- Unit tests: Jest + React Testing Library. Existing `Gallery.test.tsx` covers happy path and error path. Keep mocks for `fetch` and `framer-motion` (as present).
- API tests: route.unit test already exists (`app/api/gallery/route.test.ts`) — ensure it asserts createdAt and query params behavior.
- Coverage: Ensure module-level coverage target >= 70% initially.

Security & NFR
- Sanitize query param `q` server-side (trim + limit length 200).
- Do not accept HTML in title/description — treat as text only.
- Accessibility: images with alt, modal focus management, keyboard traps.

Deployment & CI
- CI steps: `npm ci && npm run lint && npm run build && npm test` (already configured in `.github/workflows/ci.yml`).

Source tree patch (exact files to create/modify)
- Add/ensure `frontend/data/gallery.json` exists with createdAt fields.
- Validate `app/api/gallery/route.ts` to support page/limit/q and proper status codes.
- Small refinements to `frontend/components/Gallery.tsx` to ensure ARIA, lazy-loading and fallback image.

Testing Approach (detailed)
- Component tests:
  - Happy path: mock global.fetch returns array with id,title,image,description,createdAt — assert headings, images src and description present.
  - Error path: mock fetch.ok = false — assert error message present.
  - Accessibility: modal trapping and Esc closes modal (unit test simple keydown check).
- API tests:
  - Unit test for GET returns 200 and JSON schema (existing `route.test.ts`)
  - Test for pagination: request with `?page=2&limit=1` returns expected slice.

Deployment notes
- Vercel: uses Next.js App Router; no additional server required. Ensure `data/gallery.json` is included in build.

Appendix: Decisions (definitive)
- Next.js: 15.3.0 (locked via package.json). Keep as-is.
- framer-motion: use installed version present in package.json.
- Tests: jest ^30 as devDependency (existing).

---

Saya akan menyimpan `docs/tech-spec.md` sekarang sebagai checkpoint (template-output). Selanjutnya saya akan menjalankan advanced elicitation (`adv-elicit`) untuk memperkuat bagian Technical Approach dan Testing Approach dengan 3-5 metode terpilih.
