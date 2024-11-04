const Skill = require("../models/skill.model");
const path = require("path");
const fs = require("fs");

exports.createSkill = async (req, res) => {
  try {
    const skillData = {
      image: req.file ? req.file.path : null,
      name: req.body.name,
      proficiency: req.body.proficiency,
    };
    const skill = new Skill(skillData);
    await skill.save();
    return res
      .status(201)
      .send({ message: "Skill created successfully", skill });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getAllSkill = async (req, res) => {
  try {
    const skill = await Skill.find();
    return res.status(200).send(skill);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).send({ message: "No skill found" });
    }

    const updateSkillData = {
      image: req.file ? req.file.path : null,
      name: req.body.name,
      proficiency: req.body.proficiency,
    };

    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", skill.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
      updateSkillData.image = req.file.path;
    }

    Object.assign(skill, updateSkillData);
    await skill.save();

    return res
      .status(200)
      .send({ message: "Skill updated successfully", skill });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).send({ message: "No skill found" });
    }
    const imagePath = path.join(__dirname, "..", skill.image);
    await Skill.findByIdAndDelete(req.params.id);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });

    return res.status(200).send({ message: "Skill successfully deleted" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};