const { db } = require("../admin-db");
const firebaseConfig = require("../../../config");
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const {validateSignUp} = require('./validation')

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  let token, userId;
  
  const {errors, valid} = validateSignUp(newUser);
  if(!valid) return res.status(400).json(errors)
  
  const dbDoc = db.doc(`/Users/${newUser.handle}`);
  dbDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUSer.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      return token;
    })
    .then(() => {
      const userCredential = {
        userId,
        email: user.email,
        handle: user.handle,
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
        return res
          .status(500)
          .json({ error: err.code + " - something went wrong, please try again" });
      }
    });
};
