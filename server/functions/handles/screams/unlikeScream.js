const { db } = require("../admin-db");

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
