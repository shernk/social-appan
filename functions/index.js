const functions = require("firebase-functions");

const express = require("express");
const app = express();

const {
  getAllScreams,
  getScream,
  postOneScream,
} = require("./handles/screams/screamsControllers");

const {
  signUp,
  signIn,
  uploadImage,
  getAllUserInfo,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handles/users/userControllers");

const fbAuth = require("./util/fbAuth");

// Screams routes
app.get("/screams", getAllScreams);
app.get('/scream/:screamId', getScream);
app.post('/createScream', fbAuth ,postOneScream);

// Users routes
app.get('/users', getAllUserInfo);
app.get('/user/authenticated', fbAuth, getAuthenticatedUser);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user', fbAuth, addUserDetails);

exports.api = functions.https.onRequest(app);
