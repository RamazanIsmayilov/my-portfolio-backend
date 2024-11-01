const { default: mongoose } = require("mongoose");

const experienceSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Experience", experienceSchema);