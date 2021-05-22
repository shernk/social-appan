const { db } = require("../admin-db");

exports.deleteScreamWithItsLikes = (req, res) => {
  const document = db.doc(`Screams/${req.params.screamId}`);

  const likeDocument = db
    .collection("Likes")
    .where("screamId", "==", req.params.screamId)
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
      return likeDocument.get();
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ message: "Scream haven't liked" });
      }

      return db.doc(`/Likes/${data.docs[0].id}`).delete();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
