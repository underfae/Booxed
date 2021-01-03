const mongoose = require("mongoose");
const Library = mongoose.model("library");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getLibraries = (req, res) => {
  Library.find({}, function (error, result) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};

module.exports.getLibrary = (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(404)
      .json({ status: false, message: "There is no library with given id" });
  else {
    Library.findById({ _id: id }, function (error, result) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(result);
      }
    });
  }
};
module.exports.deleteLibrary = (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ status: false, message: "There is no library with given id" });
  else {
    Library.findOneAndRemove({ _id: id }, function (error, result) {
      if (error) {
        res.status(500).send(error);
      } else {
        res
          .status(200)
          .json({ status: true, message: "Library deleted succesfully" });
      }
    });
  }
};

module.exports.postLibrary = (req, res) => {
  let library = new Library();
  library.name = req.body.name;
  library.city = req.body.city;
  library.street = req.body.street;
  library.building_number = req.body.building_number;
  library.apartment_number = req.body.apartment_number;
  library.telephone = req.body.telephone;
  library.save((error, result) => {
    if (error) {
      res.status(400).send(error.errors);
    } else {
      res.status(200).send(result);
    }
  });
};
// module.exports.putLibrary = (req,res) => {}