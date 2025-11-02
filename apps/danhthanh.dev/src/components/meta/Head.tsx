import NextHead from 'next/head';

import useCurrentUrl from '@/hooks/useCurrentUrl';

interface HeadProps {
  title: string;
  description: string;
  ogImage: string;
  overrideTitle?: boolean;
  structuredData?: string;
}

function Head({
  title,
  description,
  ogImage,
  overrideTitle = false,
  structuredData = '',
}: HeadProps) {
  const currentUrl = useCurrentUrl();

  const htmlTitle = overrideTitle
    ? title
    : `${title} — Thanh · Front-End Developer`;

  return (
    <NextHead>
      <title>{htmlTitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      {/* seo */}
      <link rel="canonical" href={currentUrl} />

      {/* og image */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`Image with "${title}" text.`} />
      <meta property="og:site_name" content="danhthanh.dev" />
      <meta property="og:url" content={currentUrl} />

      {/* twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@danhthanh418" />
      <meta name="twitter:creator" content="@danhthanh418" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`Image with "${title}" text.`} />

      {/* pinterest meta */}
      <meta property="article:author" content="danhthanh418" />
      <meta name="pinterest-rich-pin" content="true" />

      {/* structured data */}
      {structuredData && (
        <script type="application/ld+json">{structuredData}</script>
      )}
    </NextHead>
  );
}

export default Head;
