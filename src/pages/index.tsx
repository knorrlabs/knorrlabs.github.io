import React from "react";
import Layout from "@theme/Layout";
import { projects, GITHUB_ORG_URL } from "../data/projects";
import { TAGLINE } from "../data/site";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import { ArrowIcon, GitHubIcon } from "../components/Icons";
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
 * declares defaults for both, so with no JS the sheen simply sits centered.
 */

/*
 * Hero spec line. Replaces the IGNITION / KUBERNETES / GITOPS chips, which
 * restated the tagline directly above them word for word — a shape created and
 * then filled with the nearest available words, which is the loudest
 * "generated" tell a page can have.
 *
 * Every value here is verified: all three repos carry an MIT LICENSE, primary
 * languages come from the repo metadata, and 8.3 is the Ignition version
 * ignition-stack targets. Facts only, and only facts that rot slowly.
 */
const SPECS = ["MIT licensed", "Go \u00b7 Python \u00b7 TypeScript", "Built for Ignition 8.3"];


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
  // useBaseUrlUtils, not useBaseUrl: the marks are resolved inside projects.map,
  // and calling a hook in a loop violates the Rules of Hooks. This returns a
  // plain function that is safe to call per item. Needed at all because the site
  // may be served from a sub-path, where a bare /img/... would break.
  const { withBaseUrl } = useBaseUrlUtils();

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
              <a className={styles.btnPrimary} href="#projects">
                <span>See the projects</span>
                <ArrowIcon className={styles.btnArrow} />
              </a>
              <a className={styles.btnGhost} href={GITHUB_ORG_URL}>
                <GitHubIcon className={styles.btnGlyph} />
                <span>GitHub organization</span>
              </a>
            </div>

            <ul className={styles.specs}>
              {SPECS.map((spec) => (
                <li key={spec} className={styles.spec}>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
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
            {projects.map((project, i) => (
              <li
                key={project.slug}
                className={styles.gridItem}
                data-featured={i === 0 || undefined}
              >
                <a
                  className={styles.card}
                  href={project.href}
                  onPointerEnter={enterSheen}
                  onPointerMove={trackSheen}
                  onPointerLeave={clearSheen}
                >
                  <span className={styles.cardTop}>
                    {/*
                      alt="" is deliberate: the mark is decorative because
                      project.name is rendered as text inside this same anchor,
                      and a non-empty alt would announce the name twice.
                    */}
                    <span className={styles.cardMark}>
                      <img
                        className={styles.cardMarkImg}
                        src={withBaseUrl(project.mark)}
                        data-bleed={project.markBleed || undefined}
                        alt=""
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className={styles.tag}>{project.language}</span>
                  </span>
                  <span className={styles.cardRole}>{project.role}</span>
                  <span className={styles.cardName}>{project.name}</span>
                  <span className={styles.cardBlurb}>{project.situation}</span>
                  {i === 0 && project.evidence && (
                    <pre className={styles.evidence} aria-hidden="true">
                      <code>{project.evidence}</code>
                    </pre>
                  )}
                  <span className={styles.cardFoot} aria-hidden="true">
                    <span className={styles.cardFootLabel}>Documentation</span>
                    <ArrowIcon className={styles.cardArrow} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
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
                organization.
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
