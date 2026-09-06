import React from "react";
import Layout from "@theme/Layout";
import { projects, GITHUB_ORG_URL } from "../data/projects";
import { TAGLINE } from "../data/site";
import {
  ArrowIcon,
  GitHubIcon,
  StackIcon,
  projectIcons,
} from "../components/Icons";
import styles from "./index.module.css";

/**
 * The hub landing page.
 *
 * Cards are plain anchors, not Docusaurus <Link>, on purpose: each project is a
 * separate Docusaurus build served from a sub-path of the same domain, not a
 * route of this site. A client-side route transition would 404.
 *
 * The whole card is the anchor, so there is no nested link inside it. Source
 * links live in the footer instead.
 *
 * Everything below renders correctly with JavaScript disabled. The only script
 * is the pointer-sheen handler, which sets two CSS custom properties; the CSS
 * declares defaults for both, so with no JS the sheen simply sits centred.
 */

const DOMAINS = ["Ignition", "Kubernetes", "GitOps"];

const FOCUS = [
  {
    title: "Ignition platform tooling",
    body: "Deploying and operating gateways the GitOps way, so a stack is described in a repository rather than clicked together by hand.",
  },
  {
    title: "Kubernetes operators and CLIs",
    body: "Turning manual stack setup into declarative, repeatable workflows that a team can review, roll back and reproduce.",
  },
  {
    title: "Documentation",
    body: "Treating DevOps and GitOps for industrial systems as a first-class concern rather than an afterthought bolted on at the end.",
  },
];

/**
 * Tracks the pointer inside a card so the hover sheen follows it.
 *
 * Deliberately not stateful: writing straight to the element's inline custom
 * properties keeps this off the React render path, and there is nothing to
 * hydrate because the CSS supplies fallbacks for both properties.
 *
 * The element's rect is measured once on enter and cached, not read per move.
 * getBoundingClientRect forces a synchronous layout, and pointermove fires at
 * roughly display rate, so measuring in the move handler would thrash layout
 * for the entire time a pointer rests on a card.
 */
const rects = new WeakMap<HTMLElement, DOMRect>();

function enterSheen(event: React.PointerEvent<HTMLElement>): void {
  rects.set(event.currentTarget, event.currentTarget.getBoundingClientRect());
}

function trackSheen(event: React.PointerEvent<HTMLElement>): void {
  const el = event.currentTarget;
  // Fall back to measuring if enter never fired — e.g. a pointer already inside
  // the element when the page hydrates.
  const rect = rects.get(el) ?? el.getBoundingClientRect();
  el.style.setProperty(
    "--px",
    `${((event.clientX - rect.left) / rect.width) * 100}%`,
  );
  el.style.setProperty(
    "--py",
    `${((event.clientY - rect.top) / rect.height) * 100}%`,
  );
}

function clearSheen(event: React.PointerEvent<HTMLElement>): void {
  const el = event.currentTarget;
  rects.delete(el);
  el.style.removeProperty("--px");
  el.style.removeProperty("--py");
}

