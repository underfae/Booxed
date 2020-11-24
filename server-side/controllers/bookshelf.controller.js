const mongoose = require('mongoose');
const Bookshelf = mongoose.model('bookshelf');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.addBookshelf = (req, res) => {
    let bookshelf = new Bookshelf();
    bookshelf.id_user = req.body.id_user
    bookshelf.name = req.body.name
    bookshelf.creation_date = req.body.creation_date
    bookshelf.description = req.body.description
    bookshelf.books_amount = req.body.books_amount
    bookshelf.save((error, result) => {
        if (error) {
            res.status(400).send(error.errors)
        } else {
            res.status(200).send('Bookshelf successfully added')
        }
    })
}

module.exports.deleteBookshelf = (req, res) => {
    const id = req.params.id
    if (!ObjectId.isValid(id))
        return res.status(404).json({status: false, message:'There is no bookshelf with given id'})
    else {
        Bookshelf.findOneAndRemove({_id: id}, function (error, post) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send('Deleted succesfully.' + post)
            }
        })
    }
}
module.exports.getBookshelf = (req, res) => {
    const id = req.params.id
    if (!ObjectId.isValid(id))
        return res.status(404).json({status: false, message:'There is no record with given id.'})
    else {
        Bookshelf.findById({_id: id}, function (error, post) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(post)
            }
        })
    }
}

module.exports.getBookshelves = (req, res) => {
    const id = req.params.id
    if (!ObjectId.isValid(id))
        return res.status(400).send('There is no record with given id.')
    else {
        Bookshelf.find({id_user: id}).exec(function (error, docs) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(docs);
            }
        })
    }
}
