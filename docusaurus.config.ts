import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { projects, GITHUB_ORG_URL } from "./src/data/projects";
import { CLOUDFLARE_ANALYTICS_TOKEN, TAGLINE } from "./src/data/site";

// The hub is the organisation root Pages site. Setting a custom domain on THIS
// repo cascades to every project site in the org, which is what moves
// knorrlabs.github.io/<repo>/ to knorrlabs.dev/<repo>/ and 301s the old URLs.
//
// url is already the final home even though the first deploy lands on
// knorrlabs.github.io: this site is new and unindexed, so pointing canonical at
// knorrlabs.dev from the start avoids a second edit at cutover. baseUrl is "/"
// under both hostnames, so nothing about the build changes on flip day.
const config: Config = {
  title: "knorrlabs",
  tagline: TAGLINE,
  favicon: "img/logo.png",

  url: "https://knorrlabs.dev",
  baseUrl: "/",

  organizationName: "knorrlabs",
  projectName: "knorrlabs.github.io",

  future: {
    v4: true,
  },

  // "warn", not "throw", and for one specific reason: the project links point at
  // /ignition-guides/, /ignition-stack/ and /stoker-operator/, which are separate
  // Docusaurus builds served from sub-paths of the same domain. This build has no
  // knowledge of them, so the link checker flags every one as broken.
  //
  // Root-relative paths are the only form that is correct under BOTH hostnames —
  // they resolve during staging at knorrlabs.github.io and after the cutover at
  // knorrlabs.dev, with no edit in between. Writing them as absolute
  // https://knorrlabs.dev/... URLs would satisfy the checker but would break
  // staging, since the domain is not live until flip day.
  //
  // The cost is low: this site is a single page with no internal doc links, so
  // the checker has essentially nothing else to catch. Revisit if the hub ever
  // grows real internal routes.
  onBrokenLinks: "warn",
  onBrokenAnchors: "throw",

  headTags: [
    {
      // Sets data-theme before React hydrates so there is no flash of the wrong
      // theme: stored choice if there is one, otherwise the system preference.
      // This now agrees with colorMode.respectPrefersColorScheme below — the two
      // must stay in sync or the pre-hydrate paint and the hydrated state differ
      // and the page visibly flips on load.
      //
      // Deliberately identical to the script in ignition-guides, storage key
      // included: all four sites share the knorrlabs.dev origin, so they share
      // localStorage, and a matching key means the reader's choice carries
      // across the hub and every docs site.
      tagName: "script",
      attributes: {},
      innerHTML: `(function(){try{var s=localStorage.getItem('theme-cdb');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
    },
    // Cloudflare Web Analytics. Only emitted once a token is set in
    // src/data/site.ts, so the default build ships no third-party script.
    ...(CLOUDFLARE_ANALYTICS_TOKEN
      ? [
          {
            tagName: "script",
            attributes: {
              defer: "true",
              src: "https://static.cloudflareinsights.com/beacon.min.js",
              "data-cf-beacon": `{"token":"${CLOUDFLARE_ANALYTICS_TOKEN}"}`,
            },
          },
        ]
      : []),
  ],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logo.png",
    metadata: [
      { name: "description", content: TAGLINE },
      { property: "og:description", content: TAGLINE },
    ],
    navbar: {
      title: "knorrlabs",
      logo: {
        alt: "knorrlabs",
        src: "img/logo.png",
      },
      items: [
        {
          type: "dropdown",
          label: "Projects",
          position: "left",
          // Generated from the manifest. Phase 2 ships this same dropdown on
          // all three docs sites so a reader can cross between projects without
          // returning to the hub.
          items: [
            ...projects.map((p) => ({ label: p.name, href: p.href })),
            { label: "All repositories", href: GITHUB_ORG_URL },
          ],
        },
        {
          href: GITHUB_ORG_URL,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Projects",
          items: projects.map((p) => ({ label: p.name, href: p.href })),
        },
        {
          title: "Organisation",
          items: [
            { label: "GitHub", href: GITHUB_ORG_URL },
            {
              label: "Contributing",
              href: "https://github.com/knorrlabs/.github/blob/main/CONTRIBUTING.md",
            },
            {
              label: "Security policy",
              href: "https://github.com/knorrlabs/.github/blob/main/SECURITY.md",
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} knorrlabs`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "yaml"],
    },
    colorMode: {
      // System preference is the default. respectPrefersColorScheme makes
      // Docusaurus follow prefers-color-scheme when the visitor has not made an
      // explicit choice; defaultMode is only the fallback for browsers that
      // report no preference at all. The toggle still wins once used, and that
      // choice is stored per-origin — which, because all four knorrlabs sites
      // share knorrlabs.dev, means it carries across the hub and every docs site.
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
