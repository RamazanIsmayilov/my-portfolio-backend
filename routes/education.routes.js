const express = require("express");
const upload = require("../middleware/multer.middleware");
const { createEducation, getAllEducation } = require("../controller/education.controller");
const router = express.Router();

router.post("/", upload.single("image"), createEducation);
router.get("/", getAllEducation);

module.exports = router;