const { db } = require("../admin-db");

exports.unlikeScream = (req, res) => {
  let screamData;

  const likeDocument = db
    .collection("Likes")
    .where("screamId", "==", req.params.screamId)
    .where("userHandle", "==", req.user.handle)
    .limit(1)
    .get();

  const screamDocument = db.doc(`Screams/${req.params.screamId}`);

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
        return res.status(400).json({ message: "Scream haven't like" });
      } else {
        return db
          .doc(`/Likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            let likeScreamCount;

            if (
              screamData.likeScreamCount === null ||
              screamData.likeScreamCount === NaN ||
              screamData.likeScreamCount <= 0
            ) {
              likeScreamCount = screamData.likeScreamCount = 0;

              return screamDocument.update({
                likeScreamCount: likeScreamCount,
              });
            }

            likeScreamCount = screamData.likeScreamCount - 1;

            screamData.likes = [];
            data.forEach((doc) => {
              screamData.likes.push(doc.data());
            });

            return screamDocument.update({
              likeScreamCount: likeScreamCount,
            });
          })
          .then(() => {
            return res.status(200).json(screamData);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ erorr: err.code });
    });
};
