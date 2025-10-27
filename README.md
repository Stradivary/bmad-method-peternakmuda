# Peternak Muda — Landing Page

Landing page untuk komunitas/produk Peternak Muda.

Teknologi utama: Next.js 15 (App Router) + TypeScript, TailwindCSS, Framer Motion. Unit tests menggunakan Jest + React Testing Library. Deployment diarahkan ke Vercel.

## Menjalankan lokal (frontend)

Pastikan Node >= 18 dan npm tersedia. Di Windows PowerShell:

```powershell
cd frontend
npm install
npm run dev
```

Server dev akan tersedia di http://localhost:3000

## Scripts penting (di folder `frontend`)

- `npm run dev` — jalankan development server
- `npm run build` — build produksi
- `npm run start` — jalankan hasil build (jika tersedia)
- `npm test` — jalankan unit tests (Jest)
- `npm run lint` — jalankan linter (jika terpasang)

## Testing

Jalankan unit tests di folder `frontend`:

```powershell
cd frontend
npm test
# atau untuk coverage
npm run test:coverage
```

Coverage disimpan di `frontend/coverage` jika konfigurasi test mengumpulkannya.

## Metodologi & Alur Kerja (BMAD v6-alpha)

Proyek ini dikembangkan menggunakan pendekatan BMAD Method v6-alpha sebagai kerangka kerja pengembangan (lihat folder `bmad/` untuk workflows dan agent configs). Berikut panduan singkat alur kerja yang harus diikuti oleh kontributor:

1. Brainstorming & Discovery
   - a. Kumpulkan kebutuhan produk dan konten (teks, gambar) — gunakan bahan di `docs/` dan jalankan workflow BMAD yang relevan bila perlu.
   - b. Simpan hasil diskusi dan keputusan ke dokumen di `docs/` dan perbarui `docs/bmm-workflow-status.md` sebagai checkpoint.

2. Spesifikasi Teknis
   - a. Buat atau perbarui `docs/technical-spec.md` yang menjelaskan kontrak API, shape data, non-functional requirements, dan acceptance criteria.

3. Implementasi
   - a. Buat branch fitur atau perbaikan: `feature/...` atau `fix/...`.
   - b. Implementasikan fitur di folder `frontend/` (komponen, route API), sertakan perubahan docs bila perlu.

4. Testing & Quality
   - a. Tambahkan/ubah unit tests (Jest) di `frontend` dan pastikan test lokal lulus.
   - b. Jalankan linter dan perbaiki isu.

5. CI dan Review
   - a. Push branch dan buat Pull Request.
   - b. CI (GitHub Actions) akan menjalankan lint, test, dan build. Pastikan status CI hijau sebelum merge.

6. Merge & Deploy
   - a. Setelah review dan CI lulus, merge ke `develop`/`main` sesuai alur repository.
   - b. Vercel akan meng-handle deployment otomatis jika terhubung; atau gunakan manual deploy jika diperlukan.

Catatan cepat: setiap milestone penting (spesifikasi selesai, tech-spec, release candidate) disimpan sebagai checkpoint di `docs/bmm-workflow-status.md` sesuai praktik BMAD, sehingga tim bisa men-trace progres implementasi.

## Kontribusi singkat

- Buka issue untuk bug/fitur
- Buat branch fitur/bugfix (`feature/...` atau `fix/...`) dari `develop` atau `main` lalu buat PR
- Pastikan semua test lulus sebelum merge

## Membuat Requirements, Architecture, dan Stories (Panduan Lengkap Singkat)

Berikut langkah praktis dan file referensi yang harus digunakan saat menyusun requirements, arsitektur, dan user stories untuk landing page ini.

1) Requirements (Business & Functional)
   - Gunakan `docs/requirements.md` (jika belum ada, buat) sebagai kerangka. Isi: tujuan bisnis, persona pengguna, acceptance criteria per fitur (mis. gallery, contact form), KPI & success metrics.
   - Untuk sesi ideasi/brainstorming awal gunakan agent dari CIS (Creative & Ideation Suite) seperti `brainstorming-coach`, `creative-problem-solver`, `storyteller`—file ada di `bmad/cis/agents/` dan workflows di `bmad/cis/workflows/`.
   - Setelah ideasi, untuk elisitasi requirement formal gunakan agen dalam BMM (Business & Modern Methods) seperti `analyst` untuk menyusun PRD dan requirement details. Files: `bmad/bmm/agents/analyst.md` dan workflows di `bmad/bmm/workflows/1-analysis/`.
   - Output yang diharapkan: `docs/requirements.md`, checklist acceptance criteria, dan update `docs/bmm-workflow-status.md`.

