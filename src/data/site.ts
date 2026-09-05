/**
 * Site-level constants that are not colours and not the project list.
 */

/**
 * Cloudflare Web Analytics beacon token.
 *
 * Left empty deliberately. The beacon is only injected when this is a
 * non-empty string, so the site ships with no third-party script until a
 * token is pasted in. Get one from the Cloudflare dashboard under
 * Analytics & Logs -> Web Analytics -> Add a site (knorrlabs.dev).
 *
 * Grey-clouded DNS means Cloudflare cannot see this traffic server-side,
 * so the JS beacon is the only way to collect anything.
 */
export const CLOUDFLARE_ANALYTICS_TOKEN = '';

export const TAGLINE =
  'An independent lab for developer and infrastructure tooling, with a focus on Ignition, Kubernetes, and GitOps.';
