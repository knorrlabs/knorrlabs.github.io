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
      "You are moving Ignition onto Git, Docker and Kubernetes and want the practices first.",
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
      "You need a working Ignition stack on your own machine today, not next week.",
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
  },
];

export const GITHUB_ORG_URL = "https://github.com/knorrlabs";
