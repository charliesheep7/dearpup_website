# DeenUp Blog Writing Guidelines

## Style & Tone — DeenUp Voice

You are writing for DeenUp (deenup.app) — the first AI rooted in Quranic values, an Islamic companion app that helps Muslims:

- Get 24/7 Quranic-cited answers to Islamic questions
- Track daily habits aligned with Islamic values
- Read Quran with AI-powered contextual insights
- Receive daily Quranic verses and duas
- Take reflection quizzes to deepen understanding

**Voice**: Like a knowledgeable, warm friend who genuinely cares about your faith journey.

- Clear, accessible, and welcoming — never preachy or condescending
- Authoritative but approachable — grounded in scholarship without being academic
- Encouraging of daily practice — small consistent steps over dramatic overhauls
- Use "you" and "we" — speak directly to the reader as a fellow Muslim
- Frame everything through strengthening the reader's relationship with Allah

**What makes DeenUp articles DIFFERENT from other Islamic sites**:

- We don't just list rulings — we help readers understand, internalize, and act
- Every article answers: "How does this strengthen my daily connection with Allah?"
- We bridge traditional scholarship with modern life (technology, busy schedules, social media)
- Quranic verses are central — always cited, always connected to practical takeaways
- The app is mentioned naturally as a tool for daily Islamic engagement, never forced

**Tone calibration**:

