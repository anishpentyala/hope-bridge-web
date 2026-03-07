import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'HopeBridge';
const DEFAULT_DESCRIPTION =
  'HopeBridge is a youth-led nonprofit creating culturally informed mental health support for Asian American teens. Free programs, peer mentorship, and school partnerships in the greater Seattle area.';
const DEFAULT_IMAGE = 'https://hopebridgeservices.org/bridge-icon.svg';
const SITE_URL = 'https://hopebridgeservices.org';

/**
 * SEOHead — inject per-page <title> and <meta> tags into <head>.
 *
 * Props:
 *   title        — page-specific title (appended with " | HopeBridge")
 *   description  — page-specific meta description (≤160 chars recommended)
 *   path         — URL path, e.g. "/about" (used to build canonical + og:url)
 *   image        — absolute URL to a social-share image (optional)
 *   noIndex      — pass true to add <meta name="robots" content="noindex">
 */
export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = DEFAULT_IMAGE,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Asian American Teen Mental Health`;
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
