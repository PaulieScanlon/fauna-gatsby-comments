import React, { Fragment, useContext } from "react";
import { Heading, Text, Divider, Spinner } from "@theme-ui/components";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { AppContext } from "../components/AppContext";

import Comment from "../components/Comment";

const GET_ALL_COMMENTS = gql`
  query {
    getAllComments {
      commentId
      isApproved
      slug
      date
      name
      comment
    }
  }
`;

const DELETE_COMMENT_BY_ID = gql`
  mutation($commentId: String!) {
    deleteCommentById(commentId: $commentId) {
      commentId
    }
  }
`;

const APPROVE_COMMENT_BY_ID = gql`
  mutation($commentId: String!) {
    approveCommentById(commentId: $commentId) {
      isApproved
    }
  }
`;

const AdminPage = () => {
  const {
    state: { admin },
  } = useContext(AppContext);

  const isAdmin = () => admin && admin.id === process.env.GATSBY_ADMIN_ID;

  const { loading, error, data } = useQuery(GET_ALL_COMMENTS);
  const [deleteCommentById] = useMutation(DELETE_COMMENT_BY_ID);
  const [approveCommentById] = useMutation(APPROVE_COMMENT_BY_ID);

  return (
    <Fragment>
      <Heading as="h1" variant="styles.h1">
        Admin{" "}
        {isAdmin() ? (
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
        {isAdmin()
          ? "Hooray! You are the administrator"
          : "You have to be the administrator to view this page"}
      </Text>
      <Divider />

      <Divider />
      {isAdmin() && loading && <Spinner />}
      {isAdmin() && error && <Text>{`${error}`}</Text>}

      {isAdmin() &&
        data &&
        data.getAllComments.map((comment, index) => {
          const { commentId } = comment;
          return (
            <Fragment key={index}>
              <Comment
                {...comment}
                isAdmin={isAdmin()}
                onApprove={() =>
                  approveCommentById({
                    variables: {
                      commentId,
                    },
                    refetchQueries: [{ query: GET_ALL_COMMENTS }],
                  })
                }
                onDelete={() =>
                  deleteCommentById({
                    variables: {
                      commentId,
                    },
                    refetchQueries: [{ query: GET_ALL_COMMENTS }],
                  })
                }
              />
              <Divider />
            </Fragment>
          );
        })}
      <Divider />
    </Fragment>
  );
};

export default AdminPage;
