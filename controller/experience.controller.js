const Experience = require("../models/experience.model");
const path = require("path");
const fs = require("fs");

exports.createExperience = async (req, res) => {
  try {
    const experienceData = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      companyName: req.body.companyName,
      position: req.body.position,
      description: req.body.description,
      image: req.file ? req.file.path : null,
    };
    const experience = new Experience(experienceData);
    await experience.save();
    return res
      .status(201)
      .send({ message: "Experience created successfully", experience });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    return res.status(200).send(experiences);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).send({ message: "No experience found" });
    }

    const updatedExperienceData = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      companyName: req.body.companyName,
      position: req.body.position,
      description: req.body.description,
    };

    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", experience.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
      updatedExperienceData.image = req.file.path;
    }

    Object.assign(experience, updatedExperienceData);
    await experience.save();

    return res
      .status(200)
      .send({ message: "Experience updated successfully", experience });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).send({ message: "No experience found" });
    }
    const imagePath = path.join(__dirname, "..", experience.image);
    await Experience.findByIdAndDelete(req.params.id);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });

    return res.status(200).send({ message: "Experience successfully deleted" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};