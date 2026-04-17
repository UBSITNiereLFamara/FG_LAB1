const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://20245744_db_user:y8pZe3JPxnkh@survey.yhsyppm.mongodb.net/apptech?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(console.error);

const userSchema = new mongoose.Schema({
  studentName: String,
  course: String,
  rating: Number,
  comments: String,
});

const User = mongoose.model("feedback", userSchema, "feedback");

app.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ message: "Feedback submitted successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));