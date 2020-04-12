const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode });

    createNodeField({
      node,
      name: `slug`,
      value: `/posts${slug}`,
    });
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          previous {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (data.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  data.allMdx.edges.forEach(({ node, previous, next }) => {
    const {
      id,
      fields: { slug },
    } = node;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/layouts/PostsLayout.js`),
      context: { id: id, slug: slug, prev: previous, next: next },
    });
  });
};
