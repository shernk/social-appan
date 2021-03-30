const { admin, db } = require("../handles/admin-db");

module.exports = (req, res, next) => {
  let idToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Token ")
  ) {
    idToken = req.headers.authorization.split("Token ")[1];
  } else {
    console.error("No Token Found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db
        .collection("Users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle;
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token ", err);
      return res.status(403).json(err);
    });
};
