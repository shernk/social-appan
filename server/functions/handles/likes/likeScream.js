const { db } = require("../admin-db");

exports.likeScream = (req, res) => {
  let screamData = {};

  const likeDocument = db
    .collection("Likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1)
    .get();

  const screamDocument = db.doc(`/Screams/${req.params.screamId}`);

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;

        return likeDocument;
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
            createdAt: new Date().toISOString(),
          })
          .then(() => {
            let likeScreamCount;

            if (
              screamData.likeScreamCount === null ||
              screamData.likeScreamCount === NaN ||
              screamData.likeScreamCount < 0
            ) {
              likeScreamCount = screamData.likeScreamCount = 0;

              return screamDocument.update({
                likeScreamCount: likeScreamCount,
              });
            }

            likeScreamCount = screamData.likeScreamCount + 1;

            return screamDocument.update({
              likeScreamCount: likeScreamCount,
            });
          })
          .then(() => {
            return res.status(200).json(screamData);
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
