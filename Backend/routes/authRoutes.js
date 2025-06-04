const router = require("express").Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", authController.login);
router.get("/profile", authMiddleware, authController.profile);

module.exports = router;
