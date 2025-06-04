const router = require("express").Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, projectController.getProjects);
router.post("/", auth, projectController.createProject);
router.get("/:id", auth, projectController.getProject);

module.exports = router;
