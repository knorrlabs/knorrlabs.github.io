# knorrlabs.github.io

The landing page and project index for [knorrlabs](https://github.com/knorrlabs),
served at **https://knorrlabs.dev**.

This is the organization's *root* GitHub Pages site. That matters more than it
looks: setting a custom domain on this repo cascades to every project site in
the org, so the three docs sites move to sub-paths of the same domain and their
old URLs redirect permanently, with no proxy, rewrite rules or redirect config
anywhere.

| URL | Repo |
| --- | --- |
| `knorrlabs.dev/` | this repo |
| `knorrlabs.dev/ignition-guides/` | [ignition-guides](https://github.com/knorrlabs/ignition-guides) |
| `knorrlabs.dev/ignition-stack/` | [ignition-stack](https://github.com/knorrlabs/ignition-stack) |
| `knorrlabs.dev/stoker-operator/` | [stoker-operator](https://github.com/knorrlabs/stoker-operator) |

`knorrlabs.github.io/**` issues a permanent redirect to `knorrlabs.dev/**` with
the path preserved.

## Adding a project

Edit [`src/data/projects.ts`](src/data/projects.ts) and add one object. That file
is the single source of truth: it drives the landing page cards, the navbar
"Projects" dropdown and the footer. Do not hardcode a project link anywhere else.

## Local development

```bash
npm install
npm start        # dev server on :3000
npm run build    # production build into ./build
npm run serve    # serve the production build
npm run typecheck
```

## Design system

The palette lives in [`src/css/custom.css`](src/css/custom.css) and follows one
rule:

- **hue 214 (navy to slate) is static content** — headings, body, muted text,
  borders, chrome
- **hue 188 (teal) is interaction, and nothing else** — if it is teal, you can
  click it

Slate is not a competing color; at hue 215.3 it is the brand navy (214.3) with
the chroma drained out, so it is the low-chroma end of the same ramp.

Two things are easy to get wrong:

- `--knorr-border` is decorative only (1.19:1 light, 1.42:1 dark). Anywhere a
  border is the *only* delimiter of an interactive control, use
  `--knorr-border-strong` (3.0:1+), as the project cards do. WCAG 1.4.11.
- In dark mode `--ifm-link-hover-color` must be overridden to
  `--ifm-color-primary-light`. Infima defaults it to `-darker`, which is correct
  in light mode but makes links *dimmer* on hover in dark.

In phase 2 this palette and `projects.ts` move into a shared theme package that
the three docs sites consume, which is what retires their hand-maintained
cross-links.

## Analytics

`src/data/site.ts` holds `CLOUDFLARE_ANALYTICS_TOKEN`, empty by default. The
Cloudflare Web Analytics beacon is only emitted when it is a non-empty string, so
the site ships with no third-party script until a token is set. DNS is
grey-clouded, so Cloudflare cannot see this traffic server-side and the JS beacon
is the only way to collect anything.

## Deployment

Pushes to `main` build and deploy via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Pages must be set to **Build and deployment: GitHub Actions**.

The `CNAME` file is written by GitHub when the custom domain is set in repo
settings; it is deliberately not committed here.
