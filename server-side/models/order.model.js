const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Bookshelf name is required"
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    dateOfPickup: {
        type: Date
    },
    id_library: {
        type: ObjectId
    },
    id_reward: {
        type: ObjectId
    },
    id_user: {
        type: ObjectId
    }
})

mongoose.model('order', orderSchema, 'order')