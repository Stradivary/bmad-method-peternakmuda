---
title: Arsitektur Teknis — Landingpage Peternak Muda
date: 2025-10-21
author: BMad
---

Dokumen ini merangkum desain arsitektur untuk project "Peternak Muda" berdasarkan `docs/requirements.md`.
Tujuan: memberi gambaran implementasi teknis, aliran data, keputusan teknologi, dan rencana operasi sehingga tim engineering dan analyst bisa menyusun tugas implementasi.

Ringkasan kontrak singkat
- Input: konten editorial (teks, gambar), data gallery (CSV/JSON), assets (logo/foto), environment variables untuk deploy.
- Output: situs Next.js responsif yang memuat komponen Hero, About, Gallery, Contact, Footer; API `GET /api/gallery` dan `POST /api/contact`; pipeline CI/CD ke Vercel.
- Error modes: API unavailable, image missing, invalid submission, build failure.

1. Gambaran Arsitektur (tingkat tinggi)

Frontend (Next.js 15 + TypeScript)
- App Router (recommended): halaman statis/dinamis, SSR/ISR bila diperlukan untuk SEO/OG.
- Komponen UI: `components/` — Hero, About, Gallery, Contact, Footer.
- Styling: TailwindCSS (design tokens di `tailwind.config.ts`).
- Animasi: Framer Motion (micro-interactions, modal transitions).
- Data fetching: SWR / fetch wrapper yang menggunakan caching + revalidation untuk endpoint API.

Backend/API (serverless via Next.js API Routes)
- API endpoints (MVP):
  - GET /api/gallery -> list items (JSON, supports page/limit/q)
  - POST /api/contact -> accept contact submissions (validasi + persist simple store)
- Data store MVP: flat JSON files under `data/` (e.g., `data/gallery.json`, `data/contact-submissions.json`).
- Production option: migrate to Postgres/SQLite or headless CMS (Strapi/Sanity) jika perlu.

Hosting & CI/CD
- Primary: Vercel Git Integration (recommended)
  - Import repository into Vercel and set Root directory to `frontend`. Vercel will automatically create Preview deployments for PRs and Production deployments on merge to the configured branch (typically `main`).
  - CI checks (pre-deploy): lint, typecheck (tsc --noEmit), jest tests, build (next build). Keep these checks in GitHub Actions to fail fast; Vercel will only deploy code that is pushed to the repo (previews on PRs, production on merge).

- Optional: Vercel CLI from CI (advanced)
  - If finer control is needed (e.g., deploy promotions, or deploy from a specific runner), use Vercel CLI in GitHub Actions with a `VERCEL_TOKEN` stored as a GitHub secret. This is optional — the Git Integration is preferred for simplicity.

Observability & Monitoring
- Error tracking: Sentry (optional)
- Build & deploy logs: Vercel dashboard

2. Komponen & Data Flow

Flow sederhana saat pengunjung membuka halaman Gallery:

1. Browser -> Next.js page `/gallery` (SSR or static) renders Gallery component
2. Gallery component calls `GET /api/gallery` (SWR) -> API reads `data/gallery.json` -> returns JSON
3. Client displays grid; images lazy-load via `loading="lazy"`
4. User clicks thumbnail -> open Lightbox modal (Framer Motion) -> optionally preload hi-res

Diagram ASCII (very small):

  [Browser]
     |
     v
  [Next.js (frontend)] <---> [GET /api/gallery]
     |                          |
     v                          v
  [Components]                [data/gallery.json]

3. API Contract (ringkas)

GET /api/gallery
- Query params: page (number), limit (number), q (string optional)
- Response 200: [{ id, title, image, description, createdAt }]
- Error 500/503: { error: string }

POST /api/contact
- Body: { name, email, message, consent }
- Validasi: required fields + email format; 400 on invalid
- On success: 200/201 + persist minimal

4. Non-functional Requirements (implementasi detail)

- Performance: gunakan optimasi gambar (next/image or manual srcset) dan caching (SWR). Gunakan ISR/SSG untuk halaman yang jarang berubah.
- Accessibility: semantic HTML, alt text untuk semua gambar, keyboard navigable modals, aria labels.
- SEO: server-side meta tags (next/head) dan JSON-LD untuk gallery items.
- Security: sanitasi input, validate content on server, tidak commit secrets.

5. Scaling & Operational Patterns

- Traffic: Vercel autoscaling handles frontend and serverless concurrency for expected low-medium traffic. If traffic grows:
  - Move gallery storage to managed DB (Postgres) and add caching layer (Redis) or static CDN for images.
  - Offload heavy image assets to storage bucket + CDN (Vercel, Cloudflare, or S3 + CloudFront).

- Rate-limiting: implement optional rate-limit middleware on API routes to prevent abuse.

6. Deployment & CI/CD Pipeline (recommended)

- On PR:
  1. Run linters (ESLint), typecheck (tsc --noEmit), unit tests (jest --ci --coverage)
  2. Run `next build` to ensure build passes
  3. Create Vercel Preview (automatic)

- On merge to main:
  1. CI runs same checks
  2. Vercel automatically deploys to production
  3. Post-deploy smoke tests (basic HTTP 200 check on home route or /api/health)

7. Testing Strategy

- Unit tests: Jest + React Testing Library for components (Hero, Gallery, Contact, Footer). Example: `frontend/components/__tests__/Gallery.test.tsx`.
- Integration tests for API: jest + supertest (if running Node server locally) or direct function tests for route handlers.
- E2E (optional): Playwright or Cypress for critical flows (submit contact, share, gallery lightbox).

8. Security & Privacy

- Validate and sanitize all inputs server-side.
- For analytics/tracking, require user consent via checkbox before enabling non-essential trackers.
- Store minimal PII in contact submissions; if stored, protect file/db access and consider deleting after retention period.

9. Mapping ke Requirements & Implementation Roadmap

- Sprint 1 (MVP):
  - FE: Hero (FE-01), About (FE-02)
  - API: GET /api/gallery (API-01) with `data/gallery.json`
  - Tests: baseline for Gallery component

- Sprint 2:
  - FE: Gallery (FE-03) full (grid + modal)
  - API: POST /api/contact (API-02)
  - CI: lint/typecheck/tests in pipeline

- Sprint 3:
  - FE: Contact (FE-04), Footer & Social (FE-05)
  - Deployment hardening & monitoring

10. Risks & Mitigations

- Risk: Serving large images slows FCP. Mitigation: Use optimized images, responsive srcset, lazy-loading, CDN.
- Risk: API abuse. Mitigation: rate-limiting, simple auth for admin endpoints, input validation.
- Risk: Accessibility gaps. Mitigation: Axe/lighthouse checks during QA; include accessibility in acceptance criteria.

11. Next steps (technical)

1. Agree tech stack & create project skeleton (Next.js app with TypeScript + Tailwind + Framer Motion).
2. Implement `GET /api/gallery` backed by `data/gallery.json` and create `Gallery` component with unit tests.
3. Add CI pipeline scripts and connect Vercel preview.
4. Implement `POST /api/contact` and contact form with server-side validation.

Referensi: `docs/requirements.md`, `docs/components.md`, `docs/api-gallery.md`, `docs/testing-and-qa.md`, `docs/deployment.md`.

---

Dokumen ini adalah rancangan arsitektur level-1. Jika Anda mau, saya bisa:
- Membuat diagram sequence / mermaid (jika diperlukan),
- Membuat skeleton repository files (Next.js app + components + api routes + tests) dan menjalankan test lokal,
- Membuat GitHub Actions workflow example untuk CI.
