const { default: mongoose } = require("mongoose");

const educationSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
    trim: true,
  },
  endDate: {
    type: mongoose.Schema.Types.Mixed,
    trim: true,
  },
  companyName:{
    type: String,
    required: true,
    trim: true
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

module.exports = mongoose.model("Education", educationSchema);
