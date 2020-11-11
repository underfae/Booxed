const mongoose = require('mongoose');
const User = mongoose.model('user');
const passport = require('passport')
const _ = require('lodash')

module.exports.registerUser = (req, res, next) => {
    let user = new User()
    user.username = req.body.username
    user.email = req.body.email
    user.name = req.body.name
    user.surname = req.body.surname
    user.password = req.body.password
    user.points = req.body.points
    user.liked = req.body.liked
    user.read = req.body.read
    user.save((error, result) => {
        if (error) {
            error.code == 11000 ? res.status(422).send(Object.keys(error.keyValue)[0] + ' must be unique!') : next(error)
        } else {
            res.status(200).send(result)
        }
    })
}

module.exports.authentication = (request, response, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) return response.status(400).json(error);
        else if (user) return response.status(200).json({"token": user.generateJwt()})
        else return response.status(404).json(info);
    })(request, response)
}

module.exports.loggedUser = (request, response, next) => {
    User.findOne({_id: request._id}, (error, result) => {
        if (!result)
            return result.stat(404).json({status: false, message: 'User not found!'});
        else
            return response.status(200).json({
                status: true,
                user: _.pick(result, ['_id', 'username', 'name', 'surname', 'email', 'liked', 'read', 'points'])
            })
    })
}