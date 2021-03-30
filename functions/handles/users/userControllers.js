const { db } = require("../admin-db");
const firebaseConfig = require("../../../config");
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const { validateSignUp, validateSignIn } = require("./validation");

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    // make strong password default by firebase
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  let token, userId;

  const { errors, valid } = validateSignUp(newUser);
  if (!valid) return res.status(400).json(errors);

  const dbDoc = db.doc(`/Users/${newUser.handle}`);
  dbDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredential = {
        userId,
        email: newUser.email,
        handle: newUser.handle,
        createAt: new Date().toISOString(),
      };

      return dbDoc.set(userCredential);
    })
    .then(() => {
      res.status(201).json({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res.status(500).json({
          error: err.code + " - something went wrong, please try again",
        });
      }
    });
};

exports.signIn = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateSignIn(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        err.code = "wrong password";
      } else if (err.code === "auth/user-not-found") {
        err.code = "user not found";
      } else if (err.code === "auth/too-many-requests") {
        err.code = "too many requests";
      }
      return res.status(403).json({ error: err.code + ", please try again" });
    });
};
