const express = require("express");
const router = express.Router();
const controller = require("../controllers/phoneController");

router.get("/", controller.getPhones);
router.get("/:id", controller.getPhone);
router.post("/", controller.createPhone);
router.put("/:id", controller.updatePhone);
router.delete("/:id", controller.deletePhone);

module.exports = router;
