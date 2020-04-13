import React, { Fragment } from "react";
import { format } from "date-fns";
import { useStaticQuery, graphql, Link } from "gatsby";
import {
  Heading,
  Divider,
  Card,
  Flex,
  Box,
  Text,
  Button,
} from "@theme-ui/components";

const PostsPage = () => {
  const posts = useStaticQuery(graphql`
    query getAllPosts {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return (
    <Fragment>
      <Heading as="h1" variant="styles.h1">
        Posts{" "}
        <span role="img" aria-label="posts">
          ✍️
        </span>
      </Heading>
      <Divider />
      <Flex sx={{ flexWrap: "wrap", mx: (theme) => `-${theme.space[2]}px` }}>
        {posts.allMdx.edges.map((item, index) => {
          const {
            frontmatter: { title, date },
            fields: { slug },
            excerpt,
          } = item.node;
          return (
            <Box
              key={index}
              sx={{
                px: 2,
                mb: 3,
                width: ["100%", "50%"],
                a: {
                  textDecoration: "none",
                },
              }}
            >
              <Link to={slug}>
                <Card
                  sx={{
                    ":hover": {
                      button: {
                        color: "primary",
                      },
                    },
                  }}
                >
                  <Heading as="h5" variant="styles.h5">
                    {title}
                  </Heading>
                  <Text variant="styles.small" sx={{ color: "highlight" }}>
                    {format(new Date(date), "d MMMM u")}
                  </Text>
                  <Divider />
                  <Text
                    sx={{
                      mb: 4,
                    }}
                  >
                    {excerpt}
                  </Text>
                  <Button
                    variant="text"
                    tabIndex={-1}
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Read post
                  </Button>
                </Card>
              </Link>
            </Box>
          );
        })}
      </Flex>
    </Fragment>
  );
};

export default PostsPage;
