const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
  role: { type: String, enum: ["engineer", "manager"], default: "engineer" },
  skills: [String],
  seniority: { type: String, enum: ["junior", "mid", "senior"] },
  maxCapacity: Number,
  department: String,
});

module.exports = mongoose.model("User", userSchema);
