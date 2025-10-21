<!-- Copied/adapted from docs/api-gallery.md: GET /api/gallery story for analyst -->
Title: [API] GET /api/gallery — List Gallery Items

User Story
----------
Sebagai frontend, saya butuh endpoint `GET /api/gallery` yang mengembalikan list items gallery agar komponen Gallery dapat menampilkan data.

Acceptance Criteria
-------------------
1. Response 200 JSON array sesuai schema (id, title, image, description, createdAt).
2. Mendukung query params: `page`, `limit`, `q` (opsional).
3. Error handling: response 500 atau 503 dengan body { error }.
4. Integration tests: endpoint returns 200 dan schema; pagination & search.
5. Data source: `data/gallery.json` untuk MVP.

Schema contoh item:

{
  "id": number,
  "title": string,
  "image": string,
  "description": string,
  "createdAt": string (ISO8601)
}

Implementation notes
--------------------
- Implement using Next.js API Routes (`app/api/gallery/route.ts`) for MVP.
- Use a flat JSON file `data/gallery.json` as data source initially.
- Add caching and SWR on client for performance.
- Sanitize query params and handle errors explicitly.

Estimate: S
Priority: P0

Checklist
- [ ] Endpoint implemented
- [ ] Integration tests (supertest or equivalent)
- [ ] Docs updated (`docs/api-gallery.md`)
