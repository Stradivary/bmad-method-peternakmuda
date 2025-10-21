<!-- Story: Gallery (copied from requirements) -->
Title: [FEAT] Gallery — Grid & Lightbox

User Story
----------
Sebagai pengunjung, saya ingin melihat studi kasus peternak berupa grid gambar sehingga saya dapat mempelajari cerita mereka.

Acceptance Criteria
-------------------
1. Data diambil dari `GET /api/gallery`.
2. Grid responsif (desktop 3-4 kolom, mobile 1 kolom).
3. Gambar lazy-load dan alt text tersedia.
4. Modal/lightbox preview menampilkan gambar lebih besar dan deskripsi, dengan transisi Framer Motion.
5. Error states: loading indicator, empty state, dan error message "Gagal mengambil data gallery".
6. Unit tests: mock fetch untuk happy path + error path.

References: `docs/components.md`, `docs/api-gallery.md`
