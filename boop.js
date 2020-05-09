require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_DB });

const COLLECTION_NAME = "fork-blog-comments";

module.exports = {
  // CREATE COMMENT
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
  // DELETE COMMENT BY ID
  deleteCommentById: async () => {
    const commentId = "265035228205023755";
    const results = await client.query(
      q.Delete(q.Ref(q.Collection(COLLECTION_NAME), commentId))
    );
    console.log(JSON.stringify(results, null, 2));
    return {
      commentId: results.ref.id,
    };
  },
  // GET ALL COMMENTS
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
  // GET COMMENT BY SLUG
  getCommentsBySlug: async () => {
    const slug = "/posts/some-post";
    const results = await client.query(
      q.Paginate(q.Match(q.Index("get-comments-by-slug"), slug))
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
  // APPROVE COMMENT BY ID
  approveCommentById: async () => {
    const commentId = "265035203910566402";
    const results = await client.query(
      q.Update(q.Ref(q.Collection(COLLECTION_NAME), commentId), {
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
