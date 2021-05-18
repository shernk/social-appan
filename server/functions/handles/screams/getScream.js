const { db } = require("../admin-db");

//TODO: add likes[] docs
//? where("userHandle", "==", req.user.handle) is undefined
// https://stackoverflow.com/questions/54123542/how-do-i-get-data-from-two-collections-in-firestore
// https://stackoverflow.com/questions/52696311/cloud-firestore-how-to-get-relational-data-from-two-collections

exports.getScream = (req, res) => {
  let screamData = {};

  const commentsDoc = db
    .collection("Comments")
    .orderBy("createdAt", "desc")
    .where("screamId", "==", req.params.screamId)
    .get();

  const likesDoc = db
    .collection("Likes")
    // .orderBy("createdAt", "desc")
    .where("screamId", "==", req.params.screamId)
    // .where("userHandle", "==", req.user.handle)
    .get();

  const screamsDoc = { commentsDoc, likesDoc };

  db.doc(`/Screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists)
        return res.status(404).json({ message: "scream not found" });
      screamData = doc.data();
      screamData.screamId = doc.id;

      return screamsDoc.likesDoc;
    })
    .then((data) => {
      screamData.comments = [];
      screamData.likes = [];
      data.forEach((doc) => {
        screamData.comments.push(doc.data());
        screamData.likes.push(doc.data());
      });
      return res.status(200).json(screamData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
