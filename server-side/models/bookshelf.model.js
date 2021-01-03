const mongoose = require("mongoose");
const bookPreview = {
  id_book: {
    type: String,
  },
  authors: {
    type: [String],
  },
  title: {
    type: String,
  },
  image: {
    type: String,
  },
};

const bookshelfSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: "User id is required",
  },
  name: {
    type: String,
    required: "Bookshelf name is required",
  },
  creation_date: {
    type: Date,
  },
  description: {
    type: String,
    required: "Description is required",
  },
  books: {
    type: [bookPreview],
  },
});

mongoose.model("bookshelf", bookshelfSchema, "bookshelf");