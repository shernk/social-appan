const functions = require("firebase-functions");

const express = require("express");
const app = express();

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const firebaseConfig = require('../config');
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

// Screams
const { getAllScreams } = require("./handles/screams/getAllScream");
const { getScream } = require("./handles/screams/getScream");
const { createScream } = require("./handles/screams/createScream");
const { commentOnScream } = require("./handles/comments/commentOnScream");
const { deleteScream } = require("./handles/screams/deleteScream");
const { likeScream } = require("./handles/likes/likeScream");
const { unlikeScream } = require("./handles/likes/unlikeScream");
const { deleteAllScreams } = require("./handles/screams/deleteAllScreams");

// Users
const { signUp } = require("./handles/users/signUp");
const { signIn } = require("./handles/users/signIn");
const { getAllUserInfo } = require("./handles/users/getAllUserInfo");
const { uploadImage } = require("./handles/users/uploadImage");
const { addUserDetails } = require("./handles/users/addUserDetails");
const {
  getUserDetails,
} = require("./handles/users/getUserDetails");

// Comments
const { getAllComments } = require("./handles/comments/getAllComment");
const { getComment } = require("./handles/comments/getComment");
const { replyOnComment } = require("./handles/comments/replyOnComment");
const { deleteAllComments } = require("./handles/comments/deleteAllComments");
const { deleteComment } = require("./handles/comments/deleteComment");

// Likes
const { deleteAllLikes } = require("./handles/likes/deleteAllLikes");

// Auth
const fbAuth = require("./util/fbAuth");

//------------------------------------------------//

// Screams routes
app.get("/screams", getAllScreams);
app.get("/scream/:screamId", /* fbAuth, */ getScream);
app.get("/scream/:screamId/like", fbAuth, likeScream);
app.get("/scream/:screamId/unlike", fbAuth, unlikeScream);
app.post("/createScream", fbAuth, createScream);
app.post("/scream/:screamId/comment", fbAuth, commentOnScream);
app.delete("/screams", fbAuth, deleteAllScreams);
app.delete("/scream/:screamId", fbAuth, deleteScream);

// Likes
app.delete('/likes', deleteAllLikes);

// Users routes
app.get("/users", getAllUserInfo);
app.get("/user/details", fbAuth, getUserDetails);
app.post("/signUp", signUp);
app.post("/signIn", signIn);
app.post("/user/image", fbAuth, uploadImage);
app.post("/user", fbAuth, addUserDetails);

// Comments routes
app.get("/comments", getAllComments);
app.get("/comment/:commentId", fbAuth, getComment);
app.post("/comment/:commentId", fbAuth, replyOnComment);
app.delete("/comments", fbAuth, deleteAllComments);
app.delete("/comment/:commentId", fbAuth, deleteComment);

exports.api = functions.https.onRequest(app);
