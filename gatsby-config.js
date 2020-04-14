module.exports = {
  siteMetadata: {
    name: "FGC",
    description: "Fauna powered comments for a Gatsby blog",
    keywords: [
      "React",
      "Gatsby.js",
      "Netlify Identity",
      "Netlify Serverless functions",
      "Apollo",
      "GraphQL",
      "Fauan",
    ],
    siteUrl: "https://fauna-gatsby-comments.netlify.com",
    siteImage: "images/fgc-open-graph-image.jpg",
    profileImage: ``,
    lang: `en`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/PagesLayout.js`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
  ],
};
