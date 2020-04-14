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
        Welcome to the Fauna Gatsby Comments app
      </Heading>
      <Text>
        In this tutorial we'll build a complete commenting system with Gatsby,
        Netlify Identity and Netlify serverless functions, Apollo/GraphQL and
        Fauna
      </Text>
      <Text
        sx={{
          fontStyle: "italic",
        }}
      >
        It's assumed you have some experience developing with React, Gatsby and
        MDX
      </Text>
      <Divider />
      <Heading as="h6" variant="styles.h6">
        Some things you'll need before we start
      </Heading>
      <Box as="ul">
        <Box as="li">A GitHub account</Box>
        <Box as="li">A Netlify account</Box>
        <Box as="li">A Fauna account</Box>
      </Box>
      <Divider />
      <Text>
        If you enjoyed this tutorial please do let me know{" "}
        <Link href="https://twitter.com/PaulieScanlon" target="_blank">
          @pauliescanlon
        </Link>
      </Text>
    </Fragment>
  );
};

export default IndexPage;
