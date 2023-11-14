const User = require("../models/User.model");
const Interview = require("../models/Interview.model");
const Feedback = require("../models/Feedback.model");
const bcrypt = require("bcrypt");

exports.getUserInterviews = async (req, res, next) => {
  const userId = req.userId;

  try {
    // Find the user's past interviews using the userId
    const user = await User.findById(userId).populate({
      path: "pastInterviews", // Populate the user's pastInterviews (array of Interview IDs)
      populate: {
        path: "feedback", // Populate the feedback for each interview
        model: "Feedback", // Model to use for populating feedback
      },
    });

    // Access the populated interviews with feedback
    const userInterviews = user.pastInterviews;
    // console.log(userInterviews);
    res.status(200).json({ userInterviews });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: "Could not retrieve user interviews" });
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, password, bio } = req.body;
  console.log(id, "id");
  try {
    let user = await User.findOne({ _id: id });
    if (user) {
      bcrypt.hash(password, 8, async (err, hash) => {
        // Store hash in your password DB.
        if (err) {
          return res.status(400).json({ message: "Couldn't hash password" });
        } else if (hash) {
          // Update user Data
          const updatedUser = {
            username,
            password: hash,
            bio,
          };
          console.log(updatedUser);
          await User.findByIdAndUpdate(id, updatedUser);
          //send the updated User DEtails object as responsene
          res.status(200).json({
            message: "User Detailes Updated Successfully",
            User: req.body,
          });
        }
      });
    } else {
      res.status(400).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong while updating" });
  }
};

exports.getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find();

    const leaderboardData = [];

    for (const user of users) {
      const pastInterviews = user.pastInterviews || [];
      let highestScore = 0;

      for (const interviewId of pastInterviews) {
        const interview = await Interview.findById(interviewId);
        if (interview) {
          const feedback = await Feedback.findById(interview.feedback);

          if (feedback && feedback.overallScore > highestScore) {
            highestScore = feedback.overallScore;
          }
        }
      }

      leaderboardData.push({
        userId: user._id,
        username: user.username,
        profileImage: user.profileImage,
        overallScore: highestScore,
      });
    }

    // Sort the data by overallScore in descending order
    leaderboardData.sort((a, b) => b.overallScore - a.overallScore);

    // Add a rank to each entry
    const leaderboardWithRank = leaderboardData.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    console.log(leaderboardWithRank);
    res.status(200).json({
      message: "Leaderboard created successfully",
      leaderboard: leaderboardWithRank,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Couldn't fetch leaderboard" });
  }
};