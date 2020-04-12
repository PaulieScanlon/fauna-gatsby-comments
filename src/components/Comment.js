import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Flex, Box, Text, Heading } from "@theme-ui/components";

import SvgIcon from "./SvgIcon";
import { QUOTE_ICON } from "../utils/iconPaths";

const ICON_SIZE = 32;

const Comment = ({ date, name, comment }) => {
  return (
    <Box>
      <Box
        sx={{
          ml: [0, ICON_SIZE * 1.2],
        }}
      >
        <Heading as="h6" variant="styles.h6" sx={{ color: "gray" }}>
          {name}
        </Heading>
        <Text variant="styles.small" sx={{ color: "highlight", mb: 2 }}>
          {format(new Date(date), "d MMMM u")}
        </Text>
      </Box>
      <Flex
        sx={{
          borderBottomColor: "darken",
          borderBottomStyle: "solid",
          borderBottomWidth: 1,
          pb: 4,
        }}
      >
        <SvgIcon
          iconPath={QUOTE_ICON}
          sx={{
            alignSelf: "flex-start",
            color: "muted",
            display: ["none", "flex"],
            mt: `-${ICON_SIZE / 2.5}px`,
            mr: 2,
            minWidth: ICON_SIZE,
            transform: "scaleX(-1)",
          }}
        />
        <Text
          sx={{
            alignSelf: "center",
            display: "flex",
            color: "gray",
            fontStyle: "italic",
            fontSize: 0,
          }}
        >
          {comment}
        </Text>
        <SvgIcon
          iconPath={QUOTE_ICON}
          sx={{
            alignSelf: "flex-end",
            color: "muted",
            display: ["none", "flex"],
            mb: `-${ICON_SIZE / 2.5}px`,
            ml: 2,
            minWidth: ICON_SIZE,
          }}
        />
      </Flex>
    </Box>
  );
};

Comment.propTypes = {
  /** The name of the person who submitted the comment */
  name: PropTypes.string.isRequired,
  /** The date the comment was posted */
  date: PropTypes.string.isRequired,
  /** The comment made by the user */
  comment: PropTypes.string.isRequired,
};

export default Comment;
