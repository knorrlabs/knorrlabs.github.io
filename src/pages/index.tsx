import React from "react";
import Layout from "@theme/Layout";
import { projects, GITHUB_ORG_URL } from "../data/projects";
import { TAGLINE } from "../data/site";
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
 */
export default function Home(): React.ReactElement {
  return (
    <Layout description={TAGLINE}>
      <main className={styles.main}>
        <section className={styles.intro}>
          <h1 className={styles.wordmark}>knorrlabs</h1>
          <p className={styles.lede}>{TAGLINE}</p>
        </section>

        <section className={styles.section} aria-labelledby="projects-heading">
          <h2 id="projects-heading" className={styles.sectionHeading}>
            Projects
          </h2>
          <ul className={styles.grid}>
            {projects.map((project) => (
              <li key={project.slug} className={styles.gridItem}>
                <a className={styles.card} href={project.href}>
                  <span className={styles.cardHead}>
                    <span className={styles.cardName}>{project.name}</span>
                    <span className={styles.tag}>{project.language}</span>
                  </span>
                  <span className={styles.cardBlurb}>{project.blurb}</span>
                  <span className={styles.cardGo} aria-hidden="true">
                    Documentation &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="focus-heading">
          <h2 id="focus-heading" className={styles.sectionHeading}>
            Focus
          </h2>
          <dl className={styles.focus}>
            <div className={styles.focusItem}>
              <dt>Ignition platform tooling</dt>
              <dd>Deploying and operating gateways the GitOps way.</dd>
            </div>
            <div className={styles.focusItem}>
              <dt>Kubernetes operators and CLIs</dt>
              <dd>
                Turning manual stack setup into declarative, repeatable
                workflows.
              </dd>
            </div>
            <div className={styles.focusItem}>
              <dt>Documentation</dt>
              <dd>
                Treating DevOps and GitOps for industrial systems as a
                first-class concern.
              </dd>
            </div>
          </dl>
        </section>

        <section className={styles.section}>
          <a className={styles.allRepos} href={GITHUB_ORG_URL}>
            All repositories on GitHub &rarr;
          </a>
        </section>
      </main>
    </Layout>
  );
}