- NOT: "The majority of scholars hold that..." (dry encyclopedia)
- YES: "Here's what the Quran and authentic hadith teach us, and how you can apply it today."
- NOT: "Your nafs will fight you..." (DeenBack's self-control angle)
- YES: "Building this into your daily routine starts with one small step."
- NOT: "Download our app to track..." (salesy)
- YES: "Many Muslims find it helpful to use a daily reminder — DeenUp can help with that."

**Formatting rules**:

- No emojis ever
- No exclamation marks in headings
- Use italics for Arabic transliteration: _tawbah_, _nafs_, _taqwa_
- Bold for emphasis, not ALL CAPS
- Short paragraphs (2-4 sentences max)
- Use bullet lists for practical steps

---

## Islamic Content Rules

**Accuracy is non-negotiable**:

- Every ruling must cite at least one Quran verse or authentic hadith
- Use proper Arabic script alongside transliteration: e.g., توبة (_tawbah_)
- For hadith: cite the collection and number — e.g., (Sahih Muslim 2702)
- For Quran: cite surah name and verse — e.g., (Surah Al-Baqarah, 2:286)
- When scholars disagree, briefly mention the difference but focus on practical guidance

**Scholar citations**:

- Prefer widely accepted positions (majority view)
- When mentioning a minority opinion, label it clearly
- Never present one madhab's ruling as THE Islamic ruling without noting alternatives
- Keep scholarly discussion brief — link to deeper resources instead

**Arabic text requirements**:

- Include at least 2-3 Arabic phrases or dua texts per article
- Always provide both Arabic script AND English translation
- Format duas in blockquotes:
  > اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ
  >
  > "O Allah, help me to remember You, thank You, and worship You well."
  > — (Abu Dawud 1522)

**What NOT to do**:

- Don't issue fatwas — frame rulings as "scholars say" or "the majority view is"
- Don't use fear-mongering ("you will go to Hell if...")
- Don't dismiss legitimate scholarly differences
- Don't make up hadith or use weak hadith without noting their status
- Don't fabricate statistics, studies, or expert names

---

## SEO Formatting Rules

**Structure**:

- H2 for main sections, H3 for subsections — never H1 (title comes from frontmatter), never H4+
- First paragraph should naturally include the primary keyword
- Use the keyword 3-5 times total (naturally, never forced)
- Include related long-tail keywords in H2/H3 headings where natural

**Content requirements**:

- Minimum 800 words, target 1200-1500
- 3-5 internal links to other DeenUp blog posts or pages
- 2-5 external links to credible Islamic sources (quran.com, sunnah.com, yaqeeninstitute.org, seekersguidance.org)
- At least 3 H2 sections
- A clear practical / action section
- FAQ section with 3-5 questions (these go in frontmatter for schema.org)

**Internal linking**:

- Link to existing blog posts: `/blog/[slug]`
- Link to static pages: `/about`, `/support`, `/blog`
- NEVER link to pages that don't exist — check first via Glob on `data/blog/en/`
- App Store link: https://apps.apple.com/tn/app/deen-back-daily-dua-dhikr/id6755876142

**App component embedding**:

- MUST include at least one `<AppDownloadCTA>` per article
- Customize the `title` and `blurb` props to match the article topic
- Place after a paragraph that naturally leads to the app
- Optionally include `<AppFeatureCards />` once per article
- NEVER use generic CTA text — always tie it to the specific topic

**YouTube video embedding**:

- MUST include exactly one `<YouTubeEmbed>` per article
- Search YouTube for a relevant, high-quality Islamic video on the topic
- Prefer videos from reputable channels (Mufti Menk, Nouman Ali Khan, Omar Suleiman, Yaqeen Institute, etc.)
- Verify the video exists via oEmbed: `curl -s -o /dev/null -w "%{http_code}" "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=[ID]&format=json"` must return `200`
- Use: `<YouTubeEmbed id="[VIDEO_ID]" title="[descriptive title]" />`
- Place naturally within the article — after a section the video expands on
- CRITICAL: Do NOT hallucinate or guess video IDs. If verification fails, skip YouTubeEmbed entirely.

---

## Meta & Frontmatter Rules

**Title** (30-60 characters):

- Include the primary keyword near the beginning
- Frame it as helpful guidance, not academic analysis
- Good: "How to Pray Salah: Complete Step-by-Step Guide"
- Bad: "Scholarly Analysis of the Five Daily Prayers in Islam"

**Summary / Meta Description** (120-155 characters):

- Summarize the practical takeaway
- Include a benefit the reader will get
- Good: "Learn to pray salah step by step with Arabic recitations, movements, and tips for building a consistent prayer habit."
- Bad: "This article discusses the five daily prayers in Islam."

**Tags** (3-6):

- Include topic-specific tags
- Use lowercase, hyphenated format
- Draw from: quran, dua, prayer, salah, ramadan, hajj, fasting, islamic-history, islamic-practice, halal, faith, daily-habits, self-improvement

**FAQs** (3-6 items):

- Frame questions as real people would ask them
- Mix understanding questions with practical ones
- Good: "Can I pray salah in English?" / "What do I do if I miss a prayer?"
- Bad: "What is the Shafi'i position on combining prayers?"

---

## Article Type Structures

### Type: "Is X Haram/Halal?" Articles

**Detection**: keyword contains "haram", "halal", "permissible", "forbidden", "allowed", "sinful"

1. **Opening hook** (100-150 words) — Acknowledge the reader's genuine question with empathy
2. **The Clear Answer** (50-100 words) — Give the ruling upfront with key Quran/hadith evidence
3. **What the Quran and Sunnah Say** (200-300 words) — 2-3 key pieces of evidence, properly cited
4. **Understanding the Wisdom** (150-200 words) — Why this ruling exists, connecting to spiritual benefit
5. **Practical Guidance** (300-400 words) — What to actually do. Embed `<AppDownloadCTA>` here.
6. **Related Dua** (50-100 words) — A specific authentic dua for guidance/strength
7. **Common Questions** (200-300 words) — 3-5 FAQs framed as real struggles
8. **Closing** (100-150 words) — Encouraging, forward-looking. Embed `<AppDownloadCTA placement="final">`.

**YouTubeEmbed**: After section 3 or 4.

### Type: Dua / Supplication Articles

**Detection**: keyword contains "dua", "supplication", "prayer for", "dhikr"

1. **Opening — Why This Dua Matters** (100-150 words) — Connect to a real situation
2. **The Dua** (150-200 words) — Arabic + transliteration + translation + source + when to say it
3. **The Context** (150-200 words) — Story from hadith or sirah
4. **Making It Part of Your Daily Life** (250-350 words) — Habit building, practical triggers. Embed `<AppDownloadCTA>`.
5. **Related Duas** (100-200 words) — 2-3 related duas
6. **Common Questions** (200-250 words) — 3-5 FAQs
7. **Closing** (80-120 words) — Embed `<AppDownloadCTA placement="final">`.

**YouTubeEmbed**: After section 2 or 3.

### Type: How-To Guide Articles

**Detection**: keyword contains "how to", "guide", "step", "tutorial"

1. **Opening** (100-150 words) — The gap between wanting to do something and doing it consistently
2. **Why This Matters** (100-150 words) — Islamic foundation with Quran/hadith
3. **Step-by-Step Guide** (400-500 words) — Numbered steps, concrete and actionable
4. **Building the Habit** (200-300 words) — Consistency tips, tracking. Embed `<AppDownloadCTA>`.
5. **Common Mistakes** (150-200 words) — 3-4 mistakes and alternatives
6. **Common Questions** (200-250 words) — 3-5 practical FAQs
7. **Closing** (80-120 words) — Embed `<AppDownloadCTA placement="final">`.

**YouTubeEmbed**: After section 3 or 4.

### Type: Explainer Articles

**Detection**: everything else

1. **Opening — Why You Should Care** (100-150 words) — Connect to a feeling or situation
2. **What It Actually Means** (200-300 words) — Clear explanation with Quran/hadith, use analogies
3. **Why This Matters for Modern Muslims** (150-250 words) — Connect to today's challenges
4. **How to Apply This Daily** (300-400 words) — Practical ways to embody this. Embed `<AppDownloadCTA>`.
5. **Signs of Progress** (100-150 words) — How to know you're growing
6. **Common Questions** (200-250 words) — 3-5 FAQs
7. **Closing** (80-120 words) — Embed `<AppDownloadCTA placement="final">`.

**YouTubeEmbed**: After section 2 or 3.

---

## Image Prompt Rules

Every hero image MUST follow these rules:

**Style**: John Singer Sargent-inspired oil painting with expressive, visible brush strokes.
Every prompt MUST end with: "John Singer Sargent-inspired oil painting, expressive visible brush strokes"

**Palette**: Warm, muted, spiritual tones:

- Cream, deep green, gold, warm browns
- Soft light, usually dawn or dusk atmosphere
- No harsh neon colors, no pure black backgrounds

**Subject**: ONE clear central visual concept. Simple, evocative, symbolic.

- A single object, scene, or moment representing the article topic
- Silhouettes or figures seen from behind — NEVER detailed faces
- Islamic visual elements: mosques, prayer beads, open Quran, crescent, lanterns, calligraphy patterns
- Nature elements: dawn light, flowing water, paths, gardens, mountains

**Format**: Short descriptive phrases, NOT full sentences. Under 40 words.

**Forbidden**:

- No text, words, or logos in the image
- No depictions of prophets, God, or angels
- No detailed human faces (silhouettes or from behind only)
- No modern technology (phones, screens, etc.)
- No violence or dark imagery

**Examples**:

Topic: "How to Pray Salah"
Prompt: "A dimly lit prayer mat under moonlight streaming through an arched window, prayer beads and open Quran, deep blue and warm gold tones, John Singer Sargent-inspired oil painting, expressive visible brush strokes"

Topic: "Dua for Anxiety"
Prompt: "A solitary figure in white prayer garment, seen from behind, hands raised in supplication at dawn, soft golden light, mosque silhouette in distance, John Singer Sargent-inspired oil painting, expressive visible brush strokes"

Topic: "Understanding Halal Food"
Prompt: "An abundant table of fruits and bread in warm morning light, earthen pottery, deep green and cream tones, John Singer Sargent-inspired oil painting, expressive visible brush strokes"
