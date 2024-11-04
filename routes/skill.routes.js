const express = require("express");
const upload = require("../middleware/multer.middleware");
const { createSkill, getAllSkill, updateSkill, deleteSkill } = require("../controller/skill.controller");
const router = express.Router();

router.post("/", upload.single("image"), createSkill);
router.get("/", getAllSkill);
router.put("/:id", upload.single("image"), updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;