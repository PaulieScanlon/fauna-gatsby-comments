require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_DB });

const COLLECTION_NAME = "demo-blog-comments";

module.exports = {
  // READ
  getAllComments: async () => {
    const results = await client.query(
      q.Paginate(q.Match(q.Index("get-all-comments")))
    );
    console.log(JSON.stringify(results, null, 2));
    return results.data.map(([ref, isApproved, slug, date, name, comment]) => ({
      commentId: ref.id,
      isApproved,
      slug,
      date,
      name,
      comment,
    }));
  },

  // READ
  getCommentsBySlug: async (root, args, context) => {
    const results = await client.query(
      q.Paginate(q.Match(q.Index("get-comments-by-slug"), args.slug))
    );
    console.log(JSON.stringify(results, null, 2));
    return results.data.map(([ref, isApproved, slug, date, name, comment]) => ({
      commentId: ref.id,
      isApproved,
      slug,
      date,
      name,
      comment,
    }));
  },

  // CREATE
  createComment: async () => {
    const slug = "/posts/some-post";
    const name = "some name";
    const comment = "some comment";

    const results = await client.query(
      q.Create(q.Collection(COLLECTION_NAME), {
        data: {
          isApproved: false,
          slug: slug,
          date: new Date().toString(),
          name: name,
          comment: comment,
        },
      })
    );
    console.log(JSON.stringify(results, null, 2));
    return {
      commentId: results.ref.id,
    };
  },

  // DELETE
  deleteCommentById: async (root, args, context) => {
    const results = await client.query(
      q.Delete(q.Ref(q.Collection(COLLECTION_NAME), args.commentId))
    );
    console.log(JSON.stringify(results, null, 2));
    return {
      commentId: results.ref.id,
    };
  },

  // UPDATE
  approveCommentById: async (root, args, context) => {
    const results = await client.query(
      q.Update(q.Ref(q.Collection(COLLECTION_NAME), args.commentId), {
        data: {
          isApproved: true,
        },
      })
    );
    console.log(JSON.stringify(results, null, 2));
    return {
      isApproved: results.isApproved,
    };
  },
};

require("make-runnable/custom")({
  printOutputFrame: false,
});
