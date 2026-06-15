---
name: deenup-blog-writer
description: 'Generate SEO-optimized Islamic blog posts for deenup.app. Generates a per-slug linear-gradient hero image locally (no Gemini), no Google indexing. Internal links from deenup.app sitemap; external links from deenback.com and demimanifest.com sitemaps.'
---

# DeenUp Blog Writer (remote)

End-to-end pipeline for publishing SEO-optimized Islamic blog posts on deenup.app. This variant uses repo-relative paths, generates each post's hero image locally as a linear gradient (no external API), skips Google indexing, and sources links from three live sitemaps.

## Input

`$ARGUMENTS` is optional:

- Empty → auto-pick next unwritten keyword, 1 article
- A number N (e.g. `2`) → batch mode, N articles
- A specific keyword → that keyword, 1 article

## Repo-relative paths

- Blog posts: `data/blog/en/[SLUG].mdx`
- Hero image (generated per slug): `public/images/blog/[SLUG]/hero.webp`, referenced as `/images/blog/[SLUG]/hero.webp`
- Hero generator: `.claude/skills/deenup-blog-writer/generate-hero-image.js`
- Keyword source: `.claude/skills/deenup-blog-writer/keywords.csv`
- Written tracker: `.claude/skills/deenup-blog-writer/written.csv`
- Writing guidelines: `.claude/skills/deenup-blog-writer/references/writing-guidelines.md`
- DeenUp context: `.claude/skills/deenup-blog-writer/references/deenup-context.md`
- Site URL: `https://www.deenup.app`
- Author: `mathias-yussif`
- Layout: `PostLayout`

## Sitemap link sources

Fetch ONCE at the start of the run and cache in memory for the whole batch:

- **Internal (deenup.app):** `https://www.deenup.app/sitemap.xml` — parse `<loc>` entries, keep only `/blog/` URLs that differ from the current post. Use ≥3 per article.
- **External 1 (deenback.com):** `https://deenback.com/sitemap.xml` — keep `/blog/` URLs. Use ≥1 per article where topically relevant.
- **External 2 (demimanifest.com):** `https://demimanifest.com/sitemap.xml` — keep `/blog/` URLs. Use ≥1 per article where topically relevant.

Fetch via `curl -s` or `WebFetch`. If a sitemap is unreachable, log a warning and proceed with whatever sitemaps loaded; do not fail the pipeline.

## Batch mode

When `$ARGUMENTS` is a number N, run Steps 1–10 N times. Re-read `written.csv` between iterations so each pass picks the next unwritten keyword.

---

## Pipeline

### Step 1: Pick keyword

1. Read `.claude/skills/deenup-blog-writer/keywords.csv`.
2. Read `.claude/skills/deenup-blog-writer/written.csv`.
3. Glob `data/blog/en/*.mdx` as a secondary dedupe check.
4. Empty args → first keyword in `keywords.csv` not in `written.csv` and not matching an existing slug.
5. Generate slug: lowercase, kebab-case, strip special chars, max ~60 chars.
6. Detect article type (regex on lowercase keyword):
   - `\b(haram|halal|permissible|forbidden|allowed|sinful)\b` → is-x-haram
   - `\b(dua|supplication|prayer for|dhikr)\b` → dua
   - `\b(how to|guide|step|tutorial)\b` → how-to
   - else → explainer

### Step 2: Load sitemaps (once per run, reuse across batch)

Curl all three sitemap URLs listed above. Extract `<loc>…</loc>` entries with a quick regex/grep. Keep only `/blog/` URLs. Store three lists: `internal[]`, `deenback[]`, `demimanifest[]`.

### Step 3: Research

Read `references/writing-guidelines.md` and `references/deenup-context.md` first.

Then 2–3 web searches for authentic Quran verses, hadith (Bukhari/Muslim/Abu Dawud/Tirmidhi), and scholarly context from quran.com, sunnah.com, yaqeeninstitute.org, seekersguidance.org.

Rules: never fabricate hadith, verses, scholar names, or statistics. Cite collections + numbers precisely.

### Step 4: Write the article

Write MDX to `data/blog/en/[SLUG].mdx`. Follow `references/writing-guidelines.md` for structure per article type.

