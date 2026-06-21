---
name: cross-link
description: "Build natural, footprint-safe contextual links BETWEEN the three owned Muslim sites (deenup.app, deenback.com, islamful.com) so they pass relevance + equity to each other. Symmetric, light volume (3-5/day), relevance-gated, with a committed ledger. Use when asked to cross-link the sites, run the daily cross-link routine, or add inter-site links."
---

# Cross-Link (owned-site network)

Insert a small daily batch of **contextual, in-body** links between the three owned
sites so they lift each other through relevance signals, deep-page equity, and faster
indexing. This is cross-DOMAIN linking, not internal linking — so every link is an
**absolute URL** and the whole thing is engineered to stay below a manipulation footprint.

**What this does NOT do (by design — these are the footprint risks):**
- No sitewide / nav / footer / sidebar / template links. **In-article body only.**
- No forced links. If a source article has no natural anchor for the target, **skip it**.
- No exact A↔B article reciprocity, no repeated exact-match money-keyword anchors.
- No volume spikes. ~3–5/day, capped per direction per week.

Honest expectation: a closed triangle gives each pair ONE referring domain, so the DR
bump is modest and one-time. The daily value is indexing speed, referral clicks, and
spreading equity to deep pages. Real DR growth still needs external backlinks.

## Locations

- Config: `~/.claude/skills/cross-link/config.json` (sites, base URLs, repos, caps)
- Scripts: `~/.claude/skills/cross-link/scripts/{build_index,plan_batch}.py`
- Ledger (state, committed): `<deenup repo>/seo/cross-link-ledger.json`
- Sites & repos: see config. English URL = `…/blog/<slug>`, Arabic = `…/ar/blog/<slug>`.

## Steps

Run these in order. Show a one-line result after each step.

### 1. Set the working directory and resolve repos

Pick `WORKDIR` (local: any scratch dir, e.g. `/tmp/crosslink-run`; cloud: the agent's cwd).
For each site in config, the scripts use `local_path` if it exists, else `WORKDIR/_repos/<key>`.

- **Local run:** the three `local_path`s already exist — nothing to clone.
- **Cloud run:** for each site, if `local_path` is missing, clone its `github` into
  `WORKDIR/_repos/<key>`:
  `git clone --depth 1 <github> WORKDIR/_repos/<key>`

Then for every repo you will touch: `git -C <repo> checkout main && git -C <repo> pull --ff-only`.
If a pull fails, stop and report — never force.

### 2. Build the index

`python3 ~/.claude/skills/cross-link/scripts/build_index.py WORKDIR`

Writes `WORKDIR/cross-link-index.json` (~1k articles). Confirm counts look sane and no
"MISSING REPOS" line. If a repo is missing, fix step 1 first.

### 3. Plan today's batch

`python3 ~/.claude/skills/cross-link/scripts/plan_batch.py WORKDIR`

Writes `WORKDIR/cross-link-plan.json` with 3–5 candidates. The planner has already
enforced: same-language, symmetric rotation, no duplicate/recip pairs, weekly per-direction
cap, target diversity, source body length. **Do not second-guess the dedup math** — your job
is only to judge anchor naturalness and insert. If fewer than 3 candidates came back, that's
fine; proceed with what there is.

### 4. Insert one natural link per candidate

For each candidate in `cross-link-plan.json`:

1. **Open** the source file: `<source_repo_path>/<source_file>`.
2. **Find a natural anchor** in the article BODY — an existing phrase whose meaning matches
   the target article's topic (use `target_title`, `target_summary`, `shared_tags` to judge).
   Same naturalness bar as the `internal-links` skill:
   - The sentence must read perfectly with the link; the anchor names the target's subject.
   - **Never** in frontmatter, headings, the hero `<Image>`, code blocks, or other JSX.
   - **Never** "click here" / "this article" / generic anchors. Vary phrasing; fit the
     **source site's voice** (`source_voice`).
   - Prefer a 2–5 word noun phrase already in the prose. Don't fabricate a sentence; if the
     topic isn't genuinely discussed in the body, **skip this candidate** (log it) — do not force.
3. **Insert** as an absolute-URL markdown link using Edit: `[anchor phrase](<target_url>)`.
   Use the EXACT `target_url` from the plan. One link per source article. Don't touch
   existing links.
4. **Record** the result for the ledger: `{date, source_site, source_slug, source_url,
   source_lang, target_site, target_url, anchor_text, score}`.

Good: `…before you can decide [whether dancing is permissible](https://www.deenback.com/blog/is-dancing-haram), it helps to…`
Bad (forced/vague): `…learn more [here](https://www.deenback.com/blog/is-dancing-haram)…`

### 5. Update the ledger

Read `cross-link-plan.json.ledger_file` (create the `seo/` dir and an empty `[]` file if
missing). Append one entry per **successfully inserted** link (skip the ones you skipped).
Write it back as pretty JSON.

### 6. Sanity-check the edits

For each changed repo, if `node_modules/.bin/contentlayer2` exists, run it and confirm no
NEW YAMLParseError / "Invalid markdown" for the files you touched (ignore pre-existing
unrelated errors). If contentlayer isn't installed (fresh cloud clone), instead re-open each
edited file and verify the link is well-formed and frontmatter is intact. Fix or revert any
file you broke.

### 7. Commit & push

Group inserted links by repo. For each repo with content changes:
`git -C <repo> add <changed .mdx files>` then commit:
`Add cross-site links (<N>): <src-slug> → <target-site>, …` ending with
`Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`, then `git -C <repo> push origin main`.
If a pre-commit hook fails for an ENVIRONMENTAL reason (e.g. `lint-staged` not installed,
missing deps in a fresh clone) rather than a problem with your edit, retry the commit with
`--no-verify` — your insertion is a single well-formed markdown link that needs no formatting.
Also commit the updated ledger in the deenup repo (`git -C <deenup> add seo/cross-link-ledger.json`),
in the same commit if deenup had content changes, else its own `chore: update cross-link ledger` commit.
Do **not** commit build artifacts (e.g. `app/tag-data.json`) — `git checkout --` them if the build touched them.
If any push fails, report the exact error and stop — never force-push.

### 8. Report

Print a table: each link as `source_site/slug —[anchor]→ target_site/slug`, the relevance
score, per-repo commit hashes + push status, and the new total link count per ordered pair
(from the ledger). Note any candidates skipped for "no natural anchor."

## Hard rules

1. Absolute URLs only for cross-site links — never root-relative `/blog/...` (that stays on-site).
2. In-body contextual links only. One new outbound network link per source article per run.
3. Relevance-gated and natural — skip rather than force. Quality over hitting the daily number.
4. Don't alter or remove existing links; don't edit frontmatter; preserve MDX/JSX.
5. The planner owns all dedup/caps/rotation. Don't hand-pick extra links beyond the plan.
6. Never fabricate target URLs — only use URLs emitted in the plan (they're built from real files).
