---
status: approved
approval_basis: User explicitly requested this goal and delegated completion; no separate document-review exchange claimed.
---

# Product requirements

## What We're Building
A local submission-preparation workspace for independent hackathon builders, with a packet audit that separates filled fields from reviewable evidence. Develops scope.md > The Unique Kernel.

## Core Journey
Open a synthetic entry → complete its checklist → inspect Packet audit → replace placeholder links → record a manual artifact access check → change the link and observe stale review → export → separately record a clearly synthetic receipt. Develops scope.md > The Core Loop.

## Features and Behavior
### Entry workspace
Existing multiple-entry editing, IANA deadline conversion, independent requirements, source links and draft text remain. Empty/invalid dates and daylight-saving ambiguity are rejected.
### Packet audit
Missing links/copy/requirements, placeholder addresses and unchecked requirements are blockers. Unlinked evidence and unchecked or stale access reviews are human-review findings. A clean audit never certifies organizer acceptance or eligibility.
### Artifact access review
For repository and video, open the saved link and manually record a note confirming what was inspected. The review records the exact URL and timestamp. It counts as current only if the URL still matches; changing a link makes the old review stale. Placeholder or missing links cannot be marked checked. No URL is fetched by the app. Import/export preserves review provenance; records remain self-reported.
### Evidence and handoff
Store requirement-linked notes and optional 1 MiB files, export JSON with attachment bytes, export Markdown with requirements, notes, current/stale artifact reviews and receipt. Reject malformed backups atomically.
### Submission receipt
Manual receipt independent of preparation; save/update/clear at user request. Never transmit an entry or imply organizer confirmation from a local record.

## Look and Feel
Retain the pale background, dark green sidebar, generous cards and plain labels. Reviewer status must be expressed in text, not color alone. Mobile layout must have no document overflow.

## Acceptance Criteria
- A fully checked synthetic checklist with example.com links still has audit blockers.
- A valid artifact URL starts unreviewed. A nonempty note saves its exact URL/time; changing the URL marks the prior review stale, including after JSON restore.
- Placeholder links cannot obtain a current review.
- Exported Markdown includes access-review notes and distinguishes current, stale and unreviewed.
- Preparation and actual submission remain independent throughout the browser workflow.
- Text inputs render literally; rejected imports do not overwrite state.

## Product Decisions
User chose this project and cash-prize direction and delegated implementation. The manual access-check increment is an agent implementation choice serving the existing evidence-tracking requirement. No fabricated user interview or paid-service approval.

## Open Questions
Real-user usefulness and willingness to pay unvalidated. Judges decide eligibility of the disclosed development chronology. Personal learning responses require the user.
