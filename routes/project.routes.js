const express = require("express");
const {
  createProject,
  getAllProject,
  updateProject,
  deleteProject,
} = require("../controller/project.controller");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

router.post("/", upload.single("image"), createProject);
router.get("/", getAllProject);
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
