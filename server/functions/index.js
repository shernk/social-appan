const functions = require("firebase-functions");

const express = require("express");
const app = express();

const firebaseConfig = require('../config');
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

// Screams
const { getAllScreams } = require("./handles/screams/getAllScream");
const { getScream } = require("./handles/screams/getScream");
const { createScream } = require("./handles/screams/createScream");
const { commentOnScream } = require("./handles/comments/commentOnScream");
const { deleteScream } = require("./handles/screams/deleteScream");
const { likeScream } = require("./handles/screams/likeScream");
const { unlikeScream } = require("./handles/screams/unlikeScream");
const { deleteAllScreams } = require("./handles/screams/deleteAllScreams");

// Users
const { signUp } = require("./handles/users/signUp");
const { signIn } = require("./handles/users/signIn");
const { getAllUserInfo } = require("./handles/users/getAllUserInfo");
const { uploadImage } = require("./handles/users/uploadImage");
const { addUserDetails } = require("./handles/users/addUserDetails");
const {
  getAuthenticatedUser,
} = require("./handles/users/getAuthenticatedUser");

// Comments
const { getAllComments } = require("./handles/comments/getAllComment");
const { getComment } = require("./handles/comments/getComment");
const { replyOnComment } = require("./handles/comments/replyOnComment");
const { deleteAllComments } = require("./handles/comments/deleteAllComments");
const { deleteComment } = require("./handles/comments/deleteComment");

// Auth
const fbAuth = require("./util/fbAuth");

//------------------------------------------------//

// Screams routes
app.get("/screams", getAllScreams);
app.get("/scream/:screamId", fbAuth, getScream);
app.get("/scream/:screamId/like", fbAuth, likeScream);
app.get("/scream/:screamId/unlike", fbAuth, unlikeScream);
app.post("/createScream", fbAuth, createScream);
app.post("/scream/:screamId/comment", fbAuth, commentOnScream);
app.delete("/screams", fbAuth, deleteAllScreams);
app.delete("/scream/:screamId", fbAuth, deleteScream);

// Users routes
app.get("/users", getAllUserInfo);
app.get("/user/authenticated", fbAuth, getAuthenticatedUser);
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
