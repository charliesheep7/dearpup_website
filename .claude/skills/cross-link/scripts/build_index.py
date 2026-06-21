#!/usr/bin/env python3
"""Build a cross-site content index across the configured owned sites.

Scans each site's <blog_dir>/<lang>/*.mdx, parses YAML frontmatter (no PyYAML
dependency), and writes <workdir>/cross-link-index.json:

  [{site, name, lang, slug, file, repo_path, url, title, summary, tags,
    body_len, links_to_sites}]

`links_to_sites` = keys of the OTHER owned sites this article already links to
(found by scanning the body for their absolute domains). The planner uses this so
it never re-links a pair the author already connected by hand.

Usage:  python3 build_index.py [WORKDIR]
WORKDIR defaults to the current directory. Repos are resolved per site as
config.local_path if it exists, else <WORKDIR>/_repos/<key> (cloud clone target).
"""
import json
import os
import re
import sys
import glob

HERE = os.path.dirname(os.path.abspath(__file__))
CONFIG = os.path.join(HERE, "..", "config.json")


def load_config():
    with open(CONFIG, encoding="utf-8") as f:
        return json.load(f)


def resolve_repo(site, workdir):
    lp = site.get("local_path")
    if lp and os.path.isdir(os.path.join(lp, site["blog_dir"])):
        return lp
    alt = os.path.join(workdir, "_repos", site["key"])
    if os.path.isdir(os.path.join(alt, site["blog_dir"])):
        return alt
    return None


def strip_quotes(s):
    s = s.strip()
    if len(s) >= 2 and s[0] == s[-1] and s[0] in "'\"":
        return s[1:-1]
    return s


def split_top(s):
    """Split an inline YAML list body on top-level commas (ignore quoted commas)."""
    out, cur, q = [], "", None
    for ch in s:
        if q:
            cur += ch
            if ch == q:
                q = None
        elif ch in "'\"":
            q = ch
            cur += ch
        elif ch == ",":
            out.append(cur)
            cur = ""
        else:
            cur += ch
    if cur.strip():
        out.append(cur)
    return out


def parse_frontmatter(text):
    """Return (dict, body). Handles `key: 'val'`, inline `[a, b]`, and block `- item` lists."""
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    fm = text[3:end]
    body = text[end + 4:]
    data = {}
    lines = fm.splitlines()
    i = 0
    while i < len(lines):
        m = re.match(r"^([A-Za-z0-9_]+):\s*(.*)$", lines[i])
        if not m:
            i += 1
            continue
        key, val = m.group(1), m.group(2).strip()
        if val == "":
            items = []
            j = i + 1
            while j < len(lines) and re.match(r"^\s*-\s+", lines[j]):
                items.append(strip_quotes(re.sub(r"^\s*-\s+", "", lines[j]).strip()))
                j += 1
            data[key] = items
            i = j if items else i + 1
            continue
        if val.startswith("[") and val.endswith("]"):
            inner = val[1:-1].strip()
            data[key] = [strip_quotes(x) for x in split_top(inner)] if inner else []
        else:
            data[key] = strip_quotes(val)
        i += 1
    return data, body


def url_for(site, lang, slug):
    base = site["base_url"].rstrip("/")
    return f"{base}/blog/{slug}" if lang == "en" else f"{base}/{lang}/blog/{slug}"


def main():
    workdir = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    cfg = load_config()
    sites = cfg["sites"]
    domains = {
        s["key"]: re.sub(r"^https?://", "", s["base_url"]).rstrip("/")
        for s in sites
    }
    index = []
    missing = []
    for site in sites:
        repo = resolve_repo(site, workdir)
        if not repo:
            missing.append(site["key"])
            continue
        for lang in site["langs"]:
            d = os.path.join(repo, site["blog_dir"], lang)
            for fp in sorted(glob.glob(os.path.join(d, "*.mdx"))):
                slug = os.path.splitext(os.path.basename(fp))[0]
                with open(fp, encoding="utf-8") as f:
                    text = f.read()
                fm, body = parse_frontmatter(text)
                if str(fm.get("draft", "")).lower() == "true":
                    continue
                tags = fm.get("tags", [])
                if isinstance(tags, str):
                    tags = [tags]
                links_to = []
                for other in sites:
                    if other["key"] == site["key"]:
                        continue
                    dom = domains[other["key"]]
                    if dom in body or dom.replace("www.", "") in body:
                        links_to.append(other["key"])
                index.append({
                    "site": site["key"],
                    "name": site["name"],
                    "lang": lang,
                    "slug": slug,
                    "file": os.path.relpath(fp, repo),
                    "repo_path": repo,
                    "url": url_for(site, lang, slug),
                    "title": fm.get("title", ""),
                    "summary": fm.get("summary", ""),
                    "tags": tags,
                    "body_len": len(body),
                    "links_to_sites": links_to,
                })
    out = os.path.join(workdir, "cross-link-index.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)

    counts = {}
    for r in index:
        counts.setdefault(r["site"], {}).setdefault(r["lang"], 0)
        counts[r["site"]][r["lang"]] += 1
    print(f"Indexed {len(index)} articles -> {out}")
    for k, v in counts.items():
        print(f"  {k}: " + ", ".join(f"{lang}={n}" for lang, n in v.items()))
    if missing:
        print("MISSING REPOS (clone needed): " + ", ".join(missing))


if __name__ == "__main__":
    main()
