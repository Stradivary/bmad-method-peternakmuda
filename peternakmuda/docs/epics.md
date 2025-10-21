---
title: Epics & Stories — Peternak Muda (Gallery MVP)
date: 2025-10-21
---

# Epic: Gallery MVP

Epic description: As a visitor, I want to browse a gallery of farmers' photos so I can discover stories and examples.

## Stories

1. story-1.1 — Gallery Render
   - Title: Render gallery grid
   - ACs:
     - The gallery renders a grid of image cards fetched from `/api/gallery`.
     - Each card shows title and short description.

2. story-1.2 — Lightbox
   - Title: View image in Lightbox
   - ACs:
     - Clicking a gallery image opens a lightbox modal with the full image and details.
     - Modal closes on ESC and clicking outside.

3. story-1.3 — API Pagination & Search
   - Title: API supports pagination and search
   - ACs:
     - `GET /api/gallery` accepts `page`, `limit`, and `q` and returns correct filtered, paged results.

4. story-1.4 — Fallback Image
   - Title: Fallback image for missing assets
   - ACs:
     - When an image fails to load, the gallery shows `/gallery/fallback.jpg`.
