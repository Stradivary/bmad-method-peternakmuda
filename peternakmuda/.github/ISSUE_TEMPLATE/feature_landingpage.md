---
name: "Feature Request — Landingpage / UI Component"
about: "Buat user story untuk fitur baru pada landingpage Peternak Muda (Hero, About, Gallery, Contact, Footer, atau layout)."
title: "[FEAT] {komponen} — {short description}"
labels: "feature, frontend, needs-spec"
assignees: ""
---

## Ringkasan singkat

Tuliskan deskripsi singkat fitur yang diminta (1-2 kalimat).

Contoh: "Buat komponen Gallery untuk menampilkan studi kasus peternak dengan grid responsif dan lightbox preview."

## Goals / Why

- Mengapa fitur ini penting?
- KPI atau target (mis. engagement, conversion, time on page)

## Acceptance Criteria (Definisi Selesai)

1. Komponen ter-render dengan data dari `/api/gallery`.
2. Gambar lazy-load dan memiliki atribut alt.
3. Modal preview menampilkan gambar dan deskripsi.
4. Unit tests (Jest) tersedia dan passing.
5. Lint & Typecheck passed.

## Technical Notes

- Technology: Next.js 15, TypeScript, TailwindCSS, Framer Motion.
- File/Folder target: `frontend/components/Gallery` dan `frontend/components/__tests__/Gallery.test.tsx`.
- API contract: lihat `docs/api-gallery.md`.

## Checklist
- [ ] Spesifikasi terverifikasi
- [ ] Desain (Figma/placeholder) tersedia
- [ ] Implementasi selesai
- [ ] Unit tests ditulis
- [ ] Review dan merge

## Estimasi effort
- Size: XS/S/M/L (isi sesuai prakiraan)

## Notes / Attachments
- Tambahkan link desain, screenshot, atau referensi lain.
