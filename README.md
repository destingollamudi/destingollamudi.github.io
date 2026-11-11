# destingollamudi.xyz

My personal site. React + Vite + Tailwind, deployed as static files to GitHub
Pages behind a custom domain.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run lint
npm run now      # refresh the "Currently" feeds locally (see below)
```

## Where the content lives

No copy is hardcoded in a component. Everything the site says comes from
`src/data/`:

| File | What it holds |
| --- | --- |
| `site.js` | Name, tagline, intro, nav, social links, Formspree endpoint |
| `currently.js` | The "Currently" card — hand-written lines + feed merge logic |
| `workExperience.js` | Jobs |
| `education.js` | School |
| `projects.js` | Projects, including the `why` / `roadblock` notes |
| `gallery.js` | "Behind the scenes" photos and captions |
| `uses.js` | The `/#/uses` page |
| `now.generated.json` | **Generated.** Do not edit — CI overwrites it. |

To update the site, edit a data file. That's the whole point — the previous
version buried every string in JSX and went a year without an update.

## The "Currently" strip

The three live rows (last played / reading / last watched) are fetched
**at build time by CI**, not in the browser:

- **Letterboxd** has no public API. Its per-user RSS works, but sends no CORS
  headers, so a browser `fetch` is blocked.
- **Goodreads** stopped issuing API keys in Dec 2020. Shelf RSS still works and
  is likewise CORS-blocked.
- **Apple Music** (MusicKit) needs a developer token — a JWT signed with a
  private `.p8` key — plus a Music User Token for anything personal. That
  can't run in static JS (it would hand every visitor the signing key), but
  it's not actually blocked otherwise: CI signs the token fresh on every run
  (`scripts/lib/apple-music-token.mjs`, ES256 via Node's built-in `crypto`,
  no JWT dependency needed) and calls the API the same way the other two
  fetches do. The one genuine limitation: Apple's API has no live
  "currently playing" endpoint — unlike Spotify, this is always *last*
  played, never truly live.

`scripts/fetch-now.mjs` reads those feeds server-side and writes
`src/data/now.generated.json`. `.github/workflows/deploy.yml` runs it on a
6-hourly cron, commits the result, rebuilds, and redeploys. Any source that is
unconfigured or failing is skipped — the previous value is kept, and the card
falls back to the hardcoded strings in `currently.js`. A dead feed can never
blank the card or fail the build.

### Setting up Apple Music (real data, one-time setup)

Requires an **Apple Developer Program membership ($99/yr)** — that's the
actual cost of this, not a workaround. Once you have one:

1. **developer.apple.com → Certificates, IDs & Profiles → Keys** → create a
   key with **MusicKit** enabled. Download the `.p8` file (Apple only lets
   you download it once) and note the **Key ID**. Your **Team ID** is on the
   account's Membership page.
2. In **Settings → Secrets and variables → Actions**, add:
   - variables `APPLE_MUSIC_TEAM_ID`, `APPLE_MUSIC_KEY_ID` — not secret; both
     travel inside the JWT itself (base64, not encrypted), so hiding them
     here buys nothing.
   - secret `APPLE_MUSIC_PRIVATE_KEY` — the full contents of the `.p8` file.
3. **Get your Music User Token** (one-time, must happen in a real browser —
   see the comment at the top of `scripts/apple-music-authorize.html` for
   why this step can't be scripted):
   ```
   APPLE_MUSIC_TEAM_ID=... APPLE_MUSIC_KEY_ID=... \
   APPLE_MUSIC_PRIVATE_KEY_PATH=./AuthKey_XXXX.p8 \
   npm run apple-music-token
   ```
   Serve `scripts/apple-music-authorize.html` locally (`npx serve scripts`,
   not `file://`), paste in that token, click Connect, sign in with the
   Apple ID that has your subscription, and copy the Music User Token it
   shows you into the secret `APPLE_MUSIC_USER_TOKEN`.
4. Run the **Build & deploy** workflow manually once.

If the Music User Token is ever revoked, the fetch just falls back to
Last.fm (if set up) or the previous snapshot — it won't break the build.
Repeat step 3 to reconnect.

### Last.fm (fallback, no developer account needed)

Used automatically if Apple Music isn't configured, or if an Apple Music call
fails. Apple Music scrobbles into Last.fm, so this still reflects what you're
actually listening to — it just can't see Apple's catalog data directly.

Repository **variables**: `LETTERBOXD_USER`, `GOODREADS_USER_ID`, `LASTFM_USER`
Repository **secret**: `LASTFM_API_KEY` — from https://www.last.fm/api/account/create

Until feeds are connected, the card shows its fallback text and says
"feeds not connected yet".

## Deployment

GitHub Pages serves this site from the **`gh-pages` branch**, not from `main`.
Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
force-pushes `dist/` to `gh-pages`.

Two things that must not drift:

- `vite.config.js` must keep `base: '/'`. A repo-scoped base silently breaks
  every asset URL on the custom domain.
- `public/CNAME` must stay. It's what puts `www.destingollamudi.xyz` into the
  deployed output; without it a deploy wipes the custom domain off the branch.

`npm run deploy` does the same thing manually via the `gh-pages` package.

## Routing

`/#/uses` is a hash route (`src/hooks/useHashRoute.js`). Hash routing means a
direct link or a refresh can't 404 on static hosting, which a real `/uses` path
would without a `404.html` redirect hack.
