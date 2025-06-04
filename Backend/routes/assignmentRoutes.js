const router = require("express").Router();
const controller = require("../controllers/assignmentController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getAssignments);
router.post("/", auth, controller.createAssignment);
router.put("/:id", auth, controller.updateAssignment);
router.delete("/:id", auth, controller.deleteAssignment);

module.exports = router;
