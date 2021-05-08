const functions = require("firebase-functions");

const express = require("express");
const app = express();

// Screams
const { getAllScreams } = require("./handles/screams/getAllScream");
const { getScream } = require("./handles/screams/getScream");
const { createScream } = require("./handles/screams/createScream");
const { commentOnScream } = require("./handles/comments/commentOnScream");
const {
  likeScream,
  unlikeScream,
  deleteScream,
  deleteComment
} = require("./handles/screams/screamsControllers");

// Users
const {
  signUp,
  signIn,
  uploadImage,
  getAllUserInfo,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handles/users/userControllers");

const fbAuth = require("./util/fbAuth");

// Comments
const { getAllComments } = require("./handles/comments/getAllComment");

// Comments routes
app.get('/comments', getAllComments);

// Screams routes
app.get("/screams", getAllScreams);
app.get("/scream/:screamId", fbAuth, getScream);
app.get('/scream/:screamId/like', fbAuth, likeScream);
app.get('/scream/:screamId/unlike', fbAuth, unlikeScream);
app.post('/createScream', fbAuth , createScream);
app.post("/scream/:screamId/comment", fbAuth, commentOnScream);
app.delete('/scream/:screamId', fbAuth, deleteScream);
app.delete('/comment/:commentId', fbAuth, deleteComment);

// Users routes
app.get('/users', getAllUserInfo);
app.get('/user/authenticated', fbAuth, getAuthenticatedUser);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user', fbAuth, addUserDetails);

exports.api = functions.https.onRequest(app);
