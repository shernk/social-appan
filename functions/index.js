const functions = require("firebase-functions");

const express = require("express");
const app = express();

const { getAllScreams, postOneScream } = require("./handles/screams/screamsControllers");

const {signUp, signIn} = require('./handles/users/userControllers')

// Screams routes
app.get("/screams", getAllScreams);
app.post('/createScream', postOneScream);

// Users routes
app.post('/signUp', signUp);
app.post('/signIn', signIn);

exports.api = functions.https.onRequest(app);
