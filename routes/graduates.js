const express = require("express");
const router = express.Router();
const Graduate = require("../models/graduate");

//Create new graduate
router.post("/", async (req, res) => {
  const graduate = new Graduate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });

  try {
    const newGraduate = await graduate.save();
    res.status(201).json(newGraduate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get all graduates
router.get("/", async (req, res) => {
  try {
    const graduates = await Graduate.find();
    res.json(graduates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
