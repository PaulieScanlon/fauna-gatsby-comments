require("dotenv").config();
const faunadb = require("faunadb");
const { ApolloServer, gql } = require("apollo-server-lambda");

const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_DB });

const COLLECTION_NAME = process.env.GATSBY_FAUNA_COLLECTION;

const typeDefs = gql`
  type Query {
    getAllComments: [CommentObject]
    getCommentsBySlug(slug: String!): [CommentObject]
  }

  type Mutation {
    createComment(slug: String!, name: String!, comment: String): CreatedComment
    deleteCommentById(commentId: String!): DeletedComment
    approveCommentById(commentId: String!): ApprovedComment
  }

  type DeletedComment {
    commentId: String
  }

  type ApprovedComment {
    isApproved: Boolean
  }

  type CreatedComment {
    commentId: String
  }

  type CommentObject {
    commentId: String
    isApproved: Boolean
    slug: String
    date: String
    name: String
    comment: String
  }
`;

const resolvers = {
  Query: {
    // GET ALL COMMENTS
    getAllComments: async () => {
      const results = await client.query(
        q.Paginate(q.Match(q.Index("get-all-comments")))
      );
      return results.data.map(
        ([ref, isApproved, slug, date, name, comment]) => ({
          commentId: ref.id,
          isApproved,
          slug,
          date,
          name,
          comment,
        })
      );
    },

    // GET COMMENT BY SLUG
    getCommentsBySlug: async (root, args, context) => {
      const results = await client.query(
        q.Paginate(q.Match(q.Index("get-comments-by-slug"), args.slug))
      );

      return results.data.map(
        ([ref, isApproved, slug, date, name, comment]) => ({
          commentId: ref.id,
          isApproved,
          slug,
          date,
          name,
          comment,
        })
      );
    },
  },

  Mutation: {
    // CREATE COMMENT
    createComment: async (root, args, context) => {
      const results = await client.query(
        q.Create(q.Collection(COLLECTION_NAME), {
          data: {
            isApproved: false,
            slug: args.slug,
            date: new Date().toString(),
            name: args.name,
            comment: args.comment,
          },
        })
      );

      return {
        commentId: results.ref.id,
      };
    },

    // DELETE COMMENT BY ID
    deleteCommentById: async (root, args, context) => {
      const results = await client.query(
        q.Delete(q.Ref(q.Collection(COLLECTION_NAME), args.commentId))
      );

      return {
        commentId: results.ref.id,
      };
    },

    // APPROVE COMMENT BY ID
    approveCommentById: async (root, args, context) => {
      const results = await client.query(
        q.Update(q.Ref(q.Collection(COLLECTION_NAME), args.commentId), {
          data: {
            isApproved: true,
          },
        })
      );

      return {
        isApproved: results.isApproved,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
