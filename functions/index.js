const functions = require("firebase-functions");

const express = require("express");
const app = express.Router();

const { getAllScreams } = require("./handles/screams/screamsControllers");


// const admin = require("firebase-admin");
// admin.initializeApp();

// const firebaseConfig = require("../config");
// const firebase = require("firebase");
// firebase.initializeApp(firebaseConfig);

// const {screams} = require('./handles/screams/screamsRoutes');

// Scream routes
// app.use("/screams", screams);

app.get("/screams", getAllScreams);


// app.post("/createScream", (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(400).json({ error: "Method not allowed" });
//   }

//   const newScream = {
//     body: req.body.body,
//     userHandle: req.body.userHandle,
//     createdAt: new Date().toISOString(),
//   };

//   admin
//     .firestore()
//     .collection("Screams")
//     .add(newScream)
//     .then((doc) => {
//       res.json({ message: `document ${doc.id} create successfully` });
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });

// //signup route
// app.post("/signup", (res, req) => {
//   const newUser = {
//     email: req.body.email,
//     password: req.body.password,
//     confirmPassword: req.body.confirmPassword,
//     handle: req.body.handle,
//   };

//   //TODO: validate data

//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(newUser.email, newUSer.password)
//     .then((data) => {
//       return res
//         .status(201)
//         .json({ message: `user ${data.user.uid} signed up successfully` });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ error: err.code });
//     });
// });

exports.api = functions.https.onRequest(app);

// module.exports = app