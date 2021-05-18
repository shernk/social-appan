const { db } = require("../admin-db");

exports.getUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/Users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("Screams")
          .where("userHandle", "==", req.user.handle)
          .get();
      }
    })
    .then((data) => {
      userData.screams = [];
      data.forEach((doc) => {
        console.log(doc);
        userData.screams.push(doc.data());
      });
      return res.status(200).json(userData);
    })
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("Likes")
          .where("userHandle", "==", req.user.handle)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        console.log(doc);
        userData.likes.push(doc.data());
      });
      return res.status(200).json(userData);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    });
};
