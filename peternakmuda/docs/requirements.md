---
title: Requirements — Landingpage Peternak Muda
date: 2025-10-20
author: BMad
---

Dokumen ini menyusun requirement yang dapat langsung dipakai oleh analyst untuk membuat user stories / tickets. Konten berasal dari hasil brainstorming dan spesifikasi teknis di `docs/`.

Catatan singkat:
- Bahasa: Indonesia
- Output: user stories (FE/BE), acceptance criteria, tests yang diperlukan, prioritas & estimasi ukuran.

1. Epic: Landingpage — UI dasar

1.1 User Story FE-01 (Hero)
- Sebagai pengunjung, saya ingin melihat hero section yang menjelaskan value proposition sehingga saya paham manfaat Peternak Muda dalam 5 detik pertama.
- Acceptance Criteria:
  1. Hero menampilkan title (H1), subtitle, CTA (text + href) dan gambar hero.
  2. Komponen menggunakan Framer Motion untuk entrance animation.
  3. CTA meng-scroll ke section Contact atau membuka halaman daftar.
  4. Aksesibilitas: presence of H1, warna kontras, keyboard accessible CTA.
  5. Unit tests: render + CTA behavior + snapshot minimal.
- Estimasi: S (1-2 hari)
- Priority: P0

1.2 User Story FE-02 (About)
- Sebagai pengunjung, saya ingin membaca misi Peternak Muda supaya mengerti manfaat bergabung.
- Acceptance Criteria:
  1. Teks dengan bullet highlights dan ilustrasi.
  2. Mobile: collapsible "read more" behavior.
  3. Unit tests: render, collapse toggle.
- Estimasi: XS-S
- Priority: P1

1.3 User Story FE-03 (Gallery)
- Sebagai pengunjung, saya ingin melihat studi kasus peternak berupa grid gambar sehingga saya dapat mempelajari cerita mereka.
- Acceptance Criteria:
  1. Data diambil dari `GET /api/gallery`.
  2. Grid responsif (desktop 3-4 kolom, mobile 1 kolom).
  3. Gambar lazy-load dan alt text tersedia.
  4. Modal/lightbox preview menampilkan gambar lebih besar dan deskripsi, dengan transisi Framer Motion.
  5. Error states: loading indicator, empty state, dan error message "Gagal mengambil data gallery".
  6. Unit tests: mock fetch untuk happy path + error path (lihat `__tests__/Gallery.test.tsx`).
- Estimasi: M
- Priority: P0

1.4 User Story FE-04 (Contact)
- Sebagai pengguna, saya ingin mengirim pesan lewat formulir kontak untuk menghubungi tim.
- Acceptance Criteria:
  1. Form fields: name, email, message, consent checkbox.
  2. Client validation: required fields, email format.
  3. Server-side validation in API route.
  4. On success: show toast/success panel.
  5. Unit tests: validation scenarios + submission mock.
- Estimasi: S-M
- Priority: P1

1.5 User Story FE-05 (Footer & Sosial)
- Sebagai pengguna, saya ingin menemukan link ke social media dan berbagi konten sehingga bisa mempromosikan cerita peternak.
- Acceptance Criteria:
  1. Footer menampilkan Facebook, Instagram, YouTube, TikTok links (open in new tab + rel attributes).
  2. Setiap item gallery memiliki tombol share (WhatsApp, Facebook, X/Twitter, Telegram) membuka composer dengan title+url.
  3. OG tags dinamis untuk halaman gallery/item.
  4. Unit tests: link presence and attributes.
- Estimasi: S
- Priority: P1

2. Epic: Backend / API

2.1 User Story API-01 (GET /api/gallery)
- Sebagai frontend, saya butuh endpoint `GET /api/gallery` yang mengembalikan list items gallery agar komponen Gallery dapat menampilkan data.
- Acceptance Criteria:
  1. Response 200 JSON array sesuai schema (id, title, image, description, createdAt).
  2. Mendukung query params: `page`, `limit`, `q` (opsional).
  3. Error handling: response 500 atau 503 dengan body { error }.
  4. Integration tests: endpoint returns 200 dan schema; pagination & search.
  5. Data source: `data/gallery.json` untuk MVP.
- Estimasi: S
- Priority: P0

