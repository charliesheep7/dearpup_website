#!/usr/bin/env python3
"""Plan today's cross-site links: symmetric round-robin, relevance-scored, footprint-safe.

Reads <workdir>/cross-link-index.json + the ledger, writes <workdir>/cross-link-plan.json:
a short list of (source article -> target-site article) candidates for the SKILL to turn
into natural in-body links.

Guarantees enforced here (so they can't drift run to run):
  * same-language only (en->en, ar->ar)
  * never re-link an existing source->target-site pair (ledger OR author-made)
  * <= per_ordered_pair_weekly_cap links per ordered (src_site -> tgt_site) per 7 days
  * one new outbound link per source article per run; source not reused within ~7 days
  * target diversity: a target URL receives <= max_inbound_per_target_url links total
  * symmetric rotation across all 6 ordered site pairs, rotated by date for variety
  * daily count between daily_min and daily_max (fewer is fine if relevance bar unmet)

Usage:  python3 plan_batch.py [WORKDIR]
"""
import json
import os
import re
import sys
import random
from datetime import date, datetime, timedelta
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
CONFIG = os.path.join(HERE, "..", "config.json")

STOP = set((
    "the a an and or of to in for on is are be by with from as at this that it its "
    "your you we our their his her them they how what why when which who whom into "
    "about above after again against all am any because been before being below "
    "between both did do does doing down during each few further had has have having "
    "he him himself if more most no nor not now off once only other out over own same "
    "she should so some such than then there these those through too under until up "
    "very was were will would can may might must islam islamic muslim muslims allah"
).split())


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def toks(*strings):
    s = " ".join(strings).lower()
    return {w for w in re.split(r"[^a-z0-9]+", s) if len(w) > 2 and w not in STOP}


def jaccard(a, b):
    a, b = set(a), set(b)
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def relevance(src, tgt):
    tagj = jaccard([t.lower() for t in src["tags"]], [t.lower() for t in tgt["tags"]])
    st, tt = toks(src["title"], src["summary"]), toks(tgt["title"], tgt["summary"])
    overlap = len(st & tt)
    textsim = overlap / max(6, min(len(st), len(tt))) if st and tt else 0.0
    return 3.0 * tagj + 1.5 * textsim, tagj, overlap


