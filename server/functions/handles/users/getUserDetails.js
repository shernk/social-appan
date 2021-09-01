const { db } = require("../admin-db");

// get user's data with own scream
exports.getUserDetails = (req, res) => {
  let userData = {};

  db.doc(`/Users/${req.params.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("Screams")
          .where("userHandle", "==", req.user.handle)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ errror: "User not found" });
      }
    })
    .then((data) => {
      userData.screams = [];
      data.forEach((doc) => {
        userData.screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          userImage: doc.data().userImage,
          likeScreamCount: doc.data().likeScreamCount,
          commentScreamCount: doc.data().commentScreamCount,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
