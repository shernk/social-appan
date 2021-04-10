const functions = require("firebase-functions");

const express = require("express");
const app = express();

const {
  getAllScreams,
  postOneScream,
} = require("./handles/screams/screamsControllers");

const {
  signUp,
  signIn,
  uploadImage,
  getAllUserInfo,
  addUserDetails,
} = require("./handles/users/userControllers");

const fbAuth = require("./util/fbAuth");

// Screams routes
app.get("/screams", getAllScreams);
app.post('/createScream', fbAuth ,postOneScream);

// Users routes
app.get('/users', getAllUserInfo);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user/:userId', fbAuth, addUserDetails);

exports.api = functions.https.onRequest(app);