def main():
    workdir = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    cfg = load(CONFIG)
    index = load(os.path.join(workdir, "cross-link-index.json"))
    site_by_key = {s["key"]: s for s in cfg["sites"]}
    sites = [s["key"] for s in cfg["sites"]]

    # locate ledger (lives committed inside one repo so cloud runs keep state)
    lr = site_by_key[cfg["ledger_repo"]]
    lr_path = lr.get("local_path")
    if not (lr_path and os.path.isdir(lr_path)):
        lr_path = os.path.join(workdir, "_repos", cfg["ledger_repo"])
    ledger_file = os.path.join(lr_path, cfg["ledger_path_in_repo"])
    ledger = load(ledger_file) if os.path.isfile(ledger_file) else []

    today = date.today()
    cutoff = today - timedelta(days=7)
    linked_pairs = set()           # (src_site, src_slug, tgt_site) already connected
    pair_week = defaultdict(int)   # (src_site, tgt_site) -> count in last 7 days
    source_recent = defaultdict(int)
    target_count = defaultdict(int)
    article_pairs = set()          # frozenset({urlA, urlB}) ever linked, either direction
    for e in ledger:
        linked_pairs.add((e["source_site"], e["source_slug"], e["target_site"]))
        if e.get("source_url"):
            article_pairs.add(frozenset((e["source_url"], e["target_url"])))
        try:
            d = datetime.strptime(e["date"], "%Y-%m-%d").date()
        except Exception:
            d = today
        if d >= cutoff:
            pair_week[(e["source_site"], e["target_site"])] += 1
            source_recent[(e["source_site"], e["source_slug"])] += 1
        target_count[e["target_url"]] += 1

    by_site_lang = defaultdict(list)
    langs_of = defaultdict(set)
    for r in index:
        by_site_lang[(r["site"], r["lang"])].append(r)
        langs_of[r["site"]].add(r["lang"])
        for ts in r.get("links_to_sites", []):
            linked_pairs.add((r["site"], r["slug"], ts))

    directions = [(a, b) for a in sites for b in sites if a != b]
    start = today.toordinal() % len(directions)
    directions = directions[start:] + directions[:start]

    cap = cfg["per_ordered_pair_weekly_cap"]
    tgt_cap = cfg["max_inbound_per_target_url"]
    thresh = cfg["relevance_threshold"]
    min_len = cfg["min_source_body_len"]
    rng = random.Random(today.toordinal())
    target_n = rng.randint(cfg["daily_min"], cfg["daily_max"])

    chosen, used_sources, used_targets = [], set(), set()
    di = attempts = 0
    while len(chosen) < target_n and attempts < len(directions) * 3:
        src_site, tgt_site = directions[di % len(directions)]
        di += 1
        attempts += 1
        if pair_week[(src_site, tgt_site)] >= cap:
            continue
        best = None
        for lang in (langs_of[src_site] & langs_of[tgt_site]):
            sources = by_site_lang.get((src_site, lang), [])
            targets = by_site_lang.get((tgt_site, lang), [])
            if not targets:
                continue
            for src in sources:
                if (src_site, src["slug"]) in used_sources:
                    continue
                if (src_site, src["slug"], tgt_site) in linked_pairs:
                    continue
                if source_recent.get((src_site, src["slug"]), 0) >= 1:
                    continue
                if src["body_len"] < min_len:
                    continue
                for tgt in targets:
                    if tgt["url"] in used_targets:
                        continue
                    if target_count.get(tgt["url"], 0) >= tgt_cap:
                        continue
                    if frozenset((src["url"], tgt["url"])) in article_pairs:
                        continue  # no A<->B reciprocity between the same two articles
                    sc, tagj, ov = relevance(src, tgt)
                    if sc < thresh:
                        continue
                    if best is None or sc > best[0]:
                        best = (sc, src, tgt)
        if best is None:
            continue
        sc, src, tgt = best
        shared = sorted(set(t.lower() for t in src["tags"]) & set(t.lower() for t in tgt["tags"]))
        chosen.append({
            "source_site": src_site,
            "source_name": site_by_key[src_site]["name"],
            "source_lang": src["lang"],
            "source_slug": src["slug"],
            "source_file": src["file"],
            "source_repo_path": src["repo_path"],
            "source_title": src["title"],
            "source_url": src["url"],
            "source_voice": site_by_key[src_site].get("voice", ""),
            "target_site": tgt_site,
            "target_name": site_by_key[tgt_site]["name"],
            "target_url": tgt["url"],
            "target_title": tgt["title"],
            "target_summary": tgt["summary"],
            "target_tags": tgt["tags"],
            "relevance_score": round(sc, 3),
            "shared_tags": shared,
        })
        used_sources.add((src_site, src["slug"]))
        used_targets.add(tgt["url"])
        pair_week[(src_site, tgt_site)] += 1
        linked_pairs.add((src_site, src["slug"], tgt_site))
        article_pairs.add(frozenset((src["url"], tgt["url"])))

    out = os.path.join(workdir, "cross-link-plan.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"date": today.isoformat(), "ledger_file": ledger_file,
                   "candidates": chosen}, f, ensure_ascii=False, indent=2)

    print(f"Planned {len(chosen)} cross-links (target {target_n}) for {today.isoformat()} -> {out}")
    for c in chosen:
        print(f"  [{c['source_site']} -> {c['target_site']}] {c['source_lang']}  "
              f"{c['source_slug']}  =>  {c['target_url']}")
        print(f"      score={c['relevance_score']}  shared_tags={c['shared_tags']}")
        print(f"      src: {c['source_title']}")
        print(f"      tgt: {c['target_title']}")
    if len(chosen) < cfg["daily_min"]:
        print(f"NOTE: only {len(chosen)} candidates cleared the relevance bar "
              f"(min {cfg['daily_min']}). That is fine — quality over quota.")


if __name__ == "__main__":
    main()
