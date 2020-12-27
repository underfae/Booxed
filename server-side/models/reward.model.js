const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const LibraryPreview = {
  id_library: {
    type: ObjectId,
  },
  name: {
    type: String,
  },
};

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  points: {
    type: Number,
  },
  libraries: [LibraryPreview],
});

mongoose.model("reward", rewardSchema, "reward");
