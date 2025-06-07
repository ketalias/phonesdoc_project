const express = require("express");
const router = express.Router();
const controller = require("../controllers/phoneController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/", controller.getPhones);
router.get("/:id", controller.getPhone);

router.post("/", authMiddleware, roleMiddleware(['admin']), controller.createPhone);
router.put("/:id", authMiddleware, roleMiddleware(['admin']), controller.updatePhone);
router.delete("/:id", authMiddleware, roleMiddleware(['admin']), controller.deletePhone);

module.exports = router;
