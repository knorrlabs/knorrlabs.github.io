/**
 * The knorrlabs project manifest — the single source of truth for what
 * knorrlabs publishes.
 *
 * This file drives, in phase 1:
 *   - the project cards on the hub landing page
 *   - the "Projects" dropdown in the navbar
 *   - the "Projects" column in the footer
 *
 * In phase 2 this file moves into the shared theme package and the three
 * docs sites import it to build their own navbar and footer, which retires
 * the hand-maintained cross-links that currently drift between repos.
 *
 * Adding a project is one object here. Do not hardcode a project link
 * anywhere else.
 */

export interface Project {
  /** Repo name; also the GitHub Pages sub-path. */
  slug: string;
  /** Display name as it should appear in nav and on cards. */
  name: string;
  /**
   * Third-person description of what the project IS.
   *
   * Currently NOT rendered: the cards show `situation` instead, which says who
   * the project is for. Kept because it is the only canonical one-line
   * description of each project and phase 2's shared navbar dropdown is the
   * obvious consumer. If that does not materialize, delete it rather than
   * leaving it to rot.
   */
  blurb: string;
  /**
   * Absolute site path. These are separate Docusaurus builds, not routes of
   * this site, so links must be plain anchors that trigger a full navigation.
   */
  href: string;
  /** owner/name, for the source link. */
  repo: string;
  /** Primary language, shown as a small tag on the card. */
  language: string;
  /**
   * One-word place in the workflow: Learn -> Run -> Operate. Drives the
   * orientation band, which exists so a stranger can tell in five seconds which
   * of the three projects is theirs. Kept here rather than in a lookup table on
   * the page, so the manifest stays the only place the project list lives.
   */
  role: string;
  /** The situation a reader is in when this project is the right answer. */
  situation: string;
  /**
   * Path under static/ to the project's OWN logo.
   *
   * The hub shows real product marks, not generic line icons. A hub with no
   * visual relationship to the things it links to is precisely what makes it
   * read as generated.
   */
  mark: string;
  /**
   * True when the mark is already a disc and should fill its circular frame
   * rather than inset into it. Stoker's badge is the only one today, and it is
   * why the frame is a circle at all: it becomes the reference shape and the
   * other two inset into the same silhouette.
   */
  markBleed?: boolean;
  /**
   * A few lines of real output this project produces. Rendered on the featured
   * card only — three of these would rebuild the symmetry the layout breaks on
   * purpose.
   *
   * Every line must be true and verifiable against the repo. Invented output is
   * worse than none: it is the same failure as a keyword chip, one layer down.
   * Deliberately version-free so it rots slowly. If it stops being true, delete
   * it rather than letting it lie.
   */
  evidence?: string;
}

export const projects: Project[] = [
  {
    slug: "ignition-guides",
    name: "Ignition Guides",
    blurb:
      "Guides for running Ignition the way modern infrastructure is run — Docker, Git, Kubernetes and ArgoCD",
    href: "/ignition-guides/",
    repo: "knorrlabs/ignition-guides",
    language: "Docs",
    role: "Learn",
    situation:
      "Everything we learned putting Ignition on Git, Docker and Kubernetes, before you learn it the hard way.",
    mark: "/img/marks/guides.png",
    evidence:
      "guides/\n"
      + "  docker/            kubernetes/\n"
      + "  observability/     version-control/\n"
      + "labs/  docker \u00b7 helm \u00b7 version-control",
  },
  {
    slug: "ignition-stack",
    name: "ignition-stack",
    blurb:
      "CLI that generates ready-to-run Docker Compose stacks for Ignition 8.3 demos and SE engagements",
    href: "/ignition-stack/",
    repo: "knorrlabs/ignition-stack",
    language: "Python",
    role: "Run",
    situation:
      "One command, a running 8.3 gateway. No ticket, no VM request.",
    mark: "/img/marks/stack.svg",
    evidence:
      "$ ignition-stack create demo --arch basic\n"
      + "$ cd demo && docker compose up -d\n"
      + "\n"
      + "  gateway RUNNING \u2192 http://localhost:9088",
  },
  {
    slug: "stoker-operator",
    name: "Stoker",
    blurb:
      "Kubernetes operator that syncs Ignition gateway configuration from a Git repository",
    href: "/stoker-operator/",
    repo: "knorrlabs/stoker-operator",
    language: "Go",
    role: "Operate",
    situation:
      "You are running gateways in production and want their configuration to live in Git.",
    mark: "/img/marks/stoker.png",
    markBleed: true,
    evidence:
      "apiVersion: stoker.io/v1alpha1\n"
      + "kind: GatewaySync\n"
      + "spec:\n"
      + "  git:   { repo: ops/gateways, ref: main }\n"
      + "  sync:  { profiles: { standard: ... } }",
  },
];

export const GITHUB_ORG_URL = "https://github.com/knorrlabs";
