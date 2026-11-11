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
**at build time by CI**, not in the browser. Three reasons, all unavoidable:

- **Letterboxd** has no public API. Its per-user RSS works, but sends no CORS
  headers, so a browser `fetch` is blocked.
- **Goodreads** stopped issuing API keys in Dec 2020. Shelf RSS still works and
  is likewise CORS-blocked.
- **Apple Music** (MusicKit) requires a developer token — a JWT signed with a
  private `.p8` key, plus a Music User Token for anything personal. There is no
  server here to hide that key in, so it can't be done from static JS.
  **Last.fm** is the stand-in: Apple Music scrobbles into it, and a read-only
  API key is safe in CI.

`scripts/fetch-now.mjs` reads those feeds server-side and writes
`src/data/now.generated.json`. `.github/workflows/deploy.yml` runs it on a
6-hourly cron, commits the result, rebuilds, and redeploys. Any source that is
unconfigured or failing is skipped — the previous value is kept, and the card
falls back to the hardcoded strings in `currently.js`. A dead feed can never
blank the card or fail the build.

### Connecting the feeds

In **Settings → Secrets and variables → Actions**:

Repository **variables**:

| Name | Value |
| --- | --- |
| `LETTERBOXD_USER` | Your Letterboxd username |
| `GOODREADS_USER_ID` | The number in your Goodreads profile URL |
| `LASTFM_USER` | Your Last.fm username |

Repository **secret**:

| Name | Value |
| --- | --- |
| `LASTFM_API_KEY` | From https://www.last.fm/api/account/create |

Then run the **Build & deploy** workflow manually once to populate the snapshot.
Until all four are set the card shows its fallback text and says
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
