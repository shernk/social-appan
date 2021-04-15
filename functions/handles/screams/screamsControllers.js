const { db } = require("../admin-db");

exports.getAllScreams = (req, res) => {
  db.collection("Screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

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

exports.postOneScream = (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.userHandle,
    userImageUrl: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("Screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} create successfully` });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: `${err}` });
    });
};

exports.commentOnScream = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ comment: "Must not be empty" });

  const newComment = {
    screamId: req.params.screamId,
    userId: req.user.userId,
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
  };

  db.doc(`Screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (req.params.userId !== newComment.userId)
        return res.status(404).json({ error: "userId not found" });
      else if (!doc.exists)
        return res.status(404).json({ error: "Scream not found" });
      return db.collection("Comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
