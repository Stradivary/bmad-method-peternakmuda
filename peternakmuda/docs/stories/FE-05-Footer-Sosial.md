<!-- Copied/adapted: Footer & Social Links story for analyst -->
Title: [FEAT] Footer & Social Links
createdBy: pm

User Story
----------
Sebagai pengguna, saya ingin menemukan link ke social media dan berbagi konten sehingga bisa mempromosikan cerita peternak.

Acceptance Criteria
-------------------
1. Footer menampilkan Facebook, Instagram, YouTube, TikTok links (open in new tab + rel attributes).
2. Setiap item gallery memiliki tombol share (WhatsApp, Facebook, X/Twitter, Telegram) membuka composer dengan title+url.
3. OG tags dinamis untuk halaman gallery/item.
4. Unit tests: link presence and attributes.

Technical notes & references
---------------------------
- Implement OG/meta tags via `next/head` per page.
- Share URLs should include proper encoding and use fallback image when OG image not present.
- Privacy: respect user consent for analytics/tracking.
- References: `docs/social-media.md`, `docs/components.md`.

Estimate: S
Priority: P1

Checklist
- [ ] Footer UI + links
- [ ] Share buttons + URL generation
- [ ] OG tags dynamic
- [ ] Tests
