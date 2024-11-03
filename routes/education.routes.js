const express = require("express");
const upload = require("../middleware/multer.middleware");
const { createEducation, getAllEducation, updateEducation, deleteEducation } = require("../controller/education.controller");
const router = express.Router();

router.post("/", upload.single("image"), createEducation);
router.get("/", getAllEducation);
router.put("/:id", upload.single("image"), updateEducation);
router.delete("/:id", deleteEducation);

module.exports = router;