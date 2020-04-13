import React, { Fragment, useContext } from "react";
import { Heading, Text, Box, Divider } from "@theme-ui/components";

import { AppContext } from "../components/AppContext";

import Comment from "../components/Comment";

const AdminPage = () => {
  const {
    state: { admin },
  } = useContext(AppContext);

  return (
    <Fragment>
      <Heading as="h1" variant="styles.h1">
        Admin{" "}
        {admin && admin.id === process.env.GATSBY_ADMIN_ID ? (
          <span role="img" aria-label="admin">
            😃
          </span>
        ) : (
          <span role="img" aria-label="not-admin">
            😔
          </span>
        )}
      </Heading>
      <Text>
        {admin && admin.id === process.env.GATSBY_ADMIN_ID
          ? "Hooray! You are the administrator"
          : "You have to be the administrator to view this page"}
      </Text>
      <Divider />
      {admin && admin.id === process.env.GATSBY_ADMIN_ID ? (
        <Box>
          <Comment
            isApproved={false}
            isAdmin={true}
            date="2020-04-11T00:00:00.000Z"
            name="Jimi Hendix"
            comment="You jump in front of my car when you, you know all the time. Ninty miles an hour girl, is the speed I drive. You tell me it's alright, you don't mind a little pain. You say you just want me to, take you for a drive."
          />
          <Divider />
          <Comment
            isApproved={false}
            isAdmin={true}
            date="2020-04-11T00:00:00.000Z"
            name="Robert Plant"
            comment="Oh, let the sun beat down upon my face. With stars to fill my dream. I am a traveler of both time and space. To be where I have been."
          />
        </Box>
      ) : null}
      <Divider />
    </Fragment>
  );
};

export default AdminPage;
