const User = require("../models/user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user info
router.put("/:id", async (req, res) => {
    if (req.body._id === req.params._id) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });

//Delete user
router.delete("/:id", async (req, res) => {
    if (req.body._id === req.params._id) {
      try {
        await User.findByIdAndDelete(req.params._id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

  //GET a user
router.get("/", async (req, res) => {
  const userId = req.query._id;
  const name = req.query.name;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ name: name });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;