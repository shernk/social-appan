const { db } = require("../admin-db");
const { deleteScreamWithItsLikes } = require("./deleteScreamWithItsLikes");
const { getAllScreams } = require("./getAllScream");

exports.deleteScreamWithItsComments = (req, res) => {
  const document = db.doc(`Screams/${req.params.screamId}`);

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

      // Have to delete scream's likes first
      /**
       * TODO: have to confirm when scream which is have not had its like => return res.status(400).json({ message: "Scream haven't like" });
       * So, cannot reach next line
       * ?Solution:
       * if executed DELETE method so that need to use next()
       */
      // return deleteScreamWithItsLikes(req, res, next);
    })
    // Then delete its comments
    .then(() => {
      return commentDocument.get();
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ message: "Scream haven't commented" });
      }

      return db.doc(`/Comments/${data.docs[0].id}`).delete();
    })
    // finally, delete scream document
    .then(() => {
      return document.delete();
    })
    .then(() => {
      return getAllScreams(req, res);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
