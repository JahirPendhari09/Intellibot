const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const BlackList = require("../models/Blacklist.model");
require("dotenv").config();

exports.addNewUser = async (req, res, next) => {
  try {
    const { username, email, password, bio } = req.body;
    const profileImage = req.file ? req.file.path : null;
    console.log(username, email, password, profileImage, bio);
    // Check if the email is already registered
    let existingUser = await User.findOne({ email: email });
    // console.log(existingUser, "test");
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    } else {
      bcrypt.hash(password, 8, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          return res.status(400).json({ message: "Couldn't hash password" });
        } else if (hash) {
          // Create a new user
          const newUser = new User({
            username,
            email,
            password: hash,
            bio,
            profileImage,
            pastInterviews: [],
          });

          console.log(newUser);
          try {
            await newUser.save();
            res
              .status(201)
              .json({ message: "User registered successfully", user: newUser });
          } catch (err) {
            return res
              .status(400)
              .json({ message: "User registration failed" });
          }
        }
      });
    }
  } catch (err) {
    return res.status(400).json({ message: "User registration failed" });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          var token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
          res
            .status(200)
            .json({
              message: `Welcome back ${user.name}`,
              token: token,
              user: user,
            });
         
        }else{
          return res
          .status(400)
          .json({ message: "Invalid password,Try again" });
        }
      });
    } else {
      return res
        .status(400)
        .json({ message: "User doesn't exit,try registering a account" });
    }
  } catch (er) {
    return res
      .status(400)
      .json({ message: "Something went wrong,try again later" });
  }
};

exports.logoutUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    const data = new BlackList({ token: token });
    await data.save();
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    return res.status(400).json({ message: "Logout failed" });
  }
};

exports.getUserData = async (req, res, next) => {
  const userId = req.headers.authorization?.split(" ")[1];
  try {
    const user = await User.findById(userId).populate("pastInterviews");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Couldn't Fetch User" });
  }
};
