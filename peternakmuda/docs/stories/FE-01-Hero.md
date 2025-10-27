<!-- Copied from docs/issues/FE-01-Hero.md -->
Title: [FEAT] Hero — Value Proposition & CTA
createdBy: pm

User Story
----------
Sebagai pengunjung, saya ingin melihat hero section yang menjelaskan value proposition sehingga saya paham manfaat Peternak Muda dalam 5 detik pertama.

Acceptance Criteria
-------------------
1. Hero menampilkan title (H1), subtitle, CTA (text + href) dan gambar hero.
2. Komponen menggunakan Framer Motion untuk entrance animation.
3. CTA meng-scroll ke section Contact atau membuka halaman daftar.
4. Aksesibilitas: presence of H1, warna kontras, keyboard accessible CTA.
5. Unit tests: render + CTA behavior + snapshot minimal.

Technical notes & references
---------------------------
- Teknologi: Next.js 15, TypeScript, TailwindCSS, Framer Motion
- File referensi: `docs/components.md`, `docs/technical-spec.md`
- Issue template: `.github/ISSUE_TEMPLATE/feature_landingpage.md`

Estimate: S (1-2 hari)
Priority: P0

Checklist (copy to issue body)
- [ ] Desain disetujui
- [ ] Implementasi komponen
- [ ] Unit tests ditulis & lulus
- [ ] PR review & merge
