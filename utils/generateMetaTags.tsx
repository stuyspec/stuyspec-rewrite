export function generateMetaTags(
  page_title: string,
  meta_description: string,
  meta_url: string,
  cover_image?: string,
) {
  return (
    <>
      <title>{page_title}</title>
      {/* Meta tags must have keys so that NextJS can override/remove duplicate meta tags */}
      <meta name="title" content={page_title} key="title" />
      <meta name="description" content={meta_description} key="description" />
      {/* Open Graph / Facebook  */}
      {/* Docs of the standard: https://ogp.me/ */}
      <meta property="og:type" content="website" key="og_website" />
      <meta property="og:url" content={meta_url} key="og_url" />
      <meta property="og:title" content={page_title} key="og_title" />
      <meta
        property="og:description"
        content={meta_description}
        key="og_description"
      />
      {cover_image && <meta property="og:image" content={cover_image} />}

      {/* Twitter */}
      <meta property="twitter:url" content={meta_url} key="twitter_url" />
      <meta property="twitter:title" content={page_title} key="twitter_title" />
      <meta
        property="twitter:description"
        content={meta_description}
        key="twitter_description"
      />
      {cover_image && (
        <meta property="twitter:card" content="summary_large_image" />
      )}

      {cover_image && (
        <meta
          property="twitter:image"
          content={cover_image}
          key="twitter_image"
        />
      )}
    </>
  );
}
