import React from "react";
import { Box, Container } from "@theme-ui/components";

import Header from "../components/Header";

const PagesLayout = ({ children }) => (
  <Box as="main">
    <Container>
      <Header />
      <Box as="section">{children}</Box>
    </Container>
  </Box>
);

export default PagesLayout;
