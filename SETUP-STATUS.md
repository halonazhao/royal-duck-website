# Setup status — September 7, 2026

## Completed

- Created the private repository `halonazhao/royal-duck-website` and preserved the original site in the initial commit.
- Migrated all 23 events to editable content, preserved 12 existing Checkfront mappings, and added the CMS, import widget, previews, and OAuth handler.
- Deployed the implementation to `little-river-fc26` at https://little-river-fc26.halona-zhao.workers.dev. Verified the homepage, ticket page, admin files, checkout mapping, and deployed event count over HTTP.
- Confirmed content source and GitHub workflow files return 404 from the public staging deployment.
- Added validation, staging, and owner-triggered production workflows. GitHub validation passes.
- Created GitHub staging and production environments. The production environment is configured to allow protected branches.

## Pending account setup

- **Main is not protected yet.** GitHub returned HTTP 403: “Upgrade to GitHub Pro or make this repository public to enable this feature.” Keep the repository private unless Halona explicitly chooses otherwise. Do not invite staff or enable deployments before protection is active.
- GitHub's required environment reviewers were also rejected under the current plan. Publication uses a manual workflow restricted to Halona, paired with protected main and required CODEOWNER review once available.
- **CMS login is not connected yet.** Register the GitHub OAuth app described in README and set staging secrets `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`. The auth endpoint intentionally returns 503 until these are configured.
- **Automatic deployments are not enabled yet.** Create a Cloudflare API token and store it as `CLOUDFLARE_API_TOKEN` in each GitHub environment, then enable `DEPLOYMENTS_ENABLED`. The locally authorized Wrangler OAuth login works for local staging deploys but is not a durable CI credential; its token was not copied to GitHub. Attempting to inspect API-token permissions with the OAuth session returned HTTP 403, so a token must be created by the account owner.
- No staff accounts have been invited; staff usernames still need to be supplied.
- Browser automation was unavailable. DOM integration tests and deployed HTTP checks passed, but visual browser QA and the real GitHub login/save-draft/publish flow await account setup.

After resolving the repository plan/visibility choice, run `node scripts/configure-github.mjs` to apply and verify the configured review rules. Then complete credentials, test a staff draft and its preview, and obtain Halona's review before the first production publication.

## Production

No production deployment was performed. The existing version remains `ffa4ada5-20dc-4236-8edd-c5c63ceda1e3`. Existing custom domains are retained in the production configuration.
