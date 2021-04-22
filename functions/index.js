const functions = require("firebase-functions");

const express = require("express");
const app = express();

const {
  getAllScreams,
  getScream,
  postOneScream,
  commentOnScream,
  likeScream,
  unlikeScream
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
app.get("/scream/:userId/:screamId", fbAuth, getScream);
app.post('/createScream', fbAuth ,postOneScream);
app.post("/scream/:userId/:screamId/comment", fbAuth, commentOnScream);
app.post('/scream/:screamId/like', fbAuth, likeScream);
app.post('/scream/:screamId/unlike', fbAuth, unlikeScream);

// Users routes
app.get('/users', getAllUserInfo);
app.get('/user/authenticated', fbAuth, getAuthenticatedUser);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user', fbAuth, addUserDetails);

exports.api = functions.https.onRequest(app);
