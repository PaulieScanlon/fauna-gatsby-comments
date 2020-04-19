import React, { Fragment, useContext } from "react";
import { Location } from "@reach/router";
import { Container, Flex, Box, NavLink, Button } from "@theme-ui/components";
import { Link as GatsbyLink } from "gatsby";
import netlifyIdentity from "netlify-identity-widget";

import { AppContext } from "../components/AppContext";

import SvgIcon from "./SvgIcon";
import { COMMENT_ICON } from "../utils/iconPaths";

const Header = () => {
  const {
    state: { admin },
  } = useContext(AppContext);

  return (
    <Location>
      {({ location }) => {
        const { pathname } = location;
        return (
          <Fragment>
            <Flex
              as="header"
              sx={{
                alignItems: "center",
                backgroundColor: "background",
                borderBottomColor: "muted",
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                height: "header",
                left: 0,
                position: "fixed",
                right: 0,
                zIndex: 1,
              }}
            >
              <Container
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Flex
                  as="nav"
                  sx={{
                    alignItems: "center",
                    mx: (theme) => `-${theme.space[2]}px`,
                  }}
                >
                  <NavLink as={GatsbyLink} to="/">
                    <SvgIcon iconPath={COMMENT_ICON} />
                  </NavLink>
                  <NavLink as={GatsbyLink} to="/posts">
                    Posts
                  </NavLink>
                </Flex>
                <Box>
                  {pathname.includes("admin") ? (
                    <Fragment>
                      {process.env.GATSBY_SHOW_SIGN_UP === "true" ? (
                        <Button
                          variant="primary"
                          onClick={() => netlifyIdentity.open("signup")}
                        >
                          Sign up
                        </Button>
                      ) : null}
                      <Button
                        variant="secondary"
                        onClick={() => netlifyIdentity.open("login")}
                        sx={{
                          ml: 2,
                        }}
                      >
                        {admin && admin.id === process.env.GATSBY_ADMIN_ID
                          ? "Log out"
                          : "Login"}
                      </Button>
                    </Fragment>
                  ) : null}
                </Box>
              </Container>
            </Flex>
            <Box
              sx={{
                height: (theme) => `${theme.sizes.header * 1.5}px`,
              }}
            />
          </Fragment>
        );
      }}
    </Location>
  );
};

export default Header;
