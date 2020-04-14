import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const Seo = ({
  type,
  title,
  titleTemplate,
  keywords,
  description,
  siteUrl,
  siteImage,
  lang,
  path,
}) => {
  const formatTitleTemplate = `${title} ${
    titleTemplate ? `| ${titleTemplate}` : ""
  }`;

  return (
    <Helmet
      title={title}
      titleTemplate={formatTitleTemplate}
      link={[
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: `${siteUrl}/images/favicon-16x16.png`,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: `${siteUrl}/images/favicon-32x32.png`,
        },
      ]}
    >
      <html lang={lang} />
      <meta name="description" content={description} />
      <meta name="image" content={`${siteUrl}/${siteImage}`} />
      <meta name="image:alt" content={description} />
      <meta
        name="gatsby-theme"
        content="@pauliescanlon/gatsby-theme-terminal"
      />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={formatTitleTemplate} />
      <meta property="og:url" content={`${siteUrl}${path ? path : ""}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/${siteImage}`} />
      <meta property="og:image:alt" content={description}></meta>

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formatTitleTemplate} />
      <meta name="twitter:url" content={`${siteUrl}${path ? path : ""}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/${siteImage}`} />
      <meta name="twitter:image:alt" content={description}></meta>
    </Helmet>
  );
};

Seo.propTypes = {
  /** The type of meta - useful for Facebook */
  type: PropTypes.oneOf(["website", "article"]),
  /** The site title */
  title: PropTypes.string.isRequired,
  /** The site individual route */
  titleTemplate: PropTypes.string,
  /** Keywords to use in meta keywords */
  keywords: PropTypes.arrayOf(PropTypes.string),
  /** The site description */
  description: PropTypes.string.isRequired,
  /** The site URL */
  siteUrl: PropTypes.string.isRequired,
  /** Image url to use for opengraph image */
  siteImage: PropTypes.string,
  /** Lang to use as meta lang */
  lang: PropTypes.string,
  /** Absolute URL path */
  path: PropTypes.string,
};

Seo.defaultProps = {
  lang: "eng",
};

export default Seo;
