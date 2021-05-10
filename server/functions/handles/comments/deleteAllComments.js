const { db } = require("../admin-db");
const { deleteAll } = require("../../delete/delete");

exports.deleteAllComments = (req, res) => {
  const ref = db.collection("Comments");

  deleteAll(ref, res);
};
