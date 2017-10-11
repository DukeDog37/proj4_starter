const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
  name: { type: String, required: true },
  resumeText: { type: String, required: true },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;