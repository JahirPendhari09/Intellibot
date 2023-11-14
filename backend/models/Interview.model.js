const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //userid
  interviewType: { type: String, required: true }, //frontend
  conversation: [],
  videoPath: { type: String, required: false }, //interview ends
  feedback: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }, //id : added at the end of the interview
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
