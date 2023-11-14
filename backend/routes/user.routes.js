const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.use(auth);
// /interview/:id (GET to retrieve details of a specific interview)
router.get("/user/interview", userController.getUserInterviews);

//* PATCH-> '/auth/signup' to login a user
router.patch("/user/update/:id", userController.updateUser);

//GET -> "/user/leaderboard"
router.get("/user/leaderboard", userController.getLeaderboard);


module.exports = router;
