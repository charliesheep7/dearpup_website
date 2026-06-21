---
name: deenup-index
description: Submit deenup.app URLs to IndexNow (Bing, Yandex, Seznam, Naver; Google honors it too) so new and updated pages get crawled fast. Fetches the live sitemap and submits, or takes a specific URL.
---

# DeenUp Index — IndexNow Submitter

Notifies participating search engines to crawl deenup.app pages via the IndexNow protocol. No Google
service account needed — IndexNow only requires the hosted key file (already set up).

**Input**: `$ARGUMENTS` is optional:

- Empty (default) → fetch the sitemap and submit ALL URLs
- `blog` → only submit `/blog/` URLs
- A specific URL (e.g. `https://www.deenup.app/blog/how-to-perform-wudu`) → submit just that URL

## Setup (already done)

- **Host**: `www.deenup.app` (canonical — `deenup.app` 307-redirects to `www`)
- **IndexNow key**: `f37b286e3ec324514aa276377d953fa4`
- **Key file**: `public/f37b286e3ec324514aa276377d953fa4.txt`, served at
  `https://www.deenup.app/f37b286e3ec324514aa276377d953fa4.txt` (proves domain ownership)

## Steps

### Step 1: Collect URLs

Unless a specific URL was passed, fetch the live sitemap and extract `<loc>` entries:

```bash
curl -sL "https://www.deenup.app/sitemap.xml"
```

Keep all URLs, or filter to `/blog/` if `$ARGUMENTS` is `blog`. If `$ARGUMENTS` is a specific URL, use
only that one. **Only submit URLs that return 200 live** — don't submit pages that aren't deployed yet
(the engine would just hit a 404). Spot-check with `curl -s -o /dev/null -w "%{http_code}"` if unsure.

### Step 2: Submit to IndexNow

IndexNow accepts up to 10,000 URLs per request — submit them in a single batch. Non-fatal on failure.

```bash
python3 - <<'PY'
import json, urllib.request, urllib.error
KEY = "f37b286e3ec324514aa276377d953fa4"
urls = [
    # one or more https://www.deenup.app/... URLs
]
payload = {"host": "www.deenup.app", "key": KEY,
           "keyLocation": f"https://www.deenup.app/{KEY}.txt",
           "urlList": urls}
req = urllib.request.Request("https://api.indexnow.org/indexnow",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json; charset=utf-8"})
try:
    r = urllib.request.urlopen(req, timeout=30)
    print(f"IndexNow: SUCCESS (HTTP {r.status}) — {len(urls)} URL(s)")
except urllib.error.HTTPError as e:
    print(f"IndexNow: FAILED (HTTP {e.code}: {e.read().decode()[:200]})")
except Exception as e:
    print(f"IndexNow: FAILED ({e})")
PY
```

**Response codes:** `200`/`202` = accepted · `400` bad request · `403` key file not found/mismatch ·
`422` URL/host mismatch · `429` rate-limited.

### Step 3: Summary

```
INDEXNOW SUBMISSION — deenup.app
URLs submitted: [N]
Status:         [SUCCESS (HTTP 200/202) | FAILED: reason]
Engines:        Bing, Yandex, Seznam, Naver (Google honors IndexNow)
```

## Notes

- The key file must stay live at the URL above — it's what the engines fetch to verify ownership.
- IndexNow accelerates _crawling_, not indexing — the page still earns indexing on its own merits.
- Submitting after deploy is best (so engines crawl a live 200 page, not a 404).
