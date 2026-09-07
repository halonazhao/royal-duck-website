# Royal Duck website and event admin

The public website remains static. Staff edit JSON event records with Decap CMS, save drafts to GitHub, and review automatically deployed staging previews. Only Halona can trigger the production publication workflow from the protected `main` branch.

## Locations

- Admin and staging: https://little-river-fc26.halona-zhao.workers.dev/admin/
- Production: https://www.royalduckusa.com
- Repository: https://github.com/halonazhao/royal-duck-website (private)
- Cloudflare account: `ebc0b4333cda21b22deca8e42ad8a56d`
- Existing staging Worker: `little-river-fc26`
- Existing production Worker: `long-band-f777`

These are Workers with Static Assets, not Cloudflare Pages projects. `wrangler.staging.jsonc` and `wrangler.production.jsonc` retain their existing names and production custom domains.

## Staff workflow

1. Open `/admin/` and sign in with your invited GitHub account.
2. Open Events. Create an event, duplicate a previous one with a new unique ID, or edit an existing record. Keep an existing event ID unchanged so its ticket links stay valid.
3. Enter venue details, venue-local dates and time zone, opening hours, images, and optional Spanish translations. Blank Spanish fields fall back to English. Use ordinary text and newlines; HTML is displayed as text.
4. Copy the location's booking widget from Checkfront. Paste it in Checkfront checkout and click **Import checkout settings**. Check **Preview checkout** and verify the correct venue. The preview uses real availability; do not complete a test purchase.
5. Save a draft. The CMS creates a `cms/events/...` branch and pull request. A successful deployment attaches a preview link to that commit. The fixed staging URL shows the most recently deployed draft; the commit-specific preview remains associated with that saved revision.
6. Mark it ready for review. Halona reviews the preview and the pull request. Changes are not public until approved and published.

The collection hides CMS Publish and Delete controls. To remove a card, set Visibility to Archive and save for review. Visibility is separate from upcoming/live/ended, which follows venue dates automatically.

## Owner publication

Configure `main` branch protection with required CODEOWNER approval by `@halonazhao`, required **Validate event content** check, dismissed stale approvals, no force pushes, no direct pushes, and enforcement for administrators. Only the owner should have repository administration access. Invite staff only after these protections are confirmed.

For staff changes, review and merge the pull request. Then open **Actions → Publish production (Halona only) → Run workflow → main**. Running this workflow is your explicit production approval. Both the initial actor and rerun actor must be `halonazhao`. The production environment allows only protected branches. GitHub's separate required-environment-reviewer feature is not supported by the current billing plan for this private repository; this implementation uses the owner-triggered publish workflow instead.

Owner-authored changes cannot be self-approved as a GitHub pull request. Assign another trusted code owner/reviewer if you want owner-authored code changes to use the same review rule; don't weaken protection for routine staff edits.

The build embeds that exact commit's content into the static deployment; the public site never reads mutable CMS drafts. `release.json` identifies the deployed source commit. For rollback, use the previous production Worker version in Cloudflare's Deployments screen; a content correction can also go through the same draft/review workflow. The pre-CMS production version recorded during setup is `ffa4ada5-20dc-4236-8edd-c5c63ceda1e3`.

## Local development

```sh
npm ci
npm test
npm run dev
```

Open http://localhost:8788/home and http://localhost:8788/admin/. The CMS uses the real GitHub backend; local development does not create a fake successful login. OAuth login is hosted on the stable staging origin. Build output is `dist/`; opening the source folder directly does not compile event content.

`npm run deploy:staging` builds and deploys staging with your local Cloudflare login. Production publication is intentionally available only through the GitHub workflow. Source content, credentials, and the dependency tree are excluded from the public build.

## One-time account setup

1. Register a GitHub OAuth app at https://github.com/settings/applications/new:
   - Name: Royal Duck Event Admin
   - Homepage: `https://little-river-fc26.halona-zhao.workers.dev/admin/`
   - Callback: `https://little-river-fc26.halona-zhao.workers.dev/api/auth/callback`
2. Add the app's Client ID and Client Secret to staging with the interactive commands below. Do not commit secrets or paste them in chat.

```sh
npx wrangler secret put GITHUB_CLIENT_ID --config wrangler.staging.jsonc
npx wrangler secret put GITHUB_CLIENT_SECRET --config wrangler.staging.jsonc
```

3. Add a Cloudflare API token with Account → Workers Scripts → Edit for this Cloudflare account to the GitHub **staging** environment as `CLOUDFLARE_API_TOKEN`. Add the production token to the **production** environment with the same secret name. Configure and verify the main branch protections and environment branch restrictions before adding CI credentials or inviting staff. Cloudflare's account-scoped Workers token can affect other Workers in the account, so only trusted maintainers should edit workflow code or manage these secrets.
4. Set the repository Actions variable `DEPLOYMENTS_ENABLED` to `true` after configuration. Use **Deploy staging → Run workflow** to verify the first automatic upload. The production workflow must be triggered separately by Halona.
5. Invite the intended staff GitHub accounts with Write access. Verify a staff draft creates a preview, cannot merge without your review, and cannot run production successfully.

GitHub OAuth uses the `repo` scope required by Decap's GitHub backend. The server checks write access to this particular repository before returning a login token. The OAuth client secret stays on Cloudflare; the staff member's OAuth token is used by Decap in their browser to save content to GitHub.

## Content implementation

`content/events/*.json` is the source of truth for cards, hours, announcements, card styles, and Checkfront settings. `scripts/build.mjs` validates the records, packages public content into `dist/events-data.js`, and generates the per-event checkout HTML through one shared template. Hidden and archived records and their checkout pages are excluded. The original `checkfronts/` files are retained as migration fixtures but are not copied into builds.

All 23 original records were migrated. The 12 existing Checkfront category mappings and Oakland's initial booking date were retained. The other 11 older events had no local embed file, so booking is disabled until a valid configuration is supplied. Niagara's original `assets/blue_card.png` reference pointed to a missing file; a simple local blue SVG background replaces it. English and Spanish hours and MainPlace's adult-night notice now live in their event records.

Automation validates field formats and configuration; it cannot establish whether a valid Checkfront category belongs to the intended venue. Verify this in the checkout preview before approving.
