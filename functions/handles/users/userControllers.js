const { db } = require("../admin-db");
const firebaseConfig = require("../../../config");
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

exports.signUp = (res, req) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  //TODO: validate data
  db.doc(`/user/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(404).json({ handle: "this handle is already taken" });
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUSer.password)
          .then((data) => {
            return data.user.getIdToken();
          })
          .then((token) => {
            return res.status(201).json({ token });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: err.code });
          });
      }
    });
};
