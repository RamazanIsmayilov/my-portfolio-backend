const { default: mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true,
  },
  projectName:{
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String],
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);
