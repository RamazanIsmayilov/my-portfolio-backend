const Project = require("../models/project.model");
const path = require("path");
const fs = require("fs");

exports.createProject = async (req, res) => {
  try {
    const projectData = {
      image: req.file ? req.file.path : null,
      projectName: req.body.projectName,
      skills: Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills.split(","),
      description: req.body.description,
    };
    const project = new Project(projectData);
    await project.save();
    return res
      .status(201)
      .send({ message: "Project created successfully", project });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.getAllProject = async (req, res) => {
  try {
    const project = await Project.find();
    return res.status(200).send(project);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "No project found" });
    }

    const updateProjectData = {
      image: req.file ? req.file.path : null,
      projectName: req.body.projectName,
      skills: Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills.split(","),
      description: req.body.description,
    };

    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", project.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);
        }
      });
      updateProjectData.image = req.file.path;
    }

    Object.assign(project, updateProjectData);
    await project.save();

    return res
      .status(200)
      .send({ message: "Project updated successfully", project });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "No project found" });
    }
    const imagePath = path.join(__dirname, "..", project.image);
    await Project.findByIdAndDelete(req.params.id);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });

    return res.status(200).send({ message: "Project successfully deleted" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};