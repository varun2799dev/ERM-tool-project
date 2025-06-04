const Assignment = require("../models/Assignment");

exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find()
    .populate("engineerId", "name")
    .populate("projectId", "name");
  res.json(assignments);
};

exports.createAssignment = async (req, res) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.status(201).json(assignment);
};

exports.updateAssignment = async (req, res) => {
  const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.deleteAssignment = async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
