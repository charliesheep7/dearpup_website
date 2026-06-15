#!/usr/bin/env node

/**
 * DeenUp Blog Hero Image Generator (static gradient + grain)
 *
 * Generates a 1200x630 hero image: a linear gradient drawn from DeenUp's warm
 * terracotta/sand brand palette, with a film-grain overlay via SVG
 * feTurbulence. Deterministic from the slug — same slug always produces the
 * same image — so regenerating is stable. NO external API (no Gemini), runs
 * fully locally every time.
 *
 * Usage:
 *   node generate-hero-image.js <slug> [palette] [title]
 *
 * Palettes: dawn | sunset | sand | ember | bloom | (default: auto — hashed from slug)
 *
 * Title: 3-6 words rendered centered in a large serif. If omitted, derived
 * from the slug (kebab-case → Title Case, trimmed to first 6 words).
 *
 * Output: public/images/blog/<slug>/hero.webp
 *   (in /Users/sihancheng/Projects/DeenUp-website)
 *
 * Dependencies: sharp. Resolved from the DeenUp project first, then this
 * skill's own node_modules (installed once as a reliable fallback), then global.
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { execSync } = require('child_process')

const PROJECT_ROOT = '/Users/sihancheng/Projects/DeenUp-website'
const SKILL_DIR = __dirname
const WIDTH = 1200
const HEIGHT = 630

// DeenUp brand tokens (from css/tailwind.css)
const C = {
  // Terracotta accent scale
  accent50: '#fdefe9',
  accent100: '#f9dfd4',
  accent200: '#f2c2af',
  accent300: '#eaa287',
  accent400: '#e38f72',
  accent500: '#d97757', // brand accent
  accent600: '#c66547',
  accent700: '#a94e36',
  accent800: '#8a3e2c',
  accent900: '#6e3123',
  accent950: '#571f18',

  // Warm sand neutrals
  bg: '#faf9f5',
  surface: '#f0eee6',
  sand200: '#e3e1d7',
  sand300: '#ccc9bc',

  // Ink
  ink: '#3d3d3a',
  ink900: '#2a2926',
  ink950: '#1a1917',
  cream: '#faf9f5',
}

// Curated palettes. `ink` = title text color that contrasts the gradient.
const PALETTES = {
  // Light, airy warm dawn — cream → soft terracotta tints, dark ink
  dawn: {
    angle: 125,
    stops: [C.bg, C.accent50, C.accent100, C.accent200],
    glowColor: C.accent300,
    glowPos: { cx: 72, cy: 28 },
    ink: C.ink900,
  },
  // Warm sunset — mid terracotta → deep, cream ink
  sunset: {
    angle: 135,
    stops: [C.accent300, C.accent500, C.accent700, C.accent900],
    glowColor: C.accent200,
    glowPos: { cx: 28, cy: 26 },
    ink: C.cream,
  },
  // Neutral warm sand — calm, dark ink
  sand: {
    angle: 150,
    stops: [C.bg, C.surface, C.sand200, C.sand300],
    glowColor: C.accent200,
    glowPos: { cx: 76, cy: 74 },
    ink: C.ink900,
  },
  // Deep ember — rich terracotta → near-black, cream ink
  ember: {
    angle: 145,
    stops: [C.accent600, C.accent800, C.accent900, C.ink950],
    glowColor: C.accent500,
    glowPos: { cx: 30, cy: 30 },
    ink: C.cream,
  },
  // Saturated single-hue terracotta — strongest brand read, cream ink
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
  // Convert CSS-style degrees (0deg = up, 90deg = right) to SVG userSpace coords.
  const rad = ((angle - 90) * Math.PI) / 180
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)
  const x1 = 50 - dx * 50
  const y1 = 50 - dy * 50
  const x2 = 50 + dx * 50
  const y2 = 50 + dy * 50
  return { x1: `${x1}%`, y1: `${y1}%`, x2: `${x2}%`, y2: `${y2}%` }
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .slice(0, 6)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

// Greedy wrap into up to `maxLines` balanced lines by character budget.
function wrapTitle(title, maxCharsPerLine = 22, maxLines = 3) {
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
        // Last allowed line: dump the rest.
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

// Title stays within ~70% of canvas width.
const TITLE_MAX_WIDTH = Math.floor(WIDTH * 0.7)

function fitFontSize(lines, maxPx = TITLE_MAX_WIDTH) {
  const longest = lines.reduce((m, l) => Math.max(m, l.length), 0)
  const base = lines.length === 1 ? 86 : lines.length === 2 ? 74 : 62
  const projected = longest * base * 0.52
  if (projected <= maxPx) return base
  return Math.floor((maxPx / (longest * 0.52)) * 0.98)
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSvg(slug, paletteName, titleArg) {
  const name = paletteName || hashPick(slug, Object.keys(PALETTES))
  const p = PALETTES[name]
  if (!p) throw new Error(`Unknown palette: ${paletteName}`)

  const title = titleArg ? titleArg.trim() : slugToTitle(slug)
  const titleLines = wrapTitle(title)

  const pts = angleToPoints(p.angle)
  const stops = p.stops
    .map((c, i) => {
      const offset = (i / (p.stops.length - 1)) * 100
      return `<stop offset="${offset.toFixed(1)}%" stop-color="${c}" />`
    })
    .join('')

  // Deterministic turbulence seed per slug so the grain is stable.
  const seed = parseInt(crypto.createHash('md5').update(slug).digest('hex').slice(0, 4), 16) % 9999

  const titleSize = fitFontSize(titleLines)
  const lineHeight = titleSize * 1.08
  const titleBlockH = lineHeight * titleLines.length
  const titleYStart = HEIGHT / 2 - titleBlockH / 2 + titleSize * 0.82
  const inkColor = p.ink

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="${WIDTH / 2}" y="${titleYStart + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('')

  // Shadow contrast adapts to ink color: light ink → dark shadow, dark ink → soft light halo.
  const isLightInk = inkColor === C.cream
  const shadow = isLightInk
    ? 'drop-shadow(0 2px 22px rgba(0,0,0,0.45))'
    : 'drop-shadow(0 1px 14px rgba(250,249,245,0.55))'

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="${pts.x1}" y1="${pts.y1}" x2="${pts.x2}" y2="${pts.y2}">
      ${stops}
    </linearGradient>

    <radialGradient id="glow" cx="${p.glowPos.cx}%" cy="${p.glowPos.cy}%" r="60%">
      <stop offset="0%" stop-color="${p.glowColor}" stop-opacity="0.45" />
      <stop offset="45%" stop-color="${p.glowColor}" stop-opacity="0.16" />
      <stop offset="100%" stop-color="${p.glowColor}" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="vignette" cx="50%" cy="50%" r="80%">
      <stop offset="55%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="${isLightInk ? 0.32 : 0.14}" />
    </radialGradient>

    <!-- Fine film grain -->
    <filter id="grainFine" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="1.9" numOctaves="2" seed="${seed}" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 1
                                            0 0 0 0 1
                                            0 0 0 0 1
                                            0 0 0 0.14 0" />
    </filter>

    <!-- Coarse cloud drift -->
    <filter id="grainSoft" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="${seed + 1}" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 1
                                            0 0 0 0 1
                                            0 0 0 0 1
                                            0 0 0 0.40 0" />
    </filter>
  </defs>

  <!-- Base gradient -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />

  <!-- Soft brand glow -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

  <!-- Coarse cloud drift -->
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grainSoft)" opacity="0.40" style="mix-blend-mode: overlay" />

  <!-- Fine film grain -->
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grainFine)" opacity="0.45" style="mix-blend-mode: overlay" />

  <!-- Vignette -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)" />

  <!-- Serif title -->
  <text text-anchor="middle"
        font-family="'DM Serif Display', 'DM Serif Text', 'Georgia', 'Iowan Old Style', serif"
        font-style="normal"
        font-weight="400"
        font-size="${titleSize}"
        letter-spacing="-0.5"
        fill="${inkColor}"
        opacity="0.98"
        style="paint-order: stroke; filter: ${shadow};">
    ${titleTspans}
  </text>
</svg>`
}

function resolveSharp() {
  const candidates = [
    path.join(PROJECT_ROOT, 'node_modules', 'sharp'),
    path.join(PROJECT_ROOT, 'node_modules', 'next', 'node_modules', 'sharp'),
    path.join(SKILL_DIR, 'node_modules', 'sharp'),
  ]

  // pnpm stores keep sharp under .pnpm/sharp@*/node_modules/sharp — scan both roots.
  for (const root of [PROJECT_ROOT, SKILL_DIR]) {
    try {
      const pnpmDir = path.join(root, 'node_modules', '.pnpm')
      if (fs.existsSync(pnpmDir)) {
        for (const entry of fs.readdirSync(pnpmDir)) {
          if (entry.startsWith('sharp@')) {
            candidates.push(path.join(pnpmDir, entry, 'node_modules', 'sharp'))
          }
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
      /* try next */
    }
  }
  try {
    return require('sharp')
  } catch {
    return null
  }
}

// Resolve sharp; if it is missing (e.g. a fresh CI/routine sandbox with no
// node_modules), install it into this skill's own folder once and re-resolve.
// This is what makes per-slug hero generation work in the cloud routine, which
// checks out the repo without running `npm install`.
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

  // Clear require cache for any partial resolution, then try again.
  sharp = resolveSharp()
  return sharp
}

