const { db } = require("../admin-db");

exports.getScream = (req, res) => {
  let screamData = {};

  db.doc(`/Screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists)
        return res.status(404).json({ message: "scream not found" });
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection("Comments")
        .orderBy("createdAt", "desc")
        .where("screamId", "==", req.params.screamId)
        .get();
    })
    .then((data) => {
      screamData.comments = [];
      data.forEach((doc) => {
        screamData.comments.push(doc.data());
      });
      return res.status(200).json(screamData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
