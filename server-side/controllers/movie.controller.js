const mongoose = require('mongoose');
const Movies = mongoose.model('movies');

module.exports.getMovies = (req, res) => {
    const title = req.params.book_title
    Movies.find({book_title: title}, function (error, result) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(result)
        }
    })
}