**Frontmatter** (use today's date):

```yaml
---
title: 'SEO title 30-60 chars with primary keyword up front'
date: 'YYYY-MM-DD'
summary: 'Benefit-focused summary 120-155 chars'
tags:
  - 'tag1'
  - 'tag2'
  - 'tag3'
authors: ['mathias-yussif']
draft: false
images: ['/images/blog/[SLUG]/hero.webp']
layout: 'PostLayout'
faqs:
  - question: 'Q1?'
    answer: 'A1'
  - question: 'Q2?'
    answer: 'A2'
  - question: 'Q3?'
    answer: 'A3'
  - question: 'Q4?'
    answer: 'A4'
  - question: 'Q5?'
    answer: 'A5'
---
```

Provide **5-7 FAQs**. Each answer must be self-contained (40–60 words) and restate the question's subject so it can be quoted standalone — this is what surfaces in AI Overviews and ChatGPT (rendered as `FAQPage` JSON-LD by the site).

**YAML apostrophe safety:** if any single-quoted frontmatter value contains `'` (e.g. `Allah's`, `don't`), switch that value to double quotes. This breaks builds otherwise.

**Body rules:**

- No `# H1` — the frontmatter title is the H1.
- Start with `## H2`, use `###` for subsections.
- Hero Image at the top:
  ```mdx
  <Image
    src="/images/blog/[SLUG]/hero.webp"
    alt="[SEO alt text related to the keyword]"
    width={1200}
    height={630}
  />
  ```
- **Answer capsule (REQUIRED):** right after the opening hook, add an H2 phrased as the title's question, then ONE self-contained 40–70 word paragraph that answers it directly with a concrete fact/citation. See GEO rules in `references/writing-guidelines.md`.
- **One reference/comparison table** where the topic supports it (GFM tables render — e.g. 5 Pillars at a glance, Fard vs Sunnah vs Nafl, rakah counts, Hajj vs Umrah, zakat rates).
- Phrase H2/H3 headers as the actual questions people/AI ask ("How many rakahs is Isha?"), not vague statements.
- Embed `<AppDownloadCTA>` at least once mid-article, ideally again near the end with `placement="final"`.
- Optional `<AppFeatureCards />` once if it fits.
- **No `<YouTubeEmbed>`** in this remote variant (we can't verify video IDs reliably from the sandbox — skip it entirely).

**Link requirements (HARD):**

- ≥3 internal links drawn from the `internal[]` sitemap list (deenup.app blog posts). Pick topically relevant ones.
- ≥1 external link from `deenback[]` (deenback.com blog).
- ≥1 external link from `demimanifest[]` (demimanifest.com blog).
- ≥2 additional external links to authoritative Islamic sources (quran.com, sunnah.com, yaqeeninstitute.org, etc.).

### Step 5: Generate hero image (local)

Generate the hero **locally** with the bundled script — no API, no key. It renders a 1200x630 WebP linear gradient from DeenUp's warm terracotta/sand brand palette (gradient + film grain + serif title), deterministic from the slug.

```bash
node .claude/skills/deenup-blog-writer/generate-hero-image.js [SLUG] [palette] "[Article Title]"
```

- Pass the article's real title (3-6 words read best) so it renders correctly; omit to derive from the slug.
- **Palettes**: `dawn`, `sunset`, `sand`, `ember`, `bloom`. Omit to auto-pick deterministically from the slug.
- Output: `public/images/blog/[SLUG]/hero.webp`, referenced in frontmatter as `/images/blog/[SLUG]/hero.webp`.

**The script is self-healing.** A fresh routine sandbox checks out the repo with no `node_modules`, so on first run the script auto-installs `sharp` into the skill folder (~20s of npm output is normal — **let it finish; do NOT abandon this step or fall back to the static hero just because you see an install running**). When it prints `SUCCESS`, the image exists at `public/images/blog/[SLUG]/hero.webp`.

**You MUST commit the generated image.** When staging the post, include the image directory — e.g. `git add data/blog/ public/images/blog/` — otherwise the post ships pointing at a file that isn't in the repo.

Only if generation genuinely cannot succeed (e.g. no network in the sandbox) fall back to the shared static hero so the post never ships a broken image: set BOTH the frontmatter `images:` and the `<Image src>` to `/static/images/hero.webp`, note the fallback in your summary, and continue. Do NOT fail the pipeline.

### Step 6: Proofread

Remove robotic phrasing, repetitive openers ("Remember…", "Keep in mind…"), filler ("In today's world"), passive voice where active is clearer. Tone: knowledgeable friend, never preachy.

### Step 7: Validate external links

For every external URL in the article:

```bash
curl -s -o /dev/null -w "%{http_code}" "[URL]"
```

Drop any non-200. If dropping breaks a HARD requirement in Step 4, pick a replacement from the cached sitemap lists and re-validate.

### Step 8: SEO validation

Pass/fail checklist:

Frontmatter:

- [ ] title 30-60 chars
- [ ] date valid YYYY-MM-DD
- [ ] summary 120-155 chars
- [ ] tags 3-6
- [ ] authors `['mathias-yussif']`
- [ ] images `['/images/blog/[SLUG]/hero.webp']`
- [ ] layout `'PostLayout'`
- [ ] faqs 5-7, each answer self-contained
- [ ] no single-quoted value contains an apostrophe

Body:

- [ ] no `# H1`
- [ ] ≥3 `## H2` sections
- [ ] **answer capsule** (H2 question + self-contained 40–70 word answer) directly after the opening hook
- [ ] **≥1 reference/comparison table** where the topic supports it
- [ ] H2/H3 headers phrased as real questions where natural
- [ ] hero `<Image>` at top pointing at `/images/blog/[SLUG]/hero.webp`
- [ ] ≥1 `<AppDownloadCTA>`
- [ ] ≥3 internal links from deenup.app sitemap
- [ ] ≥1 external link to deenback.com (from sitemap)
- [ ] ≥1 external link to demimanifest.com (from sitemap)
- [ ] ≥2 additional credible external links
- [ ] ≥2 Arabic phrases (script + translation)
- [ ] ≥2 Quran or hadith citations
- [ ] word count ≥ 800 (target 1200-1500)

Fix any failure and re-check before moving on.

### Step 9: Append to written.csv

Append `[keyword],[slug]` to `.claude/skills/deenup-blog-writer/written.csv`.

### Step 10: Summary

Print:

```
BLOG POST PUBLISHED
Keyword:   [keyword]
Slug:      [slug]
Type:      [article type]
File:      data/blog/en/[slug].mdx
Words:     [count]
Internal:  [count] (from deenup.app sitemap)
Deenback:  [count]
Demi:      [count]
Other ext: [count] (all 200)
Status:    READY
```

---

## Hard rules

- Always auto-pick next unwritten keyword unless a specific keyword is passed.
- Never hallucinate hadith, verses, scholar names, statistics, or URLs.
- Never embed a YouTube video in this remote variant.
- Generate the hero locally per slug with `generate-hero-image.js`; if it fails, log a warning and continue (the frontmatter path is already correct).
- Never skip link validation.
- Apostrophes in single-quoted YAML will break the build — always scan before committing.
- DeenUp voice: welcoming, knowledgeable, never preachy.
