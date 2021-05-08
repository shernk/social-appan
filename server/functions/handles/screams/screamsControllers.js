const { db } = require("../admin-db");

exports.likeScream = (req, res) => {
  let screamData;
  const likeDocument = db
    .collection("Likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/Screams/${req.params.screamId}`);

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ message: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("Likes")
          .add({
            screamId: req.params.screamId,
            userHandle: req.user.handle,
          })
          .then(() => {
            if (
              screamData.likeScreamCount === null ||
              screamData.likeScreamCount !== NaN
            ) {
              screamData.likeScreamCount = 0;
            }
            let likeScreamCount = ++screamData.likeScreamCount;
            return screamDocument.update({
              likeScreamCount: likeScreamCount,
            });
          })
          .then(() => {
            return res.json(screamData);
          });
      } else {
        return res.status(400).json({ message: "Scream already like" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};

exports.unlikeScream = (req, res) => {
  let screamData;
  const unlikeDocument = db
    .collection("Likes")
    .where("screamId", "==", req.params.screamId)
    .where("userHandle", "==", req.user.handle)
    .limit(1);

  const screamDocument = db.doc(`Screams/${req.params.screamId}`);

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return unlikeDocument.get();
      } else {
        return res.status(404).json({ message: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ message: "Scream haven't like" });
      } else {
        return db
          .doc(`/Likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            console.log("100000110101010100110");
            console.log(screamData.likeScreamCount);
            if (
              screamData.likeScreamCount === null ||
              screamData.likeScreamCount !== NaN
            ) {
              screamData.likeScreamCount = 0;
            } else {
              --screamData.likeScreamCount;
            }
            return screamDocument.update({
              likeScreamCount: screamData.likeScreamCount,
            });
          })
          .then(() => {
            return res.json(screamData);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ erorr: err.code });
    });
};

exports.deleteScream = (req, res) => {
  const document = db.doc(`Screams/${req.params.screamId}`);

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
      return this.getAllScreams(req, res);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};

exports.deleteComment = (req, res) => {
  const document = db.doc(`/Comments/${req.params.commentId}`);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "Comment not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      return document.delete();
    })
    .then(() => {
      res.status(200).json({message: `delete ${req.params.commentId} successfully`});
     })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
}
