const express = require("express");
const screams = express();

const {getAllScreams} = require('./screamsControllers')

screams.get("/screams", getAllScreams);

exports.default = screams

