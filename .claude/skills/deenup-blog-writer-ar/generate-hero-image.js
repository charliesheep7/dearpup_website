#!/usr/bin/env node

/**
 * DeenUp Arabic Blog Hero Image Generator (gradient + grain + RTL Arabic title)
 *
 * Renders a 1200x630 WebP: a warm DeenUp brand gradient + film grain, with the
 * article's ARABIC title set right-to-left in a bold Arabic font. Deterministic
 * from the slug. NO external API (no Gemini) — runs fully locally AND on a bare
 * remote CCR/CI sandbox.
 *
 * Cloud-hardened (mirrors the English skill + adds Arabic font support):
 *   - Self-installs `sharp` into this skill folder if missing (fresh sandbox).
 *   - Bundles an Arabic font (fonts/Amiri-Bold.ttf, fonts/Tajawal-Bold.ttf) and
 *     wires it up via a generated FONTCONFIG_FILE so librsvg can shape Arabic even
 *     on a bare Linux runner that has NO system Arabic fonts. macOS fonts are kept
 *     as fallbacks, so output is consistent across environments.
 *
 * Usage:
 *   node generate-hero-image.js <slug> "<arabic-title>" [palette]
 *
 * Palettes: dawn | sunset | sand | ember | bloom | (default: auto — hashed from slug)
 * Output:   public/images/blog/<slug>/hero.webp  (in the DeenUp repo)
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const os = require('os')
const { execSync } = require('child_process')

const SKILL_DIR = __dirname
const FONTS_DIR = path.join(SKILL_DIR, 'fonts')

// Resolve the DeenUp repo root robustly so the SAME script works both locally
// (skill lives in ~/.claude/skills) and in a remote CCR/CI sandbox (skill is
// committed at <repo>/.claude/skills/deenup-blog-writer-ar, repo = 3 levels up).
function findProjectRoot() {
  const looksLikeRepo = (d) => {
    try {
      return (
        fs.existsSync(path.join(d, 'data', 'blog')) && fs.existsSync(path.join(d, 'package.json'))
      )
    } catch {
      return false
    }
  }
  // 1. Explicit override
  if (process.env.DEENUP_REPO && looksLikeRepo(process.env.DEENUP_REPO))
    return process.env.DEENUP_REPO
  // 2. Skill committed inside the repo: <repo>/.claude/skills/deenup-blog-writer-ar
  const fromSkill = path.resolve(SKILL_DIR, '..', '..', '..')
  if (looksLikeRepo(fromSkill)) return fromSkill
  // 3. The remote sandbox checks the repo out as the working directory
  if (looksLikeRepo(process.cwd())) return process.cwd()
  // 4. Local-dev fallback
  const local = '/Users/sihancheng/Projects/DeenUp-website'
  if (looksLikeRepo(local)) return local
  return process.cwd()
}

const PROJECT_ROOT = findProjectRoot()
const WIDTH = 1200
const HEIGHT = 630

// Bundled-font-first stack (family names as registered in the TTFs). Amiri =
// elegant naskh (primary), Tajawal = clean sans fallback, then macOS system
// Arabic fonts, then Noto. The bundled two guarantee rendering on bare Linux.
const ARABIC_FONT_STACK =
  "'Amiri', 'Tajawal', 'Geeza Pro', 'Damascus', '.SF Arabic', 'Noto Sans Arabic', sans-serif"

const C = {
  accent50: '#fdefe9',
  accent100: '#f9dfd4',
  accent200: '#f2c2af',
  accent300: '#eaa287',
  accent400: '#e38f72',
  accent500: '#d97757',
  accent600: '#c66547',
  accent700: '#a94e36',
  accent800: '#8a3e2c',
  accent900: '#6e3123',
  accent950: '#571f18',
  bg: '#faf9f5',
  surface: '#f0eee6',
  sand200: '#e3e1d7',
  sand300: '#ccc9bc',
  ink: '#3d3d3a',
  ink900: '#2a2926',
  ink950: '#1a1917',
  cream: '#faf9f5',
}

const PALETTES = {
  dawn: {
    angle: 125,
    stops: [C.bg, C.accent50, C.accent100, C.accent200],
    glowColor: C.accent300,
    glowPos: { cx: 72, cy: 28 },
    ink: C.ink900,
  },
  sunset: {
    angle: 135,
    stops: [C.accent300, C.accent500, C.accent700, C.accent900],
    glowColor: C.accent200,
    glowPos: { cx: 28, cy: 26 },
    ink: C.cream,
  },
  sand: {
    angle: 150,
    stops: [C.bg, C.surface, C.sand200, C.sand300],
    glowColor: C.accent200,
    glowPos: { cx: 76, cy: 74 },
    ink: C.ink900,
  },
  ember: {
    angle: 145,
    stops: [C.accent600, C.accent800, C.accent900, C.ink950],
    glowColor: C.accent500,
    glowPos: { cx: 30, cy: 30 },
    ink: C.cream,
  },
  bloom: {
    angle: 130,
    stops: [C.accent400, C.accent500, C.accent600, C.accent800],
    glowColor: C.accent200,
    glowPos: { cx: 70, cy: 30 },
    ink: C.cream,
  },
}

function hashPick(str, arr) {
  const hash = crypto.createHash('sha256').update(str).digest()
  return arr[hash[0] % arr.length]
}

function angleToPoints(angle) {
  const rad = ((angle - 90) * Math.PI) / 180
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)
  return {
    x1: `${50 - dx * 50}%`,
    y1: `${50 - dy * 50}%`,
    x2: `${50 + dx * 50}%`,
    y2: `${50 + dy * 50}%`,
  }
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .slice(0, 6)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

function isArabic(s) {
  return /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/.test(s)
}

function wrapTitle(title, maxCharsPerLine, maxLines = 3) {
  const words = title.trim().split(/\s+/).filter(Boolean)
  const lines = []
  let cur = ''
  for (let i = 0; i < words.length; i++) {
    const w = words[i]
    const candidate = cur ? `${cur} ${w}` : w
    if (candidate.length > maxCharsPerLine && cur) {
      lines.push(cur)
      cur = w
      if (lines.length === maxLines - 1) {
        cur = [w, ...words.slice(i + 1)].join(' ')
        break
      }
    } else {
      cur = candidate
    }
  }
  if (cur) lines.push(cur)
  return lines.slice(0, maxLines)
}

const TITLE_MAX_WIDTH = Math.floor(WIDTH * 0.78)

function fitFontSize(lines, widthFactor, baseByLines) {
  const longest = lines.reduce((m, l) => Math.max(m, l.length), 0)
  const base = baseByLines[Math.min(lines.length, baseByLines.length) - 1]
  const projected = longest * base * widthFactor
  if (projected <= TITLE_MAX_WIDTH) return base
  return Math.floor((TITLE_MAX_WIDTH / (longest * widthFactor)) * 0.98)
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Wire up a fontconfig that includes the BUNDLED fonts dir first, then common
// system dirs, plus a writable cache. Setting FONTCONFIG_FILE makes librsvg (used
// by sharp) discover the bundled Arabic font on a bare Linux sandbox that has no
// system Arabic fonts. Safe on macOS too (system dirs still listed).
function setupFontconfig() {
  try {
    if (!fs.existsSync(FONTS_DIR)) return
    const cacheDir = path.join(os.tmpdir(), 'deenup-ar-fc-cache')
    fs.mkdirSync(cacheDir, { recursive: true })
    const conf = `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${FONTS_DIR}</dir>
  <dir>/usr/share/fonts</dir>
  <dir>/usr/local/share/fonts</dir>
  <dir prefix="xdg">fonts</dir>
  <dir>~/.fonts</dir>
  <dir>/System/Library/Fonts</dir>
  <dir>/System/Library/Fonts/Supplemental</dir>
  <dir>/Library/Fonts</dir>
  <cachedir>${cacheDir}</cachedir>
</fontconfig>
`
    const confPath = path.join(cacheDir, 'fonts.conf')
    fs.writeFileSync(confPath, conf)
    process.env.FONTCONFIG_FILE = confPath
  } catch (err) {
    console.error(`Font setup warning (continuing): ${err && err.message}`)
  }
}

function buildSvg(slug, titleArg, paletteName) {
  const name = paletteName || hashPick(slug, Object.keys(PALETTES))
  const p = PALETTES[name]
  if (!p) throw new Error(`Unknown palette: ${paletteName}`)

  const rawTitle = titleArg ? titleArg.trim() : slugToTitle(slug)
  const arabic = isArabic(rawTitle)

  const maxChars = arabic ? 24 : 22
  const widthFactor = arabic ? 0.5 : 0.52
  const baseByLines = arabic ? [92, 80, 66] : [86, 74, 62]

  const titleLines = wrapTitle(rawTitle, maxChars)
  const titleSize = fitFontSize(titleLines, widthFactor, baseByLines)

  const pts = angleToPoints(p.angle)
  const stops = p.stops
    .map(
      (c, i) =>
        `<stop offset="${((i / (p.stops.length - 1)) * 100).toFixed(1)}%" stop-color="${c}" />`
    )
    .join('')
  const seed = parseInt(crypto.createHash('md5').update(slug).digest('hex').slice(0, 4), 16) % 9999

  const lineHeight = titleSize * 1.2
  const titleBlockH = lineHeight * titleLines.length
  const titleYStart = HEIGHT / 2 - titleBlockH / 2 + titleSize * 0.78
  const inkColor = p.ink
  const dir = arabic ? 'rtl' : 'ltr'

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="${WIDTH / 2}" y="${(titleYStart + i * lineHeight).toFixed(1)}" direction="${dir}">${escapeXml(line)}</tspan>`
    )
    .join('')

  const isLightInk = inkColor === C.cream
  const shadow = isLightInk
    ? 'drop-shadow(0 2px 22px rgba(0,0,0,0.45))'
    : 'drop-shadow(0 1px 14px rgba(250,249,245,0.55))'
  const fontFamily = arabic
    ? ARABIC_FONT_STACK
    : "'DM Serif Display', 'DM Serif Text', 'Georgia', 'Iowan Old Style', serif"
  const letterSpacing = arabic ? '0' : '-0.5'

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="${pts.x1}" y1="${pts.y1}" x2="${pts.x2}" y2="${pts.y2}">${stops}</linearGradient>
    <radialGradient id="glow" cx="${p.glowPos.cx}%" cy="${p.glowPos.cy}%" r="60%">
      <stop offset="0%" stop-color="${p.glowColor}" stop-opacity="0.45" />
      <stop offset="45%" stop-color="${p.glowColor}" stop-opacity="0.16" />
      <stop offset="100%" stop-color="${p.glowColor}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="80%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="${isLightInk ? 0.32 : 0.14}" />
    </radialGradient>
    <filter id="grainFine" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="1.9" numOctaves="2" seed="${seed}" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.14 0" />
    </filter>
    <filter id="grainSoft" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="${seed + 1}" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.40 0" />
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grainSoft)" opacity="0.40" style="mix-blend-mode: overlay" />
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grainFine)" opacity="0.45" style="mix-blend-mode: overlay" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)" />
  <text text-anchor="middle" direction="${dir}" font-family="${fontFamily}" font-style="normal" font-weight="700"
        font-size="${titleSize}" letter-spacing="${letterSpacing}" fill="${inkColor}" opacity="0.98"
        style="paint-order: stroke; filter: ${shadow};">${titleTspans}</text>
</svg>`
}

function resolveSharp() {
  const roots = [
    PROJECT_ROOT,
    SKILL_DIR,
    path.join(os.homedir(), '.claude', 'skills', 'deenup-blog-writer'),
  ]
  const candidates = []
  for (const root of roots) {
    candidates.push(path.join(root, 'node_modules', 'sharp'))
    candidates.push(path.join(root, 'node_modules', 'next', 'node_modules', 'sharp'))
    try {
      const pnpmDir = path.join(root, 'node_modules', '.pnpm')
      if (fs.existsSync(pnpmDir)) {
        for (const entry of fs.readdirSync(pnpmDir)) {
          if (entry.startsWith('sharp@'))
            candidates.push(path.join(pnpmDir, entry, 'node_modules', 'sharp'))
        }
      }
    } catch {
      /* ignore */
    }
  }
  for (const candidate of candidates) {
    try {
      return require(candidate)
    } catch {
      /* next */
    }
  }
  try {
    return require('sharp')
  } catch {
    return null
  }
}

