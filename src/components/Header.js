import React, { Fragment, useContext } from "react";
import { Location } from "@reach/router";
import { Container, Flex, Box, NavLink, Button } from "@theme-ui/components";
import { Link } from "gatsby";
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
                  <NavLink as={Link} to="/">
                    <SvgIcon iconPath={COMMENT_ICON} />
                  </NavLink>
                  <NavLink as={Link} to="/posts">
                    Posts
                  </NavLink>
                </Flex>
                <Box>
                  {pathname.includes("admin") ? (
                    <Fragment>
                      <Button
                        variant="primary"
                        onClick={() => netlifyIdentity.open("signup")}
                      >
                        Sign up
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => netlifyIdentity.open("login")}
                        sx={{
                          ml: 2,
                        }}
                      >
                        {admin && admin.id === process.env.ADMIN_ID
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
