const { db } = require("../admin-db");

//TODO: delete scream which is must async delete both its comments and likes
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

