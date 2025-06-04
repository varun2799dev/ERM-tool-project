const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const Project = require("../models/Project");
const Assignment = require("../models/Assignment");
const bcrypt = require("bcryptjs");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  await User.deleteMany();
  await Project.deleteMany();
  await Assignment.deleteMany();

  const manager = await User.create({
    name: "Manager Mike",
    email: "manager@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "manager",
  });

  const engineers = await User.insertMany([
    {
      name: "Alice",
      email: "alice@example.com",
      password: bcrypt.hashSync("alice123", 10),
      role: "engineer",
      skills: ["React", "Node.js"],
      seniority: "mid",
      maxCapacity: 100,
      department: "Frontend",
    },
    {
      name: "Bob",
      email: "bob@example.com",
      password: bcrypt.hashSync("bob123", 10),
      role: "engineer",
      skills: ["Python"],
      seniority: "senior",
      maxCapacity: 50,
      department: "Backend",
    },
  ]);

  const projects = await Project.insertMany([
    {
      name: "Apollo Dashboard",
      description: "Internal dashboard",
      requiredSkills: ["React"],
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-08-01"),
      teamSize: 3,
      status: "active",
      managerId: manager._id,
    },
    {
      name: "Orion API",
      description: "Client-facing API",
      requiredSkills: ["Python"],
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-09-30"),
      teamSize: 2,
      status: "planning",
      managerId: manager._id,
    },
  ]);

  await Assignment.insertMany([
    {
      engineerId: engineers[0]._id,
      projectId: projects[0]._id,
      allocationPercentage: 60,
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-08-01"),
      role: "Developer",
    },
    {
      engineerId: engineers[1]._id,
      projectId: projects[1]._id,
      allocationPercentage: 50,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-09-30"),
      role: "Tech Lead",
    },
  ]);

  console.log("✅ Database seeded");
  process.exit();
};

seed();
