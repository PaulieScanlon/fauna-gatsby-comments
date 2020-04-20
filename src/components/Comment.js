import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Flex,
  Box,
  Text,
  Heading,
  Button,
  Link,
  Divider,
} from "@theme-ui/components";

import SvgIcon from "./SvgIcon";
import { QUOTE_ICON, DELETE_ICON, APPROVE_ICON } from "../utils/iconPaths";

const QUOTE_ICON_SIZE = 32;

const Comment = ({
  commentId,
  isApproved,
  slug,
  date,
  name,
  comment,
  isAdmin,
  onApprove,
  onDelete,
}) => {
  return (
    <Box
      as="section"
      sx={{
        borderBottomColor: "darken",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
      }}
    >
      <Box
        sx={{
          ml: [0, QUOTE_ICON_SIZE * 1.2],
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
          pb: 4,
        }}
      >
        <SvgIcon
          iconPath={QUOTE_ICON}
          sx={{
            alignSelf: "flex-start",
            color: "muted",
            display: ["none", "flex"],
            mt: `-${QUOTE_ICON_SIZE / 2.5}px`,
            mr: 2,
            minWidth: QUOTE_ICON_SIZE,
            transform: "scaleX(-1)",
          }}
        />
        <Text
          as="small"
          variant="styles.small"
          sx={{
            alignSelf: "center",
            color: "gray",
            display: "flex",
            flex: 1,
            fontStyle: "italic",
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
            mb: `-${QUOTE_ICON_SIZE / 2.5}px`,
            ml: 2,
            minWidth: QUOTE_ICON_SIZE,
          }}
        />
      </Flex>
      <Box
        sx={{
          mt: 3,
        }}
      >
        {isAdmin ? (
          <Flex
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Flex
              sx={{
                flexDirection: "column",
                mb: [4, 0],
              }}
            >
              <Text as="small" variant="styles.small">
                Approved: {isApproved ? "true" : "false"}
              </Text>
              <Text as="small" variant="styles.small">
                Comment Id: {commentId}
              </Text>
              <Flex>
                <Text as="small" variant="styles.small" sx={{ mr: 1 }}>
                  Link:
                </Text>
                <Link href={slug} target="_blank">
                  <Text variant="styles.small">{slug}</Text>
                </Link>
              </Flex>
            </Flex>
            <Flex
              sx={{
                alignItems: "center",
                flex: ["1 0 100%", "1 0 0%"],
                justifyContent: ["space-between", "flex-end"],
              }}
            >
              <Button
                variant="ghost"
                sx={{ color: "error", mr: 3 }}
                onClick={() => onDelete(commentId)}
              >
                <SvgIcon
                  iconPath={DELETE_ICON}
                  sx={{ color: "error", mr: 2 }}
                />
                Delete
              </Button>
              <Button
                variant="secondary"
                sx={{ backgroundColor: "success" }}
                disabled={isApproved}
                onClick={() => onApprove(commentId)}
              >
                {!isApproved && (
                  <SvgIcon
                    iconPath={APPROVE_ICON}
                    sx={{ color: "succes", mr: 2 }}
                  />
                )}
                {isApproved ? "Approved" : "Approve"}
              </Button>
            </Flex>
          </Flex>
        ) : null}
        <Divider />
      </Box>
    </Box>
  );
};

Comment.defaultProps = {
  isApproved: false,
  isAdmin: false,
};

Comment.propTypes = {
  /** The comment Id */
  commentId: PropTypes.string.isRequired,
  /** Status of commnet - only show if isAdmin = true */
  isApproved: PropTypes.bool.isRequired,
  /** The slug of the post the comments releated to - only show if isAdmin = true */
  slug: PropTypes.string.isRequired,
  /** The date the comment was posted */
  date: PropTypes.string.isRequired,
  /** The name of the person who submitted the comment */
  name: PropTypes.string.isRequired,
  /** The comment made by the user */
  comment: PropTypes.string.isRequired,
  /** Is admin logged in */
  isAdmin: PropTypes.bool.isRequired,
};

export default Comment;
