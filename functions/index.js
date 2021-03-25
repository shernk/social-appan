const functions = require("firebase-functions");

const express = require("express");
const app = express();

const admin = require("firebase-admin");
admin.initializeApp();

const firebaseConfig = require("../config");
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("Screams")
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
    .catch((err) => console.error(err));
});

app.post("/createScream", (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection("Screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} create successfully` });
    })
    .catch((err) => {
      console.error(err);
    });
});

//signup route
app.post("/signup", (res, req) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  //TODO: validate data

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUSer.password)
    .then((data) => {
      return res
        .status(201)
        .json({ message: `user ${data.user.uid} signed up successfully` });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
