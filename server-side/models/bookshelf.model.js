const mongoose = require('mongoose')

const bookshelfSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: "User id is required"
    },
    name: {
        type: String,
        required: "Bookshelf name is required"
    },
    creation_date: {
        type: Date,
    },
    description: {
        type: String,
        required: "Description is required"
    },
    books_amount: {
        type: Number
    }
})

mongoose.model('bookshelf', bookshelfSchema, 'bookshelf')