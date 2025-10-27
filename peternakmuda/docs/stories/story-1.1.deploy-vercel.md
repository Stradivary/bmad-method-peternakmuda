---
title: Story 1.1: Deploy Frontend ke Vercel
date: 2025-10-21
author: BMad
createdBy: sm
---

Status: Approved

## Story

Sebagai tim pengembang,
Saya ingin menyiapkan pipeline CI/CD dan konfigurasi proyek sehingga frontend (Next.js) dapat dideploy otomatis ke Vercel pada setiap merge ke branch utama dan membuat Preview Deploy untuk PR,
sehingga tim dapat memverifikasi build dan QA sebelum produksi.

## Acceptance Criteria

1. Pipeline CI berjalan pada PR dan pada merge ke `main` dengan langkah: lint, typecheck (tsc --noEmit), test, dan `next build`.
2. Setiap PR menghasilkan Vercel Preview Deploy yang dapat diakses (URL tercatat di hasil CI).
3. Merge ke `main` memicu deploy produksi di Vercel dan menghasilkan URL produksi.
4. Rahasia/secret yang diperlukan (mis. `VERCEL_TOKEN`, environment variables) disimpan di Secrets repository / Vercel Project dan tidak dicommit ke repositori.
5. Smoke test pasca-deploy (cek HTTP 200 pada `/` dan `/api/gallery`) berhasil.
6. Dokumentasi singkat langkah deploy dan rollback ditambahkan ke `docs/deployment.md` atau `README.md` pada root.

## Tasks / Subtasks

- [ ] 1. Tambah workflow CI untuk build & deploy
  - [ ] a. Buat file `.github/workflows/deploy-vercel.yml` yang menjalankan: checkout, setup-node, cache, install, lint, typecheck, test, build
  - [ ] b. Integrasikan langkah untuk trigger Vercel Deploy (gunakan Vercel Git integration OR `vercel` CLI with `VERCEL_TOKEN`)
  - [ ] c. Pastikan upload artefak/log dan cetak URL preview (jika tersedia)

- [ ] 2. Konfigurasi Vercel Project
  - [ ] a. Pastikan repository terhubung di Vercel (Git integration) atau siapkan `VERCEL_TOKEN` untuk CLI deploy
  - [ ] b. Tambahkan environment variables produksi dan preview di Vercel (lihat `docs/architecture.md` untuk daftar variabel yang dibutuhkan)

- [ ] 3. Tambah file konfigurasi opsional
  - [ ] a. `vercel.json` (build settings / redirects) jika diperlukan
  - [ ] b. `README.md` / `docs/deployment.md` update dengan langkah rollback dan cek pasca-deploy

- [ ] 4. Testing & Verification
  - [ ] a. Jalankan CI pada branch feature untuk memastikan preview deploy muncul
  - [ ] b. Setelah merge, verifikasi produksi live dan jalankan smoke tests

## Dev Notes

- Arsitektur: Frontend Next.js (lihat `docs/architecture.md`) — Vercel digunakan untuk hosting dan serverless API routes.
- Build command standar: `npm run build` (alias `next build`). Pastikan `package.json` scripts set: `build`, `lint`, `test`.
- Secret yang diperlukan: `VERCEL_TOKEN` (untuk `vercel` CLI, jika tidak menggunakan Git integration), dan environment variables untuk runtime (API_BASE_URL, NEXT_PUBLIC_*, dll).
- Jika menggunakan Vercel Git Integration, preview deploy sudah otomatis pada PR; untuk CLI deploy, workflow harus memanggil `vercel --prod` pada merge.
- Smoke tests singkat: curl -I https://<preview-or-production-url>/ | grep 200; curl -I https://.../api/gallery

### Project Structure Notes

- Files to add/modify:
  - `.github/workflows/deploy-vercel.yml` — CI and deploy
  - `vercel.json` (optional) — custom build settings
  - `docs/deployment.md` — dokumentasi langkah deploy dan rollback

### References

- Source: `docs/architecture.md`#Deployment & CI/CD Pipeline (lihat bagian 6 Deployment & CI/CD Pipeline)

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

BMAD create-story workflow

Approved-by: BMad — 2025-10-21

### Debug Log References

### Completion Notes List

### File List

- `.github/workflows/deploy-vercel.yml` (to be created)
- `docs/deployment.md` (update)
