import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Flex,
  Box,
  Text,
  Input,
  Textarea,
  Button,
  Divider,
  Label,
  Spinner,
} from "@theme-ui/components";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NAME_FIELD = "name";
const COMMENT_FIELD = "comment";

const initialValues = {
  name: "",
  comment: "",
};

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Please enter your name"),
  comment: Yup.string()
    .min(10, "Comment must be at least 10 characters")
    .required("Please enter a comment"),
});

const CREATE_COMMENT = gql`
  mutation($slug: String!, $name: String!, $comment: String!) {
    createComment(slug: $slug, name: $name, comment: $comment) {
      commentId
    }
  }
`;

const CommentForm = ({ slug }) => {
  const [isFormSent, setIsFormSent] = useState(false);
  const [isFormError, setIsFormError] = useState(false);

  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);

  return (
    <Fragment>
      <Text
        sx={{
          color: "secondary",
          mb: 2,
          fontStyle: "italic",
        }}
      >
        Leave a comment
      </Text>

      <Formik
        initialValues={initialValues}
        isSubmitting={loading}
        errors={error}
        validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          await createComment({
            variables: {
              slug: slug,
              name: values.name,
              comment: values.comment,
            },
          })
            .then(() => {
              resetForm();
              setIsFormSent(true);
              setTimeout(() => {
                setIsFormSent(false);
              }, 3000);
            })
            .catch(() => {
              setIsFormError(true);
            });
        }}
      >
        {({ isSubmitting, values, errors, dirty, handleChange }) => {
          return (
            <Form>
              <Field name={NAME_FIELD}>
                {({ field }) => (
                  <Box
                    sx={{
                      mb: 4,
                    }}
                  >
                    <Label labelFor={NAME_FIELD}>You name</Label>
                    <Input
                      {...field}
                      name={NAME_FIELD}
                      placeholder="Enter your name"
                      value={values.name}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                      }}
                    />
                    <ErrorMessage
                      name={NAME_FIELD}
                      render={() => (
                        <Text
                          as="small"
                          variant="styles.small"
                          sx={{ color: "error", position: "absolute" }}
                        >
                          {errors.name}
                        </Text>
                      )}
                    />
                  </Box>
                )}
              </Field>
              <Divider />
              <Field name={COMMENT_FIELD}>
                {({ field }) => (
                  <Box
                    sx={{
                      mb: 4,
                    }}
                  >
                    <Label labelFor={COMMENT_FIELD}>You comment</Label>
                    <Textarea
                      {...field}
                      name={COMMENT_FIELD}
                      placeholder="Enter your comment"
                      value={values.comment}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                      }}
                    />
                    <ErrorMessage
                      name={COMMENT_FIELD}
                      render={() => (
                        <Text
                          as="small"
                          variant="styles.small"
                          sx={{ color: "error", position: "absolute" }}
                        >
                          {errors.comment}
                        </Text>
                      )}
                    />
                  </Box>
                )}
              </Field>

              <Flex
                sx={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                  }}
                >
                  {isFormSent && (
                    <Text
                      as="small"
                      variant="styles.small"
                      sx={{ color: "success" }}
                    >
                      Comment sent ok!
                    </Text>
                  )}
                  {isFormError && (
                    <Text
                      as="small"
                      variant="styles.small"
                      sx={{ color: "error" }}
                    >
                      Ooops, there's been an error!
                    </Text>
                  )}
                </Box>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={
                    isSubmitting || !dirty || !!errors.name || !!errors.comment
                  }
                >
                  {isSubmitting ? (
                    <Fragment>
                      Submitting
                      <Spinner variant="styles.spinner" sx={{ ml: 3 }} />
                    </Fragment>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

CommentForm.propTypes = {
  /** The slug of the post the comments releated to - only show if isAdmin = true */
  slug: PropTypes.string.isRequired,
};

export default CommentForm;
