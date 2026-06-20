---
name: deenup-blog-writer-ar
description: 'Generate SEO-optimized Arabic Islamic blog posts for deenup.app from the Arabic keyword CSV. Auto-detects the next unwritten keyword. Writes natively in Arabic (فصحى, RTL), generates a per-slug Arabic-title hero image locally, validates links, and tracks progress. Use when asked to write an Arabic blog, an Arabic article, مقال عربي, or Arabic content for DeenUp.'
---

# DeenUp Arabic Blog Writer (كاتب مدونة DeenUp بالعربية)

End-to-end pipeline for publishing an SEO-optimized **Arabic** Islamic blog post on
deenup.app. This is the Arabic counterpart of `deenup-blog-writer`. Posts are written
**natively in Arabic** (Modern Standard Arabic, RTL) — never translated from English.

**Default behavior**: Reads the local Arabic keyword CSV, finds the next unwritten
keyword, and runs the full pipeline. No arguments needed.

**Input**: `$ARGUMENTS` is optional:

- Empty (default) → auto-pick the next unwritten keyword, generate 1 article
- A number (e.g., `2`) → auto-pick and generate that many articles in sequence
- A specific Arabic keyword (e.g., `دعاء قبل النوم`) → use that keyword, generate 1 article

## Project Locations

- **Website repo**: `/Users/sihancheng/Projects/DeenUp-website/`
- **Arabic blog posts**: `data/blog/ar/[SLUG].mdx` ← Arabic posts live under `ar/`
- **Hero images**: `public/images/blog/[SLUG]/hero.webp`
- **Live URL**: `https://www.deenup.app/ar/blog/[SLUG]` ← note the `/ar/` prefix
- **Author**: `mathias-yussif`
- **Layout**: `PostLayout`
- Contentlayer auto-assigns `lang: 'ar'` to any file under `data/blog/ar/` — no frontmatter `lang` field needed. RTL, Arabic fonts (Noto Sans Arabic), and hreflang are handled by the site.

## Skill Files

- `keywords.csv` — `Keyword,Slug` (Arabic keyword + pre-computed romanized ASCII slug)
- `written.csv` — `Keyword,Slug` tracker (seeded with the pre-existing Arabic posts)
- `references/writing-guidelines.md` — Arabic register, honorifics, citation norms, structures
- `references/deenup-context.md` — product positioning and Arabic CTA examples
- `generate-hero-image.js` — local Arabic-title hero generator (RTL, no API)

## Batch Mode

When `$ARGUMENTS` is a number N, run the **entire pipeline (Steps 1-10) N times**. Each
iteration auto-picks the next unwritten keyword; re-read `written.csv` between iterations.
Show a header before each: `ARTICLE [X/N] — Starting...` and a final batch summary.

---

## Pipeline Steps

Execute in order. After each step, briefly show the result before proceeding.

### Step 1: Pick Keyword

1. Read `~/.claude/skills/deenup-blog-writer-ar/keywords.csv` (columns: `Keyword,Slug`).
2. Read `~/.claude/skills/deenup-blog-writer-ar/written.csv` (Slug column = already done).
3. Glob `data/blog/ar/*.mdx` as a secondary check.
4. If `$ARGUMENTS` is empty: pick the **first row in `keywords.csv` whose `Slug` is NOT in
   `written.csv` AND has no `data/blog/ar/[Slug].mdx` file.** Use that row's `Keyword` and `Slug`.
5. If `$ARGUMENTS` is a specific Arabic keyword: use it; derive a romanized ASCII slug
   (lowercase, kebab-case, sensible transliteration, ≤50 chars) and confirm it doesn't collide.
6. Auto-detect article type from the Arabic keyword (see `references/writing-guidelines.md` §8):
   - contains `حكم` / `هل يجوز` / `حلال` / `حرام` / `يجوز` → **حكم (is-x-haram)**
   - contains `دعاء` / `أدعية` / `أذكار` / `ذكر` → **دعاء (dua)**
   - contains `كيفية` / `كيف` / `طريقة` / `خطوات` → **كيفية (how-to)**
   - otherwise (معنى / تفسير / فضل / أسماء / أركان / قصة …) → **شرح (explainer)**

Show: picked Arabic keyword, slug, detected article type.

### Step 2: Research

Read `references/writing-guidelines.md` and `references/deenup-context.md` first.

Then do 2-3 web searches for:

