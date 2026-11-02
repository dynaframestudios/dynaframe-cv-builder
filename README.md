# Dynaframe CV Studio · Foundation v0.1

An offline-ready, free CV creator with a private multi-applicant workspace and a public session-only CV builder. Static HTML/CSS/JavaScript ES Modules; no build step or backend.

## Run locally

```bash
cd dynaframe-cv-studio
python -m http.server 8000
```

Open `http://localhost:8000`. Do **not** double-click `index.html`: ES modules and service workers need an HTTP origin.

## Deploy
Upload this folder's contents to a static host such as Cloudflare Pages or GitHub Pages. Files use relative paths and support subdirectory hosting. Use HTTPS for installability/offline service worker.

## Included
- Private workspace with separate applicant records (IndexedDB).
- Public builder with no account and no persistence.
- Live preview and six template treatments.
- Rule-based professional-profile draft and template recommendation.
- Print / Save as PDF using browser-native printing.
- JSON profile export.
- PWA manifest, service worker, responsive design.

## Important limitations
This is a working **foundation**, not a production-complete CV document engine. DOCX export, structured experiences, advanced pagination, backup import, consent/retention controls and security/compatibility QA are planned work. The summary draft must be reviewed for factual accuracy. Browser-local data can be lost if storage is cleared.

Read `docs/SPECIFICATION.md` for the product specification, acceptance criteria and v0.2 scope.
