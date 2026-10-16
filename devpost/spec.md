---
status: approved
approval_basis: User explicitly requested this goal and delegated completion; no separate document-review exchange claimed.
---

# Technical plan

## How This Works, In Plain Language
The desk stores what the user typed in their browser. The audit compares those records with simple checks. A manual link review remembers the URL that was inspected; if the URL changes, the note stays visible but no longer covers the current link.

## Stack
Keep dependency-free JavaScript/HTML/CSS and Node.js 20+ for a loopback static server. No package installation needed. Browser localStorage is unencrypted and subject to quota. Node docs: https://nodejs.org/docs/latest-v20.x/api/ . Browser storage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage .

## Where It Runs and How Someone Tries It
`npm start` then http://127.0.0.1:4173 . Use PORT=4177 if the first project's server occupies that port. `npm test` runs domain and HTTP checks. Record actual local app footage under three minutes; no deployment required. Public repo/video only after approval.

## Components
### Domain and access checks
`domain.js`: deadlineISO, validate, packetAudit, markdown and new reviewArtifact/artifactReviewStatus functions. Implements prd.md > Packet audit and Artifact access review.
### Browser UI and storage
`app.js`: explicit save forms and atomic commit, artifact review cards under Packet audit, exact-URL review notes. Implements prd.md > Core Journey and Evidence and handoff.
### Static serving
`server.mjs`: allowlisted source paths, loopback only. No API or file-system access endpoint. Implements prd.md > Entry workspace.

## Data Model
Keep export version 1; add optional artifactReviews object with repo/video records: {url, note, checkedAt}. Validate known keys, URLs, note and ISO timestamp. Legacy backups without the property remain valid. Staleness is derived by exact string equality against the current URL, not by deleting history. Persistence occurs only after full validation succeeds.

## File Structure
- app.js — forms/rendering/local save and downloads
- domain.js — validation, audit and export
- server.mjs, index.html, style.css — local shell
- tests/ — domain and static serving checks
- scripts/ — optional local browser verification and recording helpers
- devpost/ — planning/checklist/reference map, private profile ignored
- contest/ — rules, prototype baseline and provenance
- docs/ — verification, limitations, submission preparation
- demo/ — actual captioned screen recording

## External Services and Dependencies
App: none. Links open only after a user click. Optional QA uses existing local Playwright/Chrome/FFmpeg tooling outside runtime dependencies, without paid API calls.

## Important Failure Modes
Quota/invalid import → error without replacing state. Stale review → human-review finding, old note retained. Missing/placeholder URL → cannot record access check. Multiple tabs → documented last-save-wins limitation; no synchronization claim.

## What Was Simplified and Why
Manual access inspection instead of server-side crawling; avoids account/cross-origin access and treats HTTP reachability as insufficient proof. JSON backup instead of cloud storage. Local audit instead of automatic legal interpretation.

## Decisions and Open Issues
No new learner uncertainty claimed. The concrete engineering uncertainty is whether edited artifact URLs can retain apparently valid reviews: test exact-URL invalidation and backup roundtrip. Early prototype and planning chronology are disclosed. Contest eligibility is an organizer decision.
