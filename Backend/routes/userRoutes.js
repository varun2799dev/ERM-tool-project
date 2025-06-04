const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, userController.getEngineers);
router.get("/:id/capacity", auth, userController.getEngineerCapacity);
router.put("/:id", auth, userController.updateEngineer);

module.exports = router;
