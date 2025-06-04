const User = require("../models/User");
const Assignment = require("../models/Assignment");

exports.getEngineers = async (req, res) => {
  const engineers = await User.find({ role: "engineer" });
  res.json(engineers);
};

exports.getEngineerCapacity = async (req, res) => {
  const { id } = req.params;
  const engineer = await User.findById(id);
  const assignments = await Assignment.find({ engineerId: id });
  const totalAllocated = assignments.reduce(
    (sum, a) => sum + a.allocationPercentage,
    0
  );
  const available = engineer.maxCapacity - totalAllocated;
  res.json({ allocated: totalAllocated, available });
};

exports.updateEngineer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  res.json(user);
};
