const { db } = require("../admin-db");
const { getAllScreams } = require("./getAllScream");

//TODO: delete scream which is must async delete both its comments and likes
exports.deleteScream = (req, res) => {
  const document = db.doc(`Screams/${req.params.screamId}`);

  const likeDocument = db
    .collection("Likes")
    .where("screamId", "==", req.params.screamId)
    .where("userHandle", "==", req.user.handle)
    .limit(1);
    
  const commentDocument = db
    .collection("Comments")
    .where("screamId", "==", req.params.screamId)
    .where("userHandle", "==", req.user.handle)
    .limit(1);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "Scream not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      return document.delete();
    })
    .then(() => {
      return likeDocument.get();
    })
    .then(() => {
      return commentDocument.get();
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ message: "Scream haven't like" });
      }

      return db.doc(`/Likes/${data.docs[0].id}`).delete();
    })
    .then(() => {
      return getAllScreams(req, res);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
