require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_DB });

const COLLECTION_NAME = "";

module.exports = {
  // CREATE COMMENT
  // DELETE COMMENT BY ID
  // GET ALL COMMENTS
  // GET COMMENT BY SLUG
  // APPROVE COMMENT BY ID
};

require("make-runnable/custom")({
  printOutputFrame: false,
});
