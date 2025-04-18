import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogUrl,
  canonicalUrl,
  article = false,
  publishedTime,
  modifiedTime,
  author,
  tags = []
}) => {
  const defaultTitle = "Family Balance - Naturalne Suplementy Diety";
  const defaultDescription = "Odkryj wysokiej jakości naturalne suplementy diety Family Balance. Wspieramy Twoje zdrowie poprzez starannie dobrane składniki i innowacyjne formuły.";
  const defaultKeywords = "suplementy diety, naturalne suplementy, zdrowie, witaminy, minerały, omega-3, probiotyki, odporność, zdrowa dieta";
  const defaultImage = "/img/logo.jpg";
  const defaultUrl = "https://familybalance.pl";

  const seoTitle = title ? `${title} | Family Balance` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoOgTitle = ogTitle || seoTitle;
  const seoOgDescription = ogDescription || seoDescription;
  const seoOgImage = ogImage || defaultImage;
  const seoOgUrl = ogUrl || defaultUrl;
  const seoCanonicalUrl = canonicalUrl || seoOgUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={seoCanonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoOgTitle} />
      <meta property="og:description" content={seoOgDescription} />
      <meta property="og:image" content={seoOgImage} />
      <meta property="og:url" content={seoOgUrl} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content="Family Balance" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoOgTitle} />
      <meta name="twitter:description" content={seoOgDescription} />
      <meta name="twitter:image" content={seoOgImage} />

      {/* Article Specific Meta Tags */}
      {article && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime} />
          <meta property="article:author" content={author} />
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Polish" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Family Balance" />
    </Helmet>
  );
};

export default SEO; 