export default function Home(): React.ReactElement {
  return (
    <Layout description={TAGLINE}>
      <main className={styles.main}>
        {/* ---------------- hero ---------------- */}
        <section className={styles.hero}>
          <div className={styles.heroField} aria-hidden="true" />
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Independent engineering lab</p>
            <h1 className={styles.wordmark}>knorrlabs</h1>
            <div className={styles.keyline} aria-hidden="true" />
            <p className={styles.lede}>{TAGLINE}</p>

            <div className={styles.actions}>
              <a className={styles.btnPrimary} href="#start">
                <span>Find the right project</span>
                <ArrowIcon className={styles.btnArrow} />
              </a>
              <a className={styles.btnGhost} href={GITHUB_ORG_URL}>
                <GitHubIcon className={styles.btnGlyph} />
                <span>GitHub organisation</span>
              </a>
            </div>

            <ul className={styles.domains}>
              {DOMAINS.map((domain) => (
                <li key={domain} className={styles.domain}>
                  {domain}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- orientation ---------------- */}
        {/*
          The five-second question: which of these three is mine? Answered as a
          Learn -> Run -> Operate progression, so the card grid below reads as
          the parts of one toolkit rather than three unrelated links. Role and
          situation both come from the manifest, so this stays one list.
        */}
        <section
          id="start"
          className={styles.section}
          aria-labelledby="start-heading"
        >
          <header className={styles.sectionHead}>
            <h2 id="start-heading" className={styles.sectionTitle}>
              Start here
            </h2>
            <span className={styles.sectionRule} aria-hidden="true" />
            <span className={styles.sectionMeta}>Which one is yours</span>
          </header>

          <ol className={styles.routes}>
            {projects.map((project) => (
              <li key={project.slug}>
                <a
                  className={styles.route}
                  href={project.href}
                  onPointerEnter={enterSheen}
                  onPointerMove={trackSheen}
                  onPointerLeave={clearSheen}
                >
                  <span className={styles.routeRole}>{project.role}</span>
                  <span className={styles.routeSituation}>
                    {project.situation}
                  </span>
                  <span className={styles.routeTarget}>
                    {project.name}
                    <ArrowIcon className={styles.routeArrow} />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------- projects ---------------- */}
        <section
          id="projects"
          className={styles.section}
          aria-labelledby="projects-heading"
        >
          <header className={styles.sectionHead}>
            <h2 id="projects-heading" className={styles.sectionTitle}>
              Projects
            </h2>
            <span className={styles.sectionRule} aria-hidden="true" />
            <span className={styles.sectionMeta}>
              {projects.length} published
            </span>
          </header>

          <ul className={styles.grid}>
            {projects.map((project) => {
              const Icon = projectIcons[project.slug] ?? StackIcon;
              return (
                <li key={project.slug} className={styles.gridItem}>
                  <a
                    className={styles.card}
                    href={project.href}
                    onPointerEnter={enterSheen}
                    onPointerMove={trackSheen}
                    onPointerLeave={clearSheen}
                  >
                    <span className={styles.cardTop}>
                      <span className={styles.cardWell}>
                        <Icon className={styles.cardIcon} />
                      </span>
                      <span className={styles.tag}>{project.language}</span>
                    </span>
                    <span className={styles.cardName}>{project.name}</span>
                    <span className={styles.cardBlurb}>{project.blurb}</span>
                    <span className={styles.cardFoot} aria-hidden="true">
                      <span className={styles.cardFootLabel}>Documentation</span>
                      <ArrowIcon className={styles.cardArrow} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ---------------- focus ---------------- */}
        <section className={styles.section} aria-labelledby="focus-heading">
          <header className={styles.sectionHead}>
            <h2 id="focus-heading" className={styles.sectionTitle}>
              Focus
            </h2>
            <span className={styles.sectionRule} aria-hidden="true" />
            <span className={styles.sectionMeta}>What the work is about</span>
          </header>

          <div className={styles.strata}>
            <ol className={styles.strataList}>
              {FOCUS.map((item, i) => (
                <li key={item.title} className={styles.stratum}>
                  <span className={styles.stratumIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.stratumTitle}>{item.title}</h3>
                  <p className={styles.stratumBody}>{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- outro ---------------- */}
        <section className={styles.section} aria-labelledby="source-heading">
          <div className={styles.outro}>
            <div className={styles.outroText}>
              <h2 id="source-heading" className={styles.outroTitle}>
                Everything is open source
              </h2>
              <p className={styles.outroBody}>
                Source, issues and releases for every project live in one GitHub
                organisation.
              </p>
            </div>
            <a
              className={styles.btnGhost}
              href={GITHUB_ORG_URL}
              onPointerEnter={enterSheen}
              onPointerMove={trackSheen}
              onPointerLeave={clearSheen}
            >
              <GitHubIcon className={styles.btnGlyph} />
              <span>All repositories</span>
              <ArrowIcon className={styles.btnArrow} />
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
