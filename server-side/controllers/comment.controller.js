const mongoose = require('mongoose');
const Comment = mongoose.model('comment');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getComments = (req, res) => {
    const id = req.params.id
    Comment.find({id_book: id}).exec(function (error, docs) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(docs);
        }
    })
}

module.exports.deleteComment = (req, res) => {
    const id = req.params.id
    if (!ObjectId.isValid(id))
        return res.status(400).json({status: false, message: 'There is no comment with given id'});
    else {
        Comment.findOneAndRemove({_id: id}, function (error, result) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json({status: true, message: 'Comment deleted succesfully'});
            }
        })
    }
}


module.exports.postComment = (req, res) => {
    let comment = new Comment();
    comment.id_user = req.body.id_user;
    comment.id_book = req.body.id_book;
    comment.commentText = req.body.commentText;
    comment.dateOfPosting = req.body.dateOfPosting;
    comment.likes = req.body.likes;
    comment.reports = req.body.reports;
    comment.save((error, result) => {
        if (error) {
            res.status(400).send(error.errors)
        } else {
            res.status(200).send(result)
        }
    })
}
module.exports.modifyComment = (req, res) => {
    let modifiedComment = {
        commentText: req.body.commentText,
        likes: req.body.likes,
        reports: req.body.reports
    }
    Comment.findByIdAndUpdate(req.params.id, {$set: modifiedComment}, {new: true}, (error, result) => {
        if (error) {
            res.status(400).send(error.errors)
        } else {
            res.status(200).send(result)
        }
    })

}
