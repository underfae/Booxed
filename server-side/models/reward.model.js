const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const rewardSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    points: {
        type: Number
    },
    libraries: [ObjectId]
})



mongoose.model('reward', rewardSchema, 'reward')