import React, { Fragment, useState } from "react";
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

const CommentForm = () => {
  const [isFormSent, setIsFormSent] = useState(false);
  const [isFormError, setIsFormError] = useState(false);

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
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          fetch(
            "https://www.mocky.io/v2/5e8304312f000061fa2fc88e?mocky-delay=2000ms"
          )
            .then(() => {
              setSubmitting(false);
              resetForm();
              setIsFormSent(true);
              setTimeout(() => {
                setIsFormSent(false);
              }, 3000);
            })
            .catch((error) => {
              setIsFormError(true);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, values, errors, dirty, handleChange }) => {
          return (
            <Form>
              <Field name={NAME_FIELD}>
                {({ field }) => (
                  <Box>
                    <Label labelFor={NAME_FIELD}>You name</Label>
                    <Input
                      {...field}
                      name={NAME_FIELD}
                      placeholder="Enter your name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name={NAME_FIELD}
                      render={() => (
                        <Text sx={{ color: "error", fontSize: 0, mt: 1 }}>
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
                  <Box>
                    <Label labelFor={COMMENT_FIELD}>You comment</Label>
                    <Textarea
                      {...field}
                      name={COMMENT_FIELD}
                      placeholder="Enter your comment"
                      value={values.comment}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name={COMMENT_FIELD}
                      render={() => (
                        <Text sx={{ color: "error", fontSize: 0, mt: 1 }}>
                          {errors.comment}
                        </Text>
                      )}
                    />
                  </Box>
                )}
              </Field>

              <Flex
                sx={{
                  justifyContent: "flex-end",
                }}
              >
                <Box>
                  {isFormSent && (
                    <Text sx={{ color: "success", fontSize: 0, mt: 1 }}>
                      Comment sent ok!
                    </Text>
                  )}
                  {isFormError && (
                    <Text sx={{ color: "error", fontSize: 0, mt: 1 }}>
                      Ooops, there's been an error!
                    </Text>
                  )}
                </Box>
              </Flex>
              <Divider />
              <Flex
                sx={{
                  justifyContent: "flex-end",
                }}
              >
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

export default CommentForm;
