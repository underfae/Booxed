mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;

commentSchema = new mongoose.Schema({
    id_user: {
        type: ObjectId
    },
    id_book: {
        type: ObjectId
    },
    commentText: {
        type: String,
        required: "Comment is required",
    },
    dateOfPosting: {
        type: Date
    },
    likes: {
        type: [ObjectId]
    },
    reports: {
        type: [ObjectId]
    }

})

mongoose.model('comment', commentSchema, 'comment')