const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://20245744_db_user:6LeXIH9mZiOu0Z2F@feedback.5z0wbxz.mongodb.net/apptech?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(console.error);

// Schema + Model
const feedbackSchema = new mongoose.Schema({
studentName: String,
course: String,
rating: Number,
comments: String,
});

const Feedback = mongoose.model("feedback", feedbackSchema, "feedback");

// Route
app.post("/feedback", async (req, res) => {
try {
const feedback = await Feedback.create(req.body);
res.json({ message: "Feedback submitted successfully", feedback });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));