- Authentic Quran verses (with surah + ayah) relevant to the topic
- Authentic hadith (Bukhari, Muslim, Abu Dawud, Tirmidhi…) with collection + number + grade
- Scholarly framing from reputable **Arabic** sources (quran.com/ar, dorar.net, sunnah.com, islamweb.net/ar, binbaz.org.sa, islamqa.info/ar, dar-alifta.org)

**Rules**: NO fabricated/weak hadith presented as authentic; verify gradings (dorar.net/sunnah.com);
cite precisely; prefer the majority view and note differences briefly.

Show: 3-5 key findings (verses, hadith with grade, sources) that will shape the article.

### Step 3: Write Article

1. Use the detected type's structure from `references/writing-guidelines.md` §8.
2. Follow the guidelines exactly — فصحى, honorifics (ﷺ، رضي الله عنه، عز وجل…), citation
   format (﴿﴾ for Quran, «» + تخريج + درجة for hadith), tashkeel rules, voice.
3. Write the MDX file at `data/blog/ar/[SLUG].mdx`.

**Frontmatter template (ALL string values double-quoted):**

```yaml
---
title: 'عنوان مُحسَّن للـ SEO (يبدأ بالكلمة المفتاحية)'
date: '2026-06-17'
lastmod: '2026-06-17'
summary: 'خلاصة عملية مفيدة بطول 120-160 محرفًا تقريبًا.'
tags: ['وسم1', 'وسم2', 'وسم3']
authors: ['mathias-yussif']
draft: false
images: ['/images/blog/[SLUG]/hero.webp']
layout: 'PostLayout'
faqs:
  - question: 'سؤال 1؟'
    answer: 'إجابة 1...'
  - question: 'سؤال 2؟'
    answer: 'إجابة 2...'
  - question: 'سؤال 3؟'
    answer: 'إجابة 3...'
  - question: 'سؤال 4؟'
    answer: 'إجابة 4...'
---
```

**CRITICAL — YAML safety for Arabic:**

- **Double-quote every frontmatter string value.** Arabic titles/summaries often contain a
  colon (`:`) which breaks unquoted YAML.
- **Never put an ASCII double-quote (`"`) inside a double-quoted value.** Use Arabic quotation
  marks «...» or "..." for quotes inside titles/answers, never ASCII `"`.
- Use today's actual date for `date` and `lastmod`.

**Body structure:**

- NO `# H1` in the body — the title becomes the H1 via PostLayout.
- Start with the hero `<Image>` right after frontmatter:
  ```mdx
  <Image src="/images/blog/[SLUG]/hero.webp" alt="نص بديل عربي وصفي" width={1200} height={630} />
  ```
- Then `## H2` sections (and `###` for subsections only).
- Embed `<AppDownloadCTA>` at least once (mid-article) and again at the end with `placement="final"` — Arabic `title`/`blurb` tied to the topic (see `deenup-context.md`).
- Optionally `<AppFeatureCards />` once.
- YouTube only via raw `<iframe>` and only if verified (Step 5); otherwise omit.

Show: filename, title, summary, word count, article type.

### Step 4: Proofread

Read the draft as a native Arabic reader. Fix:

- Any machine-translated feel, awkward word order, wrong prepositions
- Missing honorifics (ﷺ، رضي الله عنه، رحمه الله، عز وجل)
- Colloquialisms (must be pure فصحى)
- Robotic/repetitive phrasing, filler, preachy tone
- Tashkeel: ensure Quran/hadith/duas are vowelled; prose is not

Show: number of changes and what was fixed.

### Step 5: Verify YouTube Video (optional)

If embedding a video, search YouTube for a relevant video from a reputable Arabic Islamic
channel and verify via oEmbed:

```bash
curl -s -o /dev/null -w "%{http_code}" "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=[VIDEO_ID]&format=json"
```

Must return `200`. Use a raw `<iframe>` (see guidelines). If you cannot verify, **omit the
video entirely** — never use a guessed ID. (`YouTubeEmbed` is NOT a registered component here.)

Show: video ID, verification status (or "omitted").

### Step 6: Generate Hero Image

Generate locally with the bundled Arabic generator — pass the **real Arabic title**:

```bash
node ~/.claude/skills/deenup-blog-writer-ar/generate-hero-image.js [SLUG] "[العنوان العربي]" [palette]
```

