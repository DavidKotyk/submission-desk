# Current verification — October 15, 2026

## Current increment
- 14 domain/server tests pass on bundled Node.js 24.19.0, including exact-URL review invalidation, legacy backups, malformed review records and manual receipt independence.
- 15 browser checks pass on installed Chrome at 1440 px desktop and 390 × 844 mobile. No page errors or external requests observed. Machine-readable evidence: docs/browser-check.json.
- Browser workflow includes a checked checklist with placeholder blockers, rejected placeholder review, current→stale review after URL edit and refresh, literal HTML evidence, byte-identical attachment download, empty receipt rejection, separate manual receipt, JSON/Markdown downloads, multi-entry switching, backup restore and atomic invalid-import rejection.
- Screenshots: docs/desktop-current.png and docs/mobile-current.png. Earlier screenshots and notes below document the initial prototype, not the final increment.
- Optional QA command: `PLAYWRIGHT_MODULE=/path/to/playwright node scripts/browser-check.mjs` with the app running at http://127.0.0.1:4177; APP_URL can override.

These checks establish behavior on controlled, assistant-authored fixtures. They do not establish real-user time savings, independent semantic accuracy, organizer acceptance, legal eligibility, novelty or a prize probability. See docs/LIMITATIONS.md.

## Recorded demo

Actual 90.68-second captioned local-app video, 1440×960, full playback verified at 4× with no decode error. See docs/video-check.json. Screen captures at 25/48/72 seconds show the audit, stale-review finding and separate synthetic receipt.

## Prior prototype verification (historical)

# Verification — 2026-10-15

## Automated

`node --test tests/*.test.mjs`: **7 tests pass** on Node 20.19.0. Covers synthetic financial-goal data, independent projects, winter/summer/non-hour time-zone offsets, ambiguous and nonexistent local times, invalid dates/zones, readiness separate from manual submission, JSON roundtrip with attachment and receipt, invalid import types/URLs/IDs/references, and the static server's status codes, MIME types and path allowlist. `node --check app.js` passes. HTTP `/` returned 200.

## Browser workflow

Tested in the Codex in-app browser at `http://127.0.0.1:4173`, desktop 1280 px and mobile 390 × 844.

1. Loaded Gapwise and Raincheck, with Gapwise now focused on a synthetic $1,000 emergency-fund goal. Its deadline rendered as Nov 20, 2026, 5:00 PM in America/New_York.
2. Saved the video URL; unfinished items dropped from two to one. Checked and saved the remaining requirement; preparation became Ready to submit / 100% requirements while actual submission stayed Not recorded.
3. Added a note and `demo-evidence.txt`, associated with the video requirement. Refreshed and verified both evidence entries remained. Downloaded the restored file; `cmp` confirmed its bytes exactly match the source fixture. Testing caught a data-URL download issue, repaired by using a Blob download, then verified the fix.
4. Edited and saved submission copy. Attempted an empty receipt; the UI rejected it and left the submission unrecorded. Saved a synthetic confirmation URL and receipt; the UI changed to Recorded manually and displayed the receipt with a UTC timestamp.
5. Exported JSON and Markdown through real download buttons, inspected their downloaded contents, and retained them as `completed-demo.json` and `Gapwise-handoff.md`.
6. Created and renamed a third entry. Imported the downloaded JSON through the file chooser and replacement confirmation. Verified the original two entries, recorded receipt and attachment were restored. Refreshed and inspected restored evidence; downloaded its file successfully.
7. Switched to Raincheck and observed its independent deadline, missing links, missing draft and empty requirements. Switched back to Gapwise and observed its saved links and ready/recorded statuses.
8. Inspected full-page desktop and mobile screenshots. Mobile stacks cards/forms, scrolls the project list and section tabs, and has no document overflow: clientWidth and scrollWidth both 390. Reset the viewport afterward.
9. Final browser warning/error log was empty. No external source links were followed. No entry was transmitted, published or connected to an account.

## Scope and limitations

Browser workflow verification is manual via supported UI automation, not a committed automated browser suite. The committed tests are domain and HTTP regression tests. Browser compatibility beyond the tested engine, quota exhaustion, private browsing behavior, concurrent-tab writes, and all screen-reader combinations were not exercised. The README documents localStorage limits, 1 MiB attachment cap, no synchronization, manual receipt semantics, no real submission or financial advice, no project delete UI, and evidence replacement rather than inline editing.

## Requirement audit

| Requested outcome | Evidence |
| --- | --- |
| Separate project, polished local app | `submission-desk/`, loopback server, desktop/mobile screenshots |
| Multiple projects | Two seeded entries, third-entry creation and independent project switching in browser |
| Explicit deadline zones | Editable local date and IANA zone; zone/date edge-case tests; rendered deadline and UTC handoff |
| Editable requirements + sources | Requirement forms, add/remove controls, saved checkbox browser workflow, source links and validation |
| Evidence files or notes | Saved note + file associated with requirement; byte-identical download after JSON restore |
| Repository/video + submission copy | Saved through browser, persisted, present in downloaded handoff |
| Clear unfinished work | Overview work list and readiness regression test; independent Raincheck work list |
| JSON import/export | Actual exported backup restored through file chooser and confirmation; schema tests |
| Markdown handoff | Actual downloaded `Gapwise-handoff.md` includes notes, checklist, URLs and receipt |
| Preparation separate from actual submission | Ready + Not recorded observed; manual receipt saved separately; automated invariant test |
| Local persistence + synthetic data | Refresh retained edits/receipt/file; seeded demo and completed backup clearly synthetic |
| Financial goal | Gapwise summary, submission draft and evidence describe a $1,000 emergency fund, $250 starting balance and $50 weekly savings |
| Working workflow, tests, browser QA | Steps above; 7 passing tests; screenshots and no final console errors |
| README + short demo | `README.md`, `docs/DEMO.md`, screenshots and completed sample exports |
| No paid APIs/integrations/publication | No dependencies, API requests, account flows or deployment; static local app |

## Financial-goal correction

Updated the seed entry, completed backup, attachment fixture, handoff, walkthrough and screenshots to focus on a $1,000 emergency-fund goal ($250 saved + $50 per week for 15 weeks). Removed the cash-prize framing. Re-ran all seven tests successfully, imported the corrected backup in the browser, and verified the overview, saved submission draft and recorded receipt. Regenerated desktop/mobile screenshots and the matching Markdown handoff.

## Cash-prize preparation: packet audit

Ten tests now pass, including placeholder-host boundary checks, clean-checklist/unclean-packet cases, evidence association and demo receipt warnings. Browser verified Packet audit on the completed synthetic entry: five blockers and three human-review findings. The first Review button returned to Overview. The top preparation label now says “Checklist complete” rather than claiming the entry is ready to submit. The final browser warning/error log was empty. `packet-audit.jpg` and `overview.jpg` reflect this update; earlier screenshots document the preceding prototype. Real competition preparation remains active in `contest/GOAL.md` and is not a verified contest entry.
