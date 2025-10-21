Title: [API] POST /api/contact — Contact Submission

User Story
----------
Sebagai backend, saya ingin menyediakan endpoint untuk menangani submission contact form dengan validasi server-side.

Acceptance Criteria
-------------------
1. Endpoint POST /api/contact menerima name, email, message, consent.
2. Validasi server-side (required, email format); return 400 on invalid.
3. On success 200/201 and persist to simple store (file/log) or forward email (optional).
4. Tests: unit/integration for validation and success.

Technical notes & references
---------------------------
- Implementation: Next.js API Route or serverless function.
- Persistence: append to `data/contact-submissions.json` or write to log for MVP.
- Issue template: `.github/ISSUE_TEMPLATE/api_task.md`

Estimate: S
Priority: P2

Checklist
- [ ] Endpoint + validation
- [ ] Persistence or forwarding
- [ ] Tests