async function main() {
  const slug = process.argv[2]
  const paletteArg = process.argv[3]
  const titleArg = process.argv[4]

  if (!slug) {
    console.error('Usage: node generate-hero-image.js <slug> [palette] [title]')
    console.error(`Palettes: ${Object.keys(PALETTES).join(', ')}`)
    process.exit(1)
  }

  const sharp = ensureSharp()
  if (!sharp) {
    console.error('Error: sharp is not installed and auto-install failed.')
    console.error('Install it once into this skill so it always works:')
    console.error(`  npm install --prefix ${SKILL_DIR}`)
    console.error(`Or install project deps in ${PROJECT_ROOT}.`)
    process.exit(1)
  }

  const svg = buildSvg(slug, paletteArg, titleArg)
  const outputDir = path.join(PROJECT_ROOT, 'public', 'images', 'blog', slug)
  const outputPath = path.join(outputDir, 'hero.webp')
  fs.mkdirSync(outputDir, { recursive: true })

  await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(outputPath)

  const stats = fs.statSync(outputPath)
  const sizeKB = (stats.size / 1024).toFixed(1)
  const pickedPalette = paletteArg || hashPick(slug, Object.keys(PALETTES))

  console.log('SUCCESS')
  console.log(`Slug:            ${slug}`)
  console.log(`Palette:         ${pickedPalette}`)
  console.log(`Image saved:     ${outputPath}`)
  console.log(`File size:       ${sizeKB} KB`)
  console.log(`Frontmatter use: images: ['/images/blog/${slug}/hero.webp']`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
