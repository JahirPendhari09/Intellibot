const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const connection = require("./connection");
const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));
app.use("/vods", express.static("vods"));


// All Routes
app.use("/auth", authRoutes);
app.use(interviewRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.send("<h1>404 Not found</h1>");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log("Server running at port " + process.env.PORT);
  } catch (err) {
    console.log(err);
    console.log("Failed to connect to DB");
  }
});
