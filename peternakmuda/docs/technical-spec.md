---
title: Spesifikasi Teknis — Landingpage Peternak Muda
date: 2025-10-20
---

## Kontrak singkat (untuk analyst dan engineer)

- Input: Konten editorial (teks, gambar), data gallery (JSON), assets (logo, foto), akun Vercel untuk deploy.
- Output: Situs statis/dinamis Next.js yang responsif, API gallery (REST), pipeline CI/CD otomatis ke Vercel, suite unit test untuk FE dan BE.
- Error modes: API tidak tersedia, gambar hilang, data kosong, build gagal.
- Success criteria: Semua komponen utama ter-render, API gallery mereturn HTTP 200 dengan schema yang didokumentasikan, test suite minimal 80% passing, deploy otomatis ke Vercel berhasil.

## Teknologi

- Framework: Next.js 15 (app router + TypeScript)
- Styling: TailwindCSS
- Animasi: Framer Motion
- Testing: Jest + React Testing Library
- CI/CD: Vercel (production) + optional GitHub Actions untuk checks
- Backend API: Next.js API Routes (atau serverless functions) untuk endpoint gallery

## Struktur proyek (usulan)

frontend/
- app/ (Next.js pages/routes)
- components/ (Hero, About, Gallery, Contact, Footer, shared)
- styles/ (Tailwind config)
- utils/ (fetchers, helpers)
- tests/ (unit/integration tests)

backend/ (optional jika ingin service terpisah)
- api/ (express/fastify or serverless handlers)
- models/
- tests/

public/
- images/
- assets/

docs/
- spesifikasi, API, QA, workflows (this folder)

## Desain API — ringkasan

Detail API ada di `api-gallery.md`. Endpoint utama: `GET /api/gallery` -> mengembalikan list gallery.

Schema item gallery (JSON):

{
  "id": number,
  "title": string,
  "image": string (URL relatif atau absolut),
  "description": string,
  "createdAt": string (ISO8601, optional)
}

## Non-functional requirements

- Performance: First Contentful Paint < 1.5s pada koneksi 3G (optimisasi gambar & caching)
- Accessibility: WCAG AA untuk komponen utama (semua gambar memiliki alt, headings berurutan)
- SEO: OG tags, meta description, JSON-LD untuk konten gallery
- Security: Sanitasi input API, rate-limiting optional
- Observability: Logging build & runtime errors, Sentry optional

## Edge cases yang harus di-handle

1. Data gallery kosong → tampilkan placeholder / call-to-action
2. Gambar gagal dimuat → fallback gambar default
3. API down → tampilkan pesan error dan retry button
4. Konten besar → lazy-load gambar + pagination/infinite scroll untuk gallery