// Install sharp into this skill once if missing (fresh CCR/CI sandbox).
function ensureSharp() {
  let sharp = resolveSharp()
  if (sharp) return sharp
  console.error('sharp not found — installing into the skill (one-time, ~20s)...')
  try {
    execSync('npm install --no-audit --no-fund --loglevel=error', {
      cwd: SKILL_DIR,
      stdio: 'inherit',
      timeout: 180000,
    })
  } catch (err) {
    console.error(`Auto-install of sharp failed: ${err && err.message}`)
    return null
  }
  return resolveSharp()
}

async function main() {
  const slug = process.argv[2]
  const titleArg = process.argv[3]
  const paletteArg = process.argv[4]

  if (!slug) {
    console.error('Usage: node generate-hero-image.js <slug> "<arabic-title>" [palette]')
    console.error(`Palettes: ${Object.keys(PALETTES).join(', ')}`)
    process.exit(1)
  }
  if (!titleArg)
    console.warn('WARNING: no Arabic title passed — falling back to a romanized slug title.')

  setupFontconfig()

  const sharp = ensureSharp()
  if (!sharp) {
    console.error('Error: sharp is not installed and auto-install failed.')
    process.exit(1)
  }

  const svg = buildSvg(slug, titleArg, paletteArg)
  const outputDir = path.join(PROJECT_ROOT, 'public', 'images', 'blog', slug)
  const outputPath = path.join(outputDir, 'hero.webp')
  fs.mkdirSync(outputDir, { recursive: true })

  await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(outputPath)

  const stats = fs.statSync(outputPath)
  const pickedPalette = paletteArg || hashPick(slug, Object.keys(PALETTES))
  console.log('SUCCESS')
  console.log(`Slug:            ${slug}`)
  console.log(`Palette:         ${pickedPalette}`)
  console.log(`Image saved:     ${outputPath}`)
  console.log(`File size:       ${(stats.size / 1024).toFixed(1)} KB`)
  console.log(`Frontmatter use: images: ['/images/blog/${slug}/hero.webp']`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