2) Architecture (High-level & Tech Spec)
   - Buat/Update `docs/technical-spec.md` untuk menjelaskan arsitektur, kontrak API, data shapes, dan non-functional requirements.
   - Gunakan agen BMM `architect` untuk menghasilkan arsitektur skematik dan keputusan teknologi (`bmad/bmm/agents/architect.md`). Jalankan workflow BMM `*create-architecture` jika diperlukan.
   - Sertakan diagram (SVG/PNG) di `docs/` atau `public/` dan jelaskan trade-offs (scalability, caching, cost).

3) Stories (Draft → Ready → Implement)
   - Gunakan agen BMM `sm` (Scrum Master) untuk membuat draf story secara otomatis (`*create-story`) berdasarkan PRD/tech-spec.
   - Story harus berisi: context, acceptance criteria (ACs), DoD (Definition of Done), test cases, dan estimasi.
   - Simpan story di `bmad/bmm/workflows/4-implementation/stories/` atau `docs/stories/` sebagai markdown. Setelah siap, gunakan `*story-ready` untuk menandai.

4) Testing Strategy (rinci & praktis)

- Peran `tea` (Test Architect): bertanggung jawab merancang strategi quality gates dan matriks pengujian yang mencakup unit, integration, dan E2E. Lihat `bmad/bmm/agents/tea.md` dan workflows di `bmad/bmm/workflows/testarch/` untuk detail proses.

- Lapisan pengujian frontend (recommended):
   1. Unit tests (Jest + React Testing Library)
       - Tujuan: verifikasi fungsi komponen, util, dan hooks terpisah.
       - Lokasi: `frontend/components/__tests__/` atau `frontend/__tests__/`.
       - Cara: `npm test` di folder `frontend` (lihat script di package.json).
   2. Integration tests
       - Tujuan: verifikasi integrasi antar komponen dan small stacks (mis. komponen + context + API mock).
       - Tools: Jest dengan msw (Mock Service Worker) atau test runner integrasi pilihan.
   3. End-to-end (E2E)
       - Tujuan: verifikasi alur pengguna lengkap (mis. buka landing → buka gallery → load images → submit contact form).
       - Tools: Playwright atau Cypress disarankan; simpan test di `frontend/e2e/`.

- Coverage & Quality Gates
   - Target minimal: tentukan threshold coverage (mis. 70%+ garis dasar) yang dipantau CI. `tea` menentukan threshold bersama PM/Architect.
   - Linting: jalankan `npm run lint` sebagai bagian dari quality gate.
   - Performance/Accessibility Sanity: `ux-expert` hadirkan checklist aksesibilitas dasar (contrast, semantic HTML) yang otomatis diperiksa pada review.

- Implementasi praktis dalam workflow developer:
   1. Saat story-ready, `dev` buat branch dan tulis unit tests pada saat implementasi fitur.
   2. Gunakan mock atau test double untuk integrasi eksternal saat masih di local.
   3. Jalankan suite lokal: `npm test` dan `npm run lint` sebelum push.
   4. CI akan menjalankan full suite (unit + integration + build + E2E optional). Jika quality gates gagal, PR balik ke dev untuk perbaikan.

5) Agents & Who Does What (Ringkasan terperinci + bagan)

Berikut bagan ringkas alur agent dan proses. Gunakan ini sebagai panduan umum alur kerja (ide → analisis → implementasi → test → deploy).

![Agent & workflow flowchart](peternakmuda/docs/agent-flow.svg)

If your viewer doesn't render images, here's a simple text flow you can read:

CIS (Ideation) → BMM (Analysis & Design) → DEV (Development & UX) → TEST (Testing) → CI/Deploy (Review & Vercel)

Jika viewer tidak merender Mermaid, anggaplah alur logis sebagai: CIS → BMM → Dev → Test → CI → Deploy.

Deskripsi agen (general, detil penting):

