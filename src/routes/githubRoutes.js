const express = require("express");

const router = express.Router();


const controller =
require("../controllers/githubController");



// Analyze GitHub profile

router.post(
"/analyze/:username",
controller.analyzeProfile
);



// Get all profiles

router.get(
"/profiles",
controller.getProfiles
);



// Get one profile

router.get(
"/profiles/:username",
controller.getProfile
);



module.exports = router;