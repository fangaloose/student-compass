var express = require("express");
var router = express.Router();

const User = require("../models/User");
const Auth = require("../auth");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.find({}).populate("role");
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (req.body.password) {
      user.password = req.body.password; // !TODO hash password
    }

    await user.save();
    res.json(user);
  } catch {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
