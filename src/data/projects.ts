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
  /** One line, sentence case, no trailing period. Used on cards. */
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
}

export const projects: Project[] = [
  {
    slug: 'ignition-guides',
    name: 'Ignition Guides',
    blurb:
      'Guides for running Ignition the way modern infrastructure is run — Docker, Git, Kubernetes and ArgoCD',
    href: '/ignition-guides/',
    repo: 'knorrlabs/ignition-guides',
    language: 'Docs',
  },
  {
    slug: 'ignition-stack',
    name: 'ignition-stack',
    blurb:
      'CLI that generates ready-to-run Docker Compose stacks for Ignition 8.3 demos and SE engagements',
    href: '/ignition-stack/',
    repo: 'knorrlabs/ignition-stack',
    language: 'Python',
  },
  {
    slug: 'stoker-operator',
    name: 'Stoker',
    blurb:
      'Kubernetes operator that syncs Ignition gateway configuration from a Git repository',
    href: '/stoker-operator/',
    repo: 'knorrlabs/stoker-operator',
    language: 'Go',
  },
];

export const GITHUB_ORG_URL = 'https://github.com/knorrlabs';
