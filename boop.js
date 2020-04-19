require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_DB });

const COLLECTION_NAME = "demo-blog-comments";

module.exports = {
  createComment: async () => {
    //  create a new comment for postId
    const postId = "f99cfc44-da7b-5ca5-a4a4-82dc3d1239b7";

    const results = await client.query(
      q.Create(q.Collection(COLLECTION_NAME), {
        data: {
          isApproved: false,
          slug: "some-slug",
          postId: postId,
          date: new Date().toString(),
          name: "Delete me",
          comment: "Test comment 1",
        },
      })
    );

    const {
      ref: { id },
      data,
    } = results;

    const response = {
      commentId: id,
      ...data,
    };

    console.log(JSON.stringify(response, null, 2));
  },
  readComment: async () => {
    // read a comment by commentId
    const commentId = "";

    const results = await client.query(
      q.Get(q.Ref(q.Collection(COLLECTION_NAME), commentId))
    );
    const { data } = results;
    const response = {
      ...data,
    };

    console.log(JSON.stringify(response, null, 2));
  },
  udpateComment: async () => {
    // update a comment by commentId
    const commentId = "";

    const results = await client.query(
      q.Update(q.Ref(q.Collection(COLLECTION_NAME), commentId), {
        data: {
          isApproved: true,
          date: new Date().toString(),
        },
      })
    );
    const { data } = results;
    const response = {
      ...data,
    };

    console.log(JSON.stringify(response, null, 2));
  },
  deleteComment: async () => {
    // delete a comment by commentId
    const commentId = "";
    const results = await client.query(
      q.Delete(q.Ref(q.Collection(COLLECTION_NAME), commentId))
    );

    const response = `commentId:${results.ref.id} | deleted ok!`;
    console.log(JSON.stringify(response, null, 2));
  },

  getAllComments: async () => {
    // get all comments
    const results = await client.query(
      q.Paginate(q.Match(q.Index("get-all-comments")))
    );
    const response = results.data.map(
      ([ref, isApproved, slug, postId, date, name, comment]) => ({
        ref: ref.id,
        isApproved,
        slug,
        postId,
        date,
        name,
        comment,
      })
    );

    console.log(JSON.stringify(response, null, 2));
  },
};

require("make-runnable/custom")({
  printOutputFrame: false,
});
