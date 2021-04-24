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
      if (!doc.exists)
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
            screamData.likeCount = 1;
            return screamDocument.update({
              likeCount: screamData.likeCount,
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
            screamData.likeCount = 0;
            return screamDocument.update({
              likeCount: screamData.likeCount,
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

exports.deleteScream = (req, res) => {};
