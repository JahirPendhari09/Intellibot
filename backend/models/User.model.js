const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: String,
    bio: String,
    pastInterviews: [{ type: Schema.Types.ObjectId, ref: "Interview" }],
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
module.exports = User;
