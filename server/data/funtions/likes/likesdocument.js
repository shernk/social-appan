const { db } = require("../../../functions/handles/admin-db");

exports.likeDocument = (req) => {
  return db
    .collection("Likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1)
    .get();
};
