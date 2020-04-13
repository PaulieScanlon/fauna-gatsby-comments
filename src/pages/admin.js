import React, { Fragment, useContext } from "react";
import { Heading, Text, Divider } from "@theme-ui/components";

import { AppContext } from "../components/AppContext";

const AdminPage = () => {
  const {
    state: { admin },
  } = useContext(AppContext);

  return (
    <Fragment>
      <Heading as="h1" variant="styles.h1">
        Admin{" "}
        {admin && admin.id === process.env.ADMIN_ID ? (
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
        {admin && admin.id === process.env.ADMIN_ID
          ? "Hooray! You're are the admininstrator"
          : "You have to be the admininstrator to view this page!"}
      </Text>
      <Divider />
    </Fragment>
  );
};

export default AdminPage;
