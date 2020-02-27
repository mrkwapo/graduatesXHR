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

//Read/Get all graduates
router.get("/", async (req, res) => {
  try {
    const graduates = await Graduate.find();
    res.json(graduates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Read/Get one graduate by email
router.get("/:email", getGraduateByEmail, (req, res) => {
  res.json(res.graduate);
});

//Update graduate
router.patch("/:email", getGraduateByEmail, async (req, res) => {
  if (req.body.firstName != null) {
    res.graduate.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.graduate.lastName = req.body.lastName;
  }
  if (req.body.email != null) {
    res.graduate.email = req.body.email;
  }
  try {
    const updatedGraduate = await res.graduate.save();
    res.json(updatedGraduate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete
router.delete("/:email", getGraduateByEmail, async (req, res) => {
  try {
    await res.graduate.remove();
    res.json({ message: "Deleted graduate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get one by email
async function getGraduateByEmail(req, res, next) {
  let graduate;
  let email = req.params.email;
  try {
    graduate = await Graduate.findOne({ email });
    if (graduate == null) {
      return res.status(404).json({ message: "Cannot find graduate" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.graduate = graduate;
  next();
}

module.exports = router;
