mongoose = require("mongoose");

librarySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  building_number: {
    type: Number,
  },
  apartment_number: {
    type: Number,
  },
  telephone: {
    type: String,
  },
});
mongoose.model("library", librarySchema, "library");