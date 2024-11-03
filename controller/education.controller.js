const Education = require("../models/education.model");
const path = require('path');
const fs = require('fs');

exports.createEducation = async (req, res) => {
  try {
    const educationData = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      companyName: req.body.companyName,
      position: req.body.position,
      description: req.body.description,
      image: req.file ? req.file.path : null,
    };
    const education = new Education(educationData);
    await education.save();
    return res
      .status(201)
      .send({ message: "Education created successfully", education });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getAllEducation = async (req, res) => {
  try {
    const education = await Education.find();
    return res.status(200).send(education);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id)
    if(!education){
      return res.status(404).send({ message: "No education found" });
    }

    const updatedEducationData = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      companyName: req.body.companyName,
      position: req.body.position,
      description: req.body.description,
    };

    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", education.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
      updatedEducationData.image = req.file.path;
    }

    Object.assign(education, updatedEducationData);
    await education.save();

    return res
      .status(200)
      .send({ message: "Education updated successfully", education });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).send({ message: "No education found" });
    }
    const imagePath = path.join(__dirname, "..", education.image);
    await Education.findByIdAndDelete(req.params.id);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });

    return res.status(200).send({ message: "Education successfully deleted" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};