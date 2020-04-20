import React, { Fragment } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import { format } from "date-fns";
import { Link as GatsbyLink } from "gatsby";
import {
  Heading,
  Text,
  Flex,
  Box,
  Divider,
  Button,
  Link,
  Spinner,
} from "@theme-ui/components";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Seo from "../components/Seo";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { useConfig } from "../utils/useConfig";

const GET_COMMENTS_BY_SLUG = gql`
  query($slug: String!) {
    getCommentsBySlug(slug: $slug) {
      commentId
      isApproved
      slug
      date
      name
      comment
    }
  }
`;

const PostsLayout = ({
  data: {
    mdx: {
      body,
      excerpt,
      frontmatter: { title, date },
      fields: { slug },
    },
  },
  pageContext,
}) => {
  const { prev, next } = pageContext;

  const {
    site: {
      siteMetadata: { name, keywords, siteUrl, siteImage, lang },
    },
  } = useConfig();

  const { loading, data, error } = useQuery(GET_COMMENTS_BY_SLUG, {
    variables: {
      slug: slug,
    },
  });

  return (
    <Box>
      <Seo
        type="article"
        title={name}
        titleTemplate={title}
        keywords={keywords}
        description={excerpt}
        siteUrl={siteUrl}
        siteImage={siteImage}
        lang={lang}
        path={slug}
      />
      <Flex
        sx={{
          flexDirection: "column",
        }}
      >
        <Heading as="h1" variant="styles.h1">
          {title}
        </Heading>
        <Text as="small" variant="styles.small" sx={{ color: "highlight" }}>
          {format(new Date(date), "d MMMM u")}
        </Text>
      </Flex>
      <MDXProvider>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
      <Divider />
      <Flex
        sx={{
          justifyContent: "space-between",
          mx: (theme) => `-${theme.space[2]}px`,
        }}
      >
        <Box>
          {prev && (
            <Box>
              <Link
                as={GatsbyLink}
                to={prev.fields.slug}
                sx={{ textDecoration: "none" }}
              >
                <Button tabIndex={-1} variant="ghost">
                  Prev
                </Button>
              </Link>
            </Box>
          )}
        </Box>
        <Box>
          {next && (
            <Box>
              <Link
                as={GatsbyLink}
                to={next.fields.slug}
                sx={{ textDecoration: "none" }}
              >
                <Button tabIndex={-1} variant="ghost">
                  Next
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Flex>
      <Divider />
      {loading && <Spinner />}
      {error && <Text>{`${error}`}</Text>}
      <Divider />
      {data &&
        data.getCommentsBySlug
          .filter((comment) => comment.isApproved)
          .map((comment, index) => (
            <Fragment key={index}>
              <Text
                sx={{
                  color: "secondary",
                  mb: 2,
                  fontStyle: "italic",
                }}
              >
                Comments
              </Text>
              <Divider />
              <Comment {...comment} />
              <Divider />
            </Fragment>
          ))}
      <CommentForm slug={slug} />
      <Divider />
    </Box>
  );
};

export const post = graphql`
  query getSinglePost($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
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
`;

export default PostsLayout;
