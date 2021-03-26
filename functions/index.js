const functions = require("firebase-functions");

const express = require("express");
const app = express();

const { getAllScreams, postOneScream } = require("./handles/screams/screamsControllers");

app.get("/screams", getAllScreams);
app.post('/createScream', postOneScream);

exports.api = functions.https.onRequest(app);
