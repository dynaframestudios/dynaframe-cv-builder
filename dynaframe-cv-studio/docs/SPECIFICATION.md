# Dynaframe CV Studio — Product and Technical Specification

## Vision
A free, installable, offline-capable CV web application with two entry paths backed by one shared CV creation engine:
1. **Personal Workspace** for Dynaframe operators to create and manage multiple applicants' CVs on one device.
2. **Public Builder** for anyone to create a CV without creating an account or paying.

## Core principles
- Applicant facts are never fabricated. Generated copy must be reviewed and edited by the user.
- All templates use the same structured CV profile model. Changing a template never changes stored content.
- The app does not require photographs, birthdays, national IDs, marital status or other irrelevant sensitive information.
- Public mode is ephemeral and does not autosave; personal mode uses browser IndexedDB.
- No backend, account, cookies for tracking, advertisements or remote API are required for the foundation.
- Actual CVs are free of mandatory Dynaframe branding/watermarks.

## Personas and workflows
**Operator**: Open personal workspace → create applicant → complete details → pick recommendation or template → inspect live A4 preview → save → print to PDF → return to a different applicant later.

**Public applicant**: Open Public Builder → start session → complete details → choose a template → inspect preview → print to PDF or export profile JSON → exit without creating an account.

## Foundation features implemented (v0.1)
- Responsive dashboard and public landing experience.
- Unified editor: name, email, phone, city, role, portfolio, purpose, summary, experience, education, skills, languages, references.
- Six named template treatments: Essential, Executive, Modern, Creative, Classic, ATS Focus.
- Rule-based template recommendation and editable, factual-input-based summary draft.
- Live escaped HTML preview laid out for A4; print CSS and browser 'Save as PDF'.
- IndexedDB personal applicant CRUD, with autosave after the name is provided.
- Public mode session-only editing; JSON profile export as portability/backup.
- Installable PWA foundation, precached shell, network-first service worker fallback.
- Keyboard focus indicators and labelled form fields.

## Acceptance criteria
- Creating and saving two separate applicants does not mix their data.
- Changing the chosen template changes presentation without altering entered values.
- Text containing '<script>' displays as text in the preview.
- Public mode doesn't save applicant information to IndexedDB.
- Existing personal profiles reappear after refreshing on the same browser/device.
- The app starts over HTTPS on Cloudflare Pages or GitHub Pages and remains usable after first successful service-worker cache.
- Printed output includes only CV content, with no editing panels, app header or dashboard.

## Foundation limitations and next iterations
- The foundation currently uses browser print to create PDF. It does not create downloadable DOCX files yet.
- Skill/profile drafting is a transparent **rules-based helper**, not generative AI.
- The editor uses multiline text for experience and education; future iterations should use structured repeatable records (title, company, location, dates, bullets) and per-section validation.
- Long CVs can continue onto additional print pages, but professional page-break/pagination controls and widow/orphan tuning need refinement.
- The 6 templates are distinct CSS styles but should undergo real print/design QA with diverse content lengths before production launch.
- Browser-local data is not synced, encrypted at rest by this app, or shared across devices. Add encrypted backup/import and a visible 'clear local data' workflow before widespread use.
- SVG is used as a PWA icon; PNG 192x192 and 512x512 should be supplied for broad installability on mobile browsers.
- No user accounts, cloud profiles, PDF import, DOCX export, cover letters or advanced job-description tailoring in v0.1.

## Proposed next milestone (v0.2)
1. Structured Experience, Education, Certification and Project editors with add/remove/reorder.
2. Purpose-driven section prioritization and richer template matching, without bias from sensitive attributes.
3. Dedicated document-pagination/rendering tests and 1–2-page tuning.
4. DOCX generation using a client-side library; verify layout across Word and LibreOffice.
5. Local applicant JSON import and export, user-controlled deletion, and consent/privacy copy.
6. Separate recruiter-friendly ATS template validation, including text extraction from exported PDFs.

## Suggested deployment
- Host this folder at the web root or a project subpath on **Cloudflare Pages** or **GitHub Pages**. All URLs are relative so subpath hosting is supported.
- HTTPS is required for full PWA features. Local development: `python -m http.server 8000` in the project root, then open `http://localhost:8000`.
- Use a separate subdomain such as `cv.dynaframestudios.co.za` after configuring DNS/deployments, or host on an ordinary Pages subpath.
- Treat browser profile data as personal data. Document purpose, retention, storage limitations, and deletion flows before inviting public users.

## Architecture
- `core/model.js`: canonical profile fields and deterministic content/template recommendation.
- `core/storage.js`: IndexedDB CRUD for personal workspace.
- `templates/render.js`: escaped data-to-CV HTML rendering.
- `exporters/print.js`: print and JSON profile export.
- `assets/js/app.js`: client application routes/view state/forms and validation.
- `assets/css/app.css`: shell, editor, document templates, responsive and print rules.
- `sw.js`: offline shell caching.

## Future data model direction
Applicant { id, contact, purpose, summary, experience[], education[], qualifications[], certificates[], projects[], skills[], languages[], references[], templateId, updatedAt, schemaVersion }

Maintain schema version and migration functions before replacing the v0.1 flat storage model.