- CIS (Creative & Ideation Suite)
   - `brainstorming-coach`
      - Fungsi: fasilitator sesi ideasi terstruktur; menjamin fokus pada goal bisnis dan persona.
      - Output: mindmaps, ide-boards, draft user journeys, list hipotesis yang diuji.
      - Artefak terkait: notes di `docs/`, referensi bahan di `bmad/cis/agents/brainstorming-coach.md`.
   - `creative-problem-solver`
      - Fungsi: menyuplai teknik kreatif, alternatif solusi teknis/UX, serta opsi trade-off.
      - Output: opsi solusi tertulis, daftar eksperimen (A/B) dan skenario risiko.
   - `storyteller`
      - Fungsi: menyusun narasi produk dan menyusun user journeys yang komunikatif untuk stakeholder.
      - Output: draft stories dan early acceptance criteria yang akan diproses `analyst`/`sm`.

- BMM (Business & Modern Methods)
   - `analyst`
      - Fungsi: konversi ide/cerita menjadi requirement yang terukur; menyusun PRD/ACs.
      - Input: output CIS, wawancara stakeholder, data research.
      - Output: `docs/requirements.md`, PRD, checklist acceptance criteria.
   - `architect`
      - Fungsi: menyusun desain arsitektur tingkat tinggi, menentukan komponen teknis, alur data, dan aspek non-functional.
      - Output: `docs/technical-spec.md`, diagram arsitektur, keputusan caching/scale.
   - `pm` (Product Manager)
      - Fungsi: prioritasi roadmap, alignment stakeholder, dan definisi milestone release.
      - Output: roadmap, release plan, go/no-go criteria.
   - `sm` (Scrum Master / Story Maker)
      - Fungsi: memformat requirement jadi story-ready tasks dengan ACs, DoD, dan test pointers.
      - Output: story markdown di `docs/stories/` dan tickets siap dikembangkan.
   - `ux-expert`
      - Fungsi: detailkan UI/UX, memastikan accessibility dan usability dari titik-titik interaksi.
      - Output: wireframes, design tokens, accessibility checklist, prototype link.
   - `dev`
      - Fungsi: implementasi kode, menulis unit/integration tests, memperbaiki bug, dokumentasi perubahan.
      - Output: PR yang berisi code, tests, dan instruksi testing.
   - `tea` (Test Architect)
      - Fungsi: merancang test strategy (unit/integration/E2E), threshold coverage, dan job CI untuk quality gates.
      - Output: test plan, CI job definitions, quality rules.

Interaksi praktis dan handoff:

- CIS menghasilkan ide → `analyst` formalizes → `architect` + `ux-expert` desain solusi → `sm` membuat story-ready tasks → `dev` implement → `tea` pantau quality gates → CI/PR workflow → deploy.

Praktik dokumentasi dan artefak yang direkomendasikan:

- Taruh semua artefak (requirements, tech-spec, diagram, prototype) di `docs/` dan referensikan di `docs/bmm-workflow-status.md`.
- Template PR harus mencakup: ringkasan perubahan, langkah pengujian lokal (how-to-test), daftar tests yang ditambahkan/diupdate, dan checklist quality gate.
- `tea` harus menyertakan contoh CI job snippet (yml) di `bmad/bmm/workflows/testarch/` yang menjelaskan urutan test/run yang diperlukan.

6) Checkpoints & Artifacts
   - Pastikan setiap artefak (requirements, tech-spec, stories, tests) di-commit dan di-link-kan di `docs/bmm-workflow-status.md`.
   - Gunakan workflow `*workflow-status` (analyst/pm) untuk memeriksa readiness sebelum implementasi lanjut.

## Contoh alur singkat: buat fitur Gallery

1. Analyst: jalankan `*brainstorm-project` → buat `docs/requirements.md` (gallery ACs)
2. PM/Architect: buat `docs/technical-spec.md` (API contract / data shape)
3. SM: jalankan `*create-story` → simpan draft story di `docs/stories/gallery.md`
4. Dev: buat branch `feature/gallery`, implementasi, tambahkan unit tests
5. Test Architect: jalankan `*atdd`/`*ci` workflows untuk men-generate test plan dan quality gates
6. Dev/Architect → CI runs (lint, test, build) → ketika hijau, merge → Deploy via Vercel

## Struktur proyek (ringkasan)

- frontend/ — Next.js app (App Router)
- docs/ — requirements, architecture, deployment guide, stories
- bmad/ — BMAD workflows & agents configs

## Kontak

Tim: Peternak Muda — maintainers