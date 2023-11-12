const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" }, // Reference to the Interview model
  strengths: [{ type: String }], // Array of strengths observed during the interview
  improvementAreas: [{ type: String }], // Areas for improvement noted during the interview
  overallScore: { type: Number }, // Overall score of the interview
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
