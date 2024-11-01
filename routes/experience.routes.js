const express = require("express");
const {
  createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience,
} = require("../controller/experience.controller");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

router.post("/", upload.single("image"), createExperience);
router.get("/", getAllExperiences);
router.put("/:id", upload.single("image"), updateExperience);
router.delete("/:id",  deleteExperience);

module.exports = router;