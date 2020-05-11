import React, { Fragment } from "react";
import { Heading, Text, Box, Link, Divider } from "@theme-ui/components";

import Seo from "../components/Seo";
import { useConfig } from "../utils/useConfig";

const IndexPage = () => {
  const {
    site: {
      siteMetadata: { name, description, keywords, siteUrl, siteImage, lang },
    },
  } = useConfig();

  return (
    <Fragment>
      <Seo
        type="website"
        title={name}
        titleTemplate=""
        keywords={keywords}
        description={description}
        siteUrl={siteUrl}
        siteImage={siteImage}
        lang={lang}
      />
      <Heading as="h1" variant="styles.h1">
        Hiya!{" "}
        <span role="img" aria-label="wave">
          👋
        </span>
      </Heading>
      <Divider />
      <Heading as="h4" variant="styles.h4">
        Roll your own comments with Gatsby and FaunaDB
      </Heading>
      <Text>
        In this tutorial we'll learn how to write all the{" "}
        <Link href="https://dashboard.fauna.com/" target="_blank">
          FaunaDB
        </Link>{" "}
        {""} operations required to drive a Gatsby Blog commenting system.
        <Divider />
        This comments app also uses the Netlify Identity Widget, Netlify
        Continuous Deployment, Netlify serverless functions and Apollo/GraphQL
      </Text>
      <Divider />
      <Text
        sx={{
          fontStyle: "italic",
        }}
      >
        This tutorial only covers the steps required to perform database
        operations with FaunaDB
      </Text>
      <Divider />
      <Heading as="h6" variant="styles.h6">
        Some things you'll need before we start:
      </Heading>
      <Box as="ul">
        <Box as="li">A GitHub account</Box>
        <Box as="li">A Netlify account</Box>
        <Box as="li">A FaunaDB account</Box>
      </Box>
      <Divider />
      <Text>
        If you enjoyed this tutorial please do let me know{" "}
        <Link href="https://twitter.com/PaulieScanlon" target="_blank">
          @pauliescanlon
        </Link>
      </Text>
      <Divider />
    </Fragment>
  );
};

export default IndexPage;
