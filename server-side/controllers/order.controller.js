const mongoose = require('mongoose');
const Order = mongoose.model('order');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getOrders = (req, res) => {
    const id = req.params.id
    if (!ObjectId.isValid(id))
        return res.status(400).send('There is no record with given id.')
    else {
        Order.find({id_user: id}).exec(function (error, docs) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(docs);
            }
        })
    }
}
module.exports.getOrder = (req, res) => {
}
module.exports.deleteOrder = (req, res) => {
}

module.exports.postOrder = (req, res) => {
    let order = new Order();
    order.name = req.body.name;
    order.surname = req.body.surname;
    order.email = req.body.email;
    order.dateOfPickup = req.body.dateOfPickup;
    order.id_library = req.body.id_library;
    order.id_reward = req.body.id_reward;
    order.id_user = req.body.id_user;
    order.status = req.body.status;
    order.save((error, result) => {
        if (error) {
            res.status(400).send(error.errors)
        } else {
            res.status(200).send(result)
        }
    })
}
// module.exports.putOrder = (req,res) => {}