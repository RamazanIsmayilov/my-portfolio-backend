const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  proficiency: { 
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
