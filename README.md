# Submission Desk

A local workspace for preparing hackathon entries, auditing missing evidence, and recording what was actually submitted. A completed checklist, a reviewed artifact URL and an organizer receipt remain separate facts.

The bundled Gapwise and Raincheck entries are synthetic submission packets. Submission Desk does not implement the fictional apps described inside those examples, verify their claims or send entries to an organizer.

## Run

Requires Node.js 20 or later. No dependencies or install step.

```sh
cd submission-desk
npm start
# or: node server.mjs
```

Open http://127.0.0.1:4173. The server binds only to loopback. Set `PORT=4174` for another port; browser storage is separate per origin/port.

```sh
npm test
# or: node --test tests/*.test.mjs
```

## Use

Choose an entry in the sidebar or select **New entry**. Edit its name, event, description, deadline, IANA time zone, repository and video links, then **Save entry**. All forms save explicitly. Navigation warns about unsaved input.

Add and edit requirements, their source links and completion state in **Requirements**. Use **Evidence** to add notes and optional files, linked to a requirement or kept as general evidence. A file can be downloaded or the evidence removed. Submission copy has its own save button and copy control.

**Packet audit** flags missing materials, placeholder/local artifact links, missing official rule sources and requirements without linked evidence. Repository/video access checks record a manual note tied to the exact inspected URL and time. Changing that URL makes the earlier review stale. Old backups without reviews remain compatible. A current review is self-reported and does not authenticate the link or the person. It does not fetch URLs, authenticate evidence or certify eligibility. Audit findings are included in Markdown handoffs. A complete preparation checklist can still have audit findings.

The overview lists unfinished requirements and missing repository, video and submission copy. The preparation checklist is complete only when these are present and every requirement is checked. This does not mean the packet is ready for real submission. Percentage measures checked requirements, not overall readiness or organizer acceptance. A project without requirements is never ready.

Submit through the organizer's real website yourself. In **Submit & record**, save a confirmation URL, a receipt, or both. This manual record is independent of preparation; it can be recorded with unfinished work. A recorded receipt does not verify acceptance by an organizer. Clear or update a mistaken receipt in the same section.

**Export JSON** backs up the entire desk, including file contents. **Import JSON** validates the whole file before asking to replace the desk; cancel leaves it unchanged. Export a backup before replacing. **Handoff .md** exports the selected entry, explicit deadline and UTC instant, requirements, unfinished work, links, copy, evidence notes and recorded receipt. Markdown lists attachment names; JSON carries their bytes.

See [the recorded demo](demo/preview.html) and [walkthrough](docs/DEMO.md) and [verification notes](docs/VERIFICATION.md).

## Storage and limits

- Data lives in this browser's localStorage under `submission-desk.v1`. There are no APIs, accounts, analytics, remote fonts, integrations or publication. The app does not fetch source URLs; opening one navigates to that website.
- Storage is unencrypted, browser/profile/origin-specific and subject to browser quota or clearing. Export backups. Multiple tabs are not synchronized; the most recent save can overwrite an earlier tab's state. No undo, cloud backup or collaboration.
- Attachments: up to 1 MiB each, stored as base64; the browser's total quota is typically only a few MB. JSON imports are capped at 6 MiB, 100 entries, and 200 requirements/evidence records per entry. Quota and validation failures do not replace the current state. Browser downloads should only be opened if trusted.
- Deadlines use the browser's IANA time-zone database. Daylight-saving gaps and repeated local times are rejected. Enter the equivalent UTC date/time with zone `UTC` to resolve ambiguity. No reminders or background notification service.
- Notes, requirements and drafts are editable plain text. Evidence can be removed and re-added; no inline evidence edit. There is no project deletion UI.
- No rule checking, link health checking, actual submission, financial advice or payment workflow. Real event rules need manual verification.

## Files

`domain.js`: validation, time conversion, readiness and handoff generation. `app.js`: UI and atomic local persistence. `style.css`: responsive interface. `server.mjs`: allowlisted static loopback server. `tests/domain.test.mjs`: regression tests.

## Contest preparation

Target: Build With AI: Basics, deadline October 26, 2026 at 5 p.m. Eastern; first prize $1,250. No prize is promised. The earlier prototype predates required Skill Pack use; planning and subsequent implementation chronology are disclosed in [WORKFLOW.md](docs/WORKFLOW.md). Required plans are under `devpost/`. The organizer determines eligibility.

Public source: https://github.com/DavidKotyk/submission-desk . Public demo: https://youtu.be/SkeOZFql0xc . Devpost entry preparation is in progress; current verified external status is recorded in docs/publication-status.json. What Changed? is a separate submitted entry and is not reused as this product.

## Verification tooling

`node scripts/browser-check.mjs` and `node scripts/record-demo.mjs` use an existing Playwright package and installed Chrome. Set `PLAYWRIGHT_MODULE` to its absolute package directory. QA tooling is optional; app/tests have no package dependencies. Documentation of validation and limits: [VERIFICATION.md](docs/VERIFICATION.md).
