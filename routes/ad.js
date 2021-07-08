const Ad = require("../models/ad.model");
const router = require("express").Router();
const User = require("../models/product.model");


//Create an Ad
router.post("/", async (req, res) => {
    const newAd = new Ad(req.body);
    try {
      const savedAd = await newAd.save();
      res.status(200).json(savedAd);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//Update Ad
router.put("/:_id", async (req, res) => {
    try {
      const Ad = await Ad.findById(req.params._id);
      if (Ad.postedBy === req.body._id) {
        await Ad.updateOne({ $set: req.body });
        res.status(200).json("the Ad has been updated");
      } else {
        res.status(403).json("you can update only your Ad");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


//Delete an Ad
router.delete('/:pId',async(req,res)=>{
    try {
        const removedAd = await Ad.remove({ _id: req.params._id})
        res.json(removedAd);
    } catch (error) {
        res.json({message: error});
    }
})


//get a user's ad
router.get("/profile/:name", async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.name });
      const ads = await Ad.find({ _id: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;