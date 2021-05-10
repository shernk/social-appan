const { db } = require("../admin-db");
const { deleteAll } = require("../../delete/delete");

exports.deleteAllScreams = (req, res) => {
  const ref = db.collection("Screams");

  deleteAll(ref, res);
};
