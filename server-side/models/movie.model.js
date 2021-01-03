const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  book_title: {
    type: String,
  },
  author_surname: {
    type: String,
  },
  author_name: {
    type: String,
  },
  movie_title: {
    type: String,
  },
  year: {
    type: String,
  },
});

mongoose.model("movies", moviesSchema, "movies");