- Palettes: `dawn` | `sand` | `sunset` | `bloom` | `ember` (omit to auto-pick from slug). See guidelines §9 for which mood fits.
- Output: `public/images/blog/[SLUG]/hero.webp`. Keep frontmatter `images` in sync.
- If `sharp` is missing, run once: `npm i sharp --prefix ~/.claude/skills/deenup-blog-writer-ar` (it also resolves sharp from the project and the English skill). If it still fails, log a warning and continue — do NOT fail the pipeline.

Show: image path, palette, file size, status.

### Step 7: Validate SEO & Arabic

Run the checklist on the MDX. Report PASS/FAIL:

**Frontmatter:** title (double-quoted, ~30-65 chars incl. Arabic), date + lastmod (YYYY-MM-DD),
summary (~120-160 chars), tags (3-6), `authors: ["mathias-yussif"]`, images path matches slug,
`layout: "PostLayout"`, faqs (4-6), **all string values double-quoted, no ASCII `"` inside values**.

**Body:** no `# H1`; ≥3 `## H2`; hero `<Image>` at top; ≥1 `<AppDownloadCTA>`; ≥3 internal links
to `/ar/blog/[slug]` (verify targets exist in `data/blog/ar/`); ≥2 external links to credible
Arabic sources; honorifics present (ﷺ etc.); ≥2 Quran/hadith citations in correct format
(﴿﴾ / «» + تخريج + درجة); Quran/hadith/duas vowelled; word count ≥800 (target 1200-1600).

Fix any failure and re-validate. NEVER skip validation.

Show: results and any fixes.

### Step 8: Validate Links (CRITICAL — do not skip)

The pre-existing Arabic posts contain fabricated/mismatched links. **Do not repeat that.**

- **Internal**: every `/ar/blog/[slug]` must have a matching `data/blog/ar/[slug].mdx`. Remove/replace any that don't.
- **External**: fetch every external URL and require HTTP 200:
  ```bash
  curl -s -o /dev/null -w "%{http_code}" -L --max-time 20 "[URL]"
  ```
  Remove or replace any non-200. Ensure each link's anchor text matches its destination
  (no "SeekersGuidance" text pointing at dar-alifta, etc.). Only link to the credible Arabic
  sources in the guidelines.

Show: list of validated internal + external links with status.

### Step 9: Submit to Google Indexing (optional)

If `/Users/sihancheng/Projects/DeenUp-website/google-indexing-key.json` exists, submit
`https://www.deenup.app/ar/blog/[SLUG]` (same JWT flow as the English skill). If the key is
missing or the request fails, log a warning and continue — do NOT fail the pipeline.

Show: indexing status (Submitted / Skipped / Failed).

### Step 10: Append to written.csv

Append `[Arabic keyword],[slug]` to `~/.claude/skills/deenup-blog-writer-ar/written.csv` so the
next run picks the next unwritten keyword.

### Step 11: Summary

```
تم نشر المقال (BLOG POST PUBLISHED)
===================================
Keyword:        [الكلمة المفتاحية]
Slug:           [slug]
Article Type:   [حكم | دعاء | كيفية | شرح]
File:           data/blog/ar/[slug].mdx
URL:            https://www.deenup.app/ar/blog/[slug]
Image:          public/images/blog/[slug]/hero.webp
Title:          [العنوان]
Word Count:     [count]
Internal Links: [count]
External Links: [count] (all verified 200)
YouTube:        [Embedded / Omitted]
Hero Image:     [Generated / Failed]
Indexing:       [Submitted / Skipped]
Status:         READY

Next: cd /Users/sihancheng/Projects/DeenUp-website && pnpm dev  → preview at /ar/blog/[slug]
```

---

## Important Rules

- Default is ALWAYS auto-pick the next unwritten keyword from `keywords.csv`.
- Write **natively in Arabic فصحى** — never translate an English article.
- NEVER fabricate hadith/verses/scholars/statistics/YouTube IDs/links. **Verify every hadith
  grade and every external URL.** This is the top priority — the legacy Arabic posts failed here.
- Always use mandatory honorifics (ﷺ، رضي الله عنه، رحمه الله، عز وجل).
- Double-quote all frontmatter; never put ASCII `"` inside a value.
- Internal links use the `/ar/blog/[slug]` prefix and must point to existing Arabic posts.
- If image generation fails, continue with a note. If indexing key is missing, continue.
- Follow `references/writing-guidelines.md` structures exactly.
- The DeenUp voice is **welcoming, knowledgeable, never preachy, never a fatwa** — close any
  ruling article with **والله أعلم** and route contested/personal matters to أهل العلم.
