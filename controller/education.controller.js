const Education = require("../models/education.model");

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
