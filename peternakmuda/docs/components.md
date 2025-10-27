---
title: Komponen UI — Landingpage Peternak Muda
date: 2025-10-20
createdBy: ux-expert
---

Dokumen ini menjabarkan spesifikasi setiap komponen yang wajib dibuat agar tim UI/FE dapat menulis requirement teknis.

Komponen utama

1) Hero
- Tujuan: Menyambut pengunjung dan mengkomunikasikan value proposition.
- Props: title (string), subtitle (string), ctaText (string), ctaHref (string), heroImage (string)
- Behavior: Animated entrance menggunakan Framer Motion; CTA memicu scroll ke section Contact atau ke halaman daftar.
- Accessibility: H1 harus ada, warna kontras sesuai Tailwind config.

2) About
- Tujuan: Menjelaskan misi dan benefit untuk peternak muda.
- Konten: teks panjang, highlight bullet, gambar ilustrasi.
- Behavior: Collapsible section untuk mobile (read more).

3) Gallery
- Tujuan: Menampilkan studi kasus peternak (gambar + title + description).
- Data: fetch ke `/api/gallery`.
- UI: grid responsif, lazy-load gambar, modal lightbox untuk preview (Framer Motion untuk transisi).
- Error states: loader, empty state, fetch error message.
- Testing: unit test memastikan render list berdasarkan mock fetch (lihat contoh `__tests__/Gallery.test.tsx`).

4) Contact
- Tujuan: Form singkat untuk menghubungi tim / pendaftaran newsletter.
- Fields: name, email, message, optional consent checkbox.
- Validation: client-side (zod atau custom validation) + server-side validation in API route.
- Success: show toast / success panel.

5) Footer
- Tujuan: Navigasi sekunder + social links.
- Elements: copyright, social media links (Facebook, Instagram, YouTube, TikTok), privacy link.
- Behavior: social links open in new tab, include rel="noopener noreferrer".

Styling & Reuse
- Setiap komponen harus menerima className prop untuk styling tambahan.
- Gunakan design tokens (Tailwind config) untuk warna dan spacing.

Animations
- Gunakan Framer Motion untuk micro-interactions (hover, entrance, modal transitions).
- Prefer reduced-motion media query respect.

Testing checklist per komponen
- Render happy path
- Accessibility checks (role, alt text)
- Error states
- Animation smoke test (snapshot optional)
