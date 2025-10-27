<!-- Copied from docs/issues/QA-01-Unit-Tests-Coverage.md -->
title: [TEST] Unit Tests & Coverage — Baseline
createdBy: pm

User Story
----------
Goal: Menyediakan unit tests untuk semua komponen utama dan API sehingga coverage minimal tercapai.

Acceptance Criteria
-------------------
1. Jest + React Testing Library tersedia.
2. Scripts: `npm run test` dan `npm run test -- --coverage`.
3. Initial threshold: 70% lines per module; target 85% stabil.
4. CI pipeline menjalankan tests dan memblokir merge jika gagal.

Technical notes & references
---------------------------
- Reference existing test: `frontend/components/__tests__/Gallery.test.tsx`.
- Issue template: `.github/ISSUE_TEMPLATE/test_task.md`

Estimate: Ongoing
Priority: P0

Checklist
- [ ] Test runner configured
- [ ] Baseline tests for Hero, Gallery, Contact, Footer
- [ ] Coverage reports in CI
