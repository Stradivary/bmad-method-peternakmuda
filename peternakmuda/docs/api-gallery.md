---
title: API Gallery — Spesifikasi
date: 2025-10-20
createdBy: dev
---

## Endpoint

GET /api/gallery

- Deskripsi: Mengembalikan daftar item gallery (studi kasus peternak).
- Response: 200 OK, Content-Type: application/json

Contoh response body:

[
  {
    "id": 1,
    "title": "Peternak Ayam",
    "image": "/images/ayam.jpg",
    "description": "Peternak ayam sukses di desa",
    "createdAt": "2025-10-01T08:00:00Z"
  }
]

Errors:
- 500 Internal Server Error → body: { error: string }
- 503 Service Unavailable → ketika sumber data eksternal down

Query params (opsional):
- ?page=number — pagination (default 1)
- ?limit=number — per-page limit (default 12)
- ?q=string — search pada title/description

Implementation notes:
- Implementasi bisa menggunakan Next.js API Routes (serverless) atau menggunakan backend terpisah.
- Caching: gunakan SWR pada client untuk caching & revalidation.
- Security: sanitize query params, throttle requests jika perlu.

Data storage:
- Simple approach: flat JSON file under `data/gallery.json` for MVP.
- Production: gunakan database ringan (SQLite/Postgres) atau headless CMS (Sanity/Strapi) jika perlu.

Integration tests:
- Test endpoint returns 200 and follows schema.
- Test pagination and search.
