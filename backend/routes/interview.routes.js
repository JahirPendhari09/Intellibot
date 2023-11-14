const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const video= require("../middlewares/video.middleware");

//* Auth Controller
const interviewController = require("../controllers/interview.controller");

router.use(auth);
// /interview/start (POST to initiate a new interview)
router.post("/interview/start", interviewController.startInterview);

//answer route
router.patch("/interview/:id", interviewController.updateInterview);

// /interview/:id/end (POST to end an ongoing interview)
router.post("/interview/end/:id",video.single("videoPath"), interviewController.endInterview);

// /interview/:id (GET to retrieve details of a specific interview)
router.get("/interview/:id", interviewController.getInterview);

module.exports = router;
