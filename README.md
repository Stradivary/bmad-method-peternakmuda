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
npm test / test:coverage
```

Coverage disimpan di `frontend/coverage` jika konfigurasi test mengumpulkannya.

## Metodologi & Alur Kerja (BMAD v6-alpha)

Proyek ini dikembangkan menggunakan pendekatan BMAD Method v6-alpha sebagai kerangka kerja pengembangan (lihat folder `bmad/` untuk workflows dan agent configs). Berikut panduan singkat alur kerja yang harus diikuti oleh kontributor:

1. Brainstorming & Discovery
	a. Kumpulkan kebutuhan produk dan konten (teks, gambar) — gunakan bahan di `docs/` dan jalankan workflow BMAD yang relevan bila perlu.
	b. Simpan hasil diskusi dan keputusan ke dokumen di `docs/` dan perbarui `docs/bmm-workflow-status.md` sebagai checkpoint.

2. Spesifikasi Teknis
	a. Buat atau perbarui `docs/technical-spec.md` yang menjelaskan kontrak API, shape data, non-functional requirements, dan acceptance criteria.

3. Implementasi
	a. Buat branch fitur atau perbaikan: `feature/...` atau `fix/...`.
	b. Implementasikan fitur di folder `frontend/` (komponen, route API), sertakan perubahan docs bila perlu.

4. Testing & Quality
	a. Tambahkan/ubah unit tests (Jest) di `frontend` dan pastikan test lokal lulus.
	b. Jalankan linter dan perbaiki isu.

5. CI dan Review
	a. Push branch dan buat Pull Request.
	b. CI (GitHub Actions) akan menjalankan lint, test, dan build. Pastikan status CI hijau sebelum merge.

6. Merge & Deploy
	a. Setelah review dan CI lulus, merge ke `develop`/`main` sesuai alur repository.
	b. Vercel akan meng-handle deployment otomatis jika terhubung; atau gunakan manual deploy jika diperlukan.

Catatan cepat: setiap milestone penting (spesifikasi selesai, tech-spec, release candidate) disimpan sebagai checkpoint di `docs/bmm-workflow-status.md` sesuai praktik BMAD, sehingga tim bisa men-trace progres implementasi.


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

4) Testing Strategy
	- Koordinasikan dengan agen BMM `tea` (Test Architect) untuk memetakan coverage: unit, integration, ATDD/E2E. (`bmad/bmm/agents/tea.md` dan `bmad/bmm/workflows/testarch/`).
	- Implementasikan unit tests (Jest) untuk komponen UI dan route API. Simpan test file di `frontend/components/__tests__/`.

5) Agents & Who Does What (Ringkasan)
	 - CIS (Creative & Ideation Suite) agents — untuk brainstorming/ideation:
		 - `brainstorming-coach` — fasilitator brainstorming (file: `bmad/cis/agents/brainstorming-coach.md`)
		 - `creative-problem-solver` — teknik kreatif & ide alternatif (`bmad/cis/agents/creative-problem-solver.md`)
		 - `storyteller` — membentuk narasi dan user journeys (`bmad/cis/agents/storyteller.md`)
	 - BMM agents — untuk analisis → implementasi → deploy:
		 - `analyst` (Mary) — requirements, research, PRD. File: `bmad/bmm/agents/analyst.md`.
		 - `architect` (Winston) — high-level architecture, tech decisions. File: `bmad/bmm/agents/architect.md`.
		 - `pm` (John) — product strategy, prioritization, workflows (`bmad/bmm/agents/pm.md`).
		 - `dev` (Amelia) — implementasi cerita, tests, code changes (`bmad/bmm/agents/dev.md`).
		 - `ux-expert` (Sally) — UX/UI specifications, accessibility guidance (`bmad/bmm/agents/ux-expert.md`).
		 - `sm` (Bob) — story drafting and sprint readiness (`bmad/bmm/agents/sm.md`).
		 - `tea` (Murat) — test architecture and CI quality gates (`bmad/bmm/agents/tea.md`).

6) Checkpoints & Artifacts
	- Pastikan setiap artefak (requirements, tech-spec, stories, tests) di-commit dan di-link-kan di `docs/bmm-workflow-status.md`.
	- Gunakan workflow `*workflow-status` (analyst/pm) untuk memeriksa readiness sebelum implementasi lanjut.

## Contoh alur singkat: buat fitur Gallery
1. Analyst: jalankan `*brainstorm-project` → buat `docs/requirements.md` (gallery ACs)
2. PM/Architect: buat `docs/technical-spec.md` (API contract / data shape)
3. SM: jalankan `*create-story` → simpan draft story di `docs/stories/gallery.md`
4. Dev: buat branch `feature/gallery`, implementasi, tambahkan unit tests
5. Test Architect: jalankan `*atdd`/`*ci` workflows untuk men-generate test plan dan quality gates
6. Push PR → CI runs (lint, test, build) → ketika hijau, merge → Deploy via Vercel

Jika mau, saya bisa menambahkan templat markdown untuk `docs/requirements.md`, `docs/stories/template.md`, dan `docs/architecture-template.md` agar kontributor langsung dapat mengisi. Mau saya buatkan? 


## Kontak

Tim: Peternak Muda — maintainers