2.2 User Story API-02 (Contact submission)
- Sebagai backend, saya ingin menyediakan endpoint untuk menangani submission contact form dengan validasi server-side.
- Acceptance Criteria:
  1. Endpoint POST /api/contact menerima name, email, message, consent.
  2. Validasi server-side (required, email format); return 400 on invalid.
  3. On success 200/201 and persist to simple store (file/log) or forward email (optional).
  4. Tests: unit/integration for validation and success.
- Estimasi: S
- Priority: P2

3. Epic: Testing & QA

3.1 Story QA-01 (Unit tests coverage)
- Goal: Menyediakan unit tests untuk semua komponen utama dan API sehingga coverage minimal tercapai.
- Acceptance Criteria:
  1. Jest + React Testing Library tersedia.
  2. Scripts: `npm run test` dan `npm run test -- --coverage`.
  3. Initial threshold: 70% lines per module; target 85% stabil.
  4. CI pipeline menjalankan tests dan memblokir merge jika gagal.
- Estimasi: Ongoing
- Priority: P0

3.2 Story QA-02 (Lint & typecheck)
- Goal: Menjalankan linting & TypeScript strict checks on CI.
- Acceptance Criteria:
  1. ESLint config dan TypeScript strict enabled.
  2. CI steps include lint and `tsc --noEmit`.
- Priority: P0

4. Epic: Deployment & Workflow

4.1 Story DEP-01 (Vercel CI/CD)
- Sebagai tim devops, saya ingin agar setiap push ke `main` otomatis deploy ke Vercel sehingga release menjadi mudah.
- Acceptance Criteria:
  1. Vercel project terhubung dan preview deploy untuk PR aktif.
  2. Environment variables: NEXT_PUBLIC_API_URL, VERCEL_TOKEN terkonfigurasi.
  3. Post-deploy smoke check (basic health endpoint or page render) dibuat.
- Estimasi: XS
- Priority: P0

4.2 Story WF-01 (BMAD workflow checklist)
- Sebagai tim, saya ingin dokumentasi checklist BMAD untuk setup → build → QA → deploy agar setiap langkah terdokumentasi.
- Acceptance Criteria:
  1. `docs/workflows.md` ter-update (sudah dibuat).
  2. Analyst dan tim paham langkah manual; optional: implement GitHub Actions that mirror checklist.
- Priority: P2

5. Non-functional requirements (NFR)

- Performance: FCP < 1.5s pada koneksi 3G (optimisasi gambar, caching).
- Accessibility: WCAG AA untuk komponen utama.
- Security: Sanitasi input API, no secrets in repo.
- SEO: OG tags, meta description, JSON-LD for gallery items.

6. Edge cases & Error handling

1. Empty gallery → tampilkan placeholder dan call-to-action.
2. Gambar gagal → fallback image.
3. API timeout → tampilkan pesan retry.
4. Large dataset → lazy-load & pagination.

7. Mapping to Issue Templates (recommendasi untuk analyst)

- FE features → gunakan `.github/ISSUE_TEMPLATE/feature_landingpage.md`.
- API work → gunakan `api_task.md`.
- Infra/CI → gunakan `technical_task.md`.
- Tests → gunakan `test_task.md`.

8. Contoh Issue singkat (copy-paste untuk analyst)

Title: [FEAT] Gallery — Grid & Lightbox

Body: See `docs/components.md` and `docs/api-gallery.md`.

Acceptance Criteria:
- Grid responsive, data from `/api/gallery`, lazy-load images, modal preview, tests.

Labels: feature, frontend, P0

9. Next steps yang saya rekomendasikan

1. Analyst konversi setiap user story di atas menjadi Issue menggunakan template (priority & estimate tertera).
2. Developer membuat skeleton komponen: `Hero`, `Gallery` (dengan mock data), `Footer`.
3. Implementasikan `GET /api/gallery` minimal dengan `data/gallery.json` dan tests.
4. Setup CI untuk lint/typecheck/tests → hubungkan Vercel.

---

File ini dibuat sebagai artefak requirement awal. Jika Anda mau, saya bisa:
- Meng-generate Issues MD files untuk langsung di-copy ke GitHub, atau
- Membuat skeleton code dan test untuk satu user story (mis. Gallery MVP).
