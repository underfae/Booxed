const mongoose = require("mongoose");
const Reward = mongoose.model("reward");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getRewards = (req, res) => {
  Reward.find({}).exec(function (error, result) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};
module.exports.getReward = (req, res) => {};

module.exports.deleteReward = (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ status: false, message: "There is no reward with given id" });
  else {
    Reward.findOneAndRemove({ _id: id }, function (error, result) {
      if (error) {
        res.status(500).send(error);
      } else {
        res
          .status(200)
          .json({ status: true, message: "Reward deleted succesfully" });
      }
    });
  }
};

module.exports.postReward = (req, res) => {
  let reward = new Reward();
  reward.name = req.body.name;
  reward.points = req.body.points;
  reward.libraries = req.body.libraries;
  reward.save((error, result) => {
    if (error) {
      res.status(400).send(error.errors);
    } else {
      res
        .status(200)
        .json({ status: true, message: "Reward successfully added" });
    }
  });
};
// module.exports.putReward = (req,res